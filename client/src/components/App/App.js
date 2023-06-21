import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Loader } from "@googlemaps/js-api-loader";
import "./App.css";

import { getResultsForPostalCode, loadGoogleApi } from "../../api/apiCalls";

function App() {
    const [zipcode, setZipcode] = useState("");

    const onTypeHandler = (e) => {
        setZipcode(e.target.value);
    };
    const onKeyDownHandler = async (e) => {
        if (e.key === "Enter") {
            const res = await getResultsForPostalCode(zipcode);
            console.log(res);
        }
    };
    const onButtonClickHandler = async () => {
        const res = await getResultsForPostalCode(zipcode);
        console.log(res);
    };

    let mapLoaded = false;

    useEffect(() => {
        if (!mapLoaded) {
            loadGoogleApi().then((google) => {
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
                let map = new google.maps.Map(
                    document.querySelector(".map"),
                    mapOptions
                );
                mapLoaded = true;
            });
        }
    }, []);

    return (
        <div className="app-container" onKeyDown={onKeyDownHandler}>
            <header className="primary-header">
                <Header />
            </header>
            <main>
                <div className="container">
                    <div className="map" />
                    <div className="search">
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
                    <div className="results"></div>
                </div>
            </main>
        </div>
    );
}

export default App;
