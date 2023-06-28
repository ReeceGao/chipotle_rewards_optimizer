import { useEffect, useState, useRef } from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Results from "../Results/Results";
import "./App.css";

import { getResultsForPostalCode, loadGoogleApi } from "../../api/apiCalls";

function App() {
    const google = useRef(null);
    const [zipcode, setZipcode] = useState("");
    const [loading, setLoading] = useState(false);
    const [map, setMap] = useState(null);
    const [selectedMarker, _setSelectedMarker] = useState(null);
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const selectedMarkerRef = useRef(selectedMarker);
    const setSelectedMarker = (newMarker) => {
        _setSelectedMarker(newMarker);
        selectedMarkerRef.current = newMarker;
    };
    const [markerMap, setMarkerMap] = useState(new Map());
    const updateMarkerMap = (k, v) => {
        setMarkerMap(markerMap.set(k, v));
    };

    window.addEventListener("resize", () => {
        windowSize.current = [window.innerWidth, window.innerHeight];
    });

    const onTypeHandler = (e) => {
        setZipcode(e.target.value);
    };
    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            searchHandler();
        }
    };
    const onButtonClickHandler = () => {
        searchHandler();
    };

    const closeResults = () => {
        const smollIcon = {
            url: "./images/pepper-marker.png",
            scaledSize: new google.current.maps.Size(50, 50),
        };
        selectedMarkerRef.current?.setIcon(smollIcon);
        setSelectedMarker(null);
    };

    const searchHandler = async () => {
        setLoading(true);
        let res;
        try {
            res = await getResultsForPostalCode(zipcode);
        } catch (e) {
            window.alert(e.message);
            setLoading(false);
            return;
        }
        setLoading(false);
        map.fitBounds(
            res.latLngObj.resultsFromPostal.results[0].geometry.viewport
        );

        for (let i = 0; i < res.results.length; i++) {
            const marker = new google.current.maps.Marker({
                position: new google.current.maps.LatLng(
                    res.results[i].restaurant.addresses[0].latitude,
                    res.results[i].restaurant.addresses[0].longitude
                ),
                icon: {
                    url: "./images/pepper-marker.png",
                    scaledSize: new google.current.maps.Size(50, 50),
                },
                map,
            });
            updateMarkerMap(marker, res.results[i]);

            marker.addListener("click", () => {
                if (selectedMarkerRef.current) {
                    closeResults();
                }
                map.panTo(marker.getPosition());

                const div = map.getDiv();

                if (
                    windowSize.current[0] <= 1300 &&
                    windowSize.current[0] > 960
                ) {
                    map.panBy(div.offsetWidth / 3, 0);
                }

                const beegIcon = {
                    url: "./images/pepper-marker.png",
                    scaledSize: new google.current.maps.Size(90, 90),
                };
                marker.setIcon(beegIcon);
                setSelectedMarker(marker);
            });
        }
    };

    useEffect(() => {
        if (!map) {
            loadGoogleApi().then((goog) => {
                google.current = goog;
                const mapOptions = {
                    disableDefaultUI: true,
                    center: {
                        lat: 37.09024,
                        lng: -95.712891,
                    },
                    zoom: 5,
                    minZoom: 3,
                    restriction: {
                        latLngBounds: {
                            north: 85,
                            south: -85,
                            west: -180,
                            east: 180,
                        },
                        strictBounds: true,
                    },
                };
                const googMap = new goog.maps.Map(
                    document.querySelector(".map"),
                    mapOptions
                );
                setMap(googMap);
                googMap.addListener("click", closeResults);
            });
        }
    });

    return (
        <div className="app-container" onKeyDown={onKeyDownHandler}>
            <header className="primary-header" onClick={closeResults}>
                <Header />
            </header>
            <main>
                <div className="container">
                    <div className="map" />
                    <Search
                        closeResults={closeResults}
                        onTypeHandler={onTypeHandler}
                        onButtonClickHandler={onButtonClickHandler}
                    />
                    {selectedMarker ? (
                        <Results
                            closeResults={closeResults}
                            markerMap={markerMap}
                            selectedMarker={selectedMarker}
                        />
                    ) : null}
                    {loading ? (
                        <div className="loading">
                            <div class="lds-roller">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <span>Loading...</span>
                            <span className="apology-text color-neutral-400">
                                Sorry this might take a long time since I am
                                hosting my server on a free tier service.
                            </span>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
}

export default App;
