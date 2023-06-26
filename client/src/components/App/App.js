import { useEffect, useState, useRef } from "react";
import Header from "../Header/Header";
import "./App.css";

import { getResultsForPostalCode, loadGoogleApi } from "../../api/apiCalls";

const rewardToPictureMapping = {
    DoubleProtein: "./images/double_chicken.png",
    FountainDrink: "./images/fountain_drink.png",
    Quesadilla: "./images/quesadilla.png",
    Entree: "./images/entree.png",
    SideTortilla: "./images/tortilla.png",
    "Chips&QuesoBlanco": "./images/chips_n_queso.png",
    "Chips&Guacamole": "./images/chips_n_guac.png",
    SideofGuacamole: "./images/side_of_guac.png",
    SideofQuesoBlanco: "./images/side_of_queso.png",
    Chips: "./images/chips.png",
    "Kid’sMeal": "./images/kids_meal.png",
    "Chips&Salsa": "./images/chips_n_salsa.png",
    BottledDrink: "./images/bottled_drink.png",
    $10toChipotleGoods: "./images/10_chipotle_goods.png",
    $20toChipotleGoods: "./images/20_chipotle_goods.png",
    $35toChipotleGoods: "./images/35_chipotle_goods.png",
};

function App() {
    const google = useRef(null);
    const [zipcode, setZipcode] = useState("");
    const [map, setMap] = useState(null);
    const [selectedMarker, _setSelectedMarker] = useState(null);
    const selectedMarkerRef = useRef(selectedMarker);
    const setSelectedMarker = (newMarker) => {
        _setSelectedMarker(newMarker);
        selectedMarkerRef.current = newMarker;
    };
    const [markerMap, setMarkerMap] = useState(new Map());
    const updateMarkerMap = (k, v) => {
        setMarkerMap(markerMap.set(k, v));
    };
    let runningRank = 0;
    let prevVal = 0;

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
        const res = await getResultsForPostalCode(zipcode);
        console.log(res);
        map.fitBounds(
            res.latLngObj.resultsFromPostal.results[0].geometry.bounds
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
                map.panBy(div.offsetWidth / 3, 0);
                const beegIcon = {
                    url: "./images/pepper-marker.png",
                    scaledSize: new google.current.maps.Size(100, 100),
                };
                marker.setIcon(beegIcon);
                setSelectedMarker(marker);
                runningRank = 0;
                prevVal = 0;
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
                    <div className="search" onClick={closeResults}>
                        <input
                            className="search-input"
                            placeholder="Enter Zipcode e.g. 73072"
                            minLength={5}
                            maxLength={5}
                            type="text"
                            pattern="[0-9]*"
                            onChange={onTypeHandler}
                        />
                        <a
                            className="search-icon"
                            onClick={onButtonClickHandler}
                        >
                            <img src="./images/search.svg" alt="" />
                        </a>
                    </div>
                    {selectedMarker ? (
                        <div className="results">
                            <div className="results-header">
                                <div></div>
                                <span className="fs-500 fw-700">Results</span>
                                <img
                                    src="./images/close.svg"
                                    alt=""
                                    onClick={closeResults}
                                />
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="fw-600">Reward</th>
                                        <th className="fw-600">
                                            Value{" "}
                                            <span className="fs-300">
                                                (per point)
                                            </span>
                                        </th>
                                        <th className="fw-600">Points</th>
                                        <th className="fw-600">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {markerMap
                                        .get(selectedMarker)
                                        .bestValues.map((entry, index) => {
                                            const imgStr = entry.reward
                                                .split(" ")
                                                .join("");
                                            const displayString =
                                                entry.reward +
                                                (entry.menuItem
                                                    ? ` (${entry.menuItem})`
                                                    : "");
                                            let displayRanking = 0;
                                            if (entry.value === prevVal) {
                                                displayRanking = runningRank;
                                            } else {
                                                displayRanking = ++runningRank;
                                                prevVal = entry.value;
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td className="color-neutral-400">
                                                        <span>
                                                            {displayRanking}.
                                                        </span>
                                                        <img
                                                            src={
                                                                rewardToPictureMapping[
                                                                    imgStr
                                                                ]
                                                            }
                                                            alt=""
                                                        />
                                                        {displayString}
                                                    </td>
                                                    <td className="color-neutral-400">
                                                        ${entry.value}
                                                    </td>
                                                    <td className="color-neutral-400">
                                                        {entry.points}
                                                    </td>
                                                    <td className="color-neutral-400">
                                                        ${entry.price}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
}

export default App;
