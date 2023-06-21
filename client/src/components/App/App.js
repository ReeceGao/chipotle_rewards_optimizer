import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Loader } from "@googlemaps/js-api-loader";
import "./App.css";

// import { getResultsForPostalCode } from "../../api/apiCalls";

function App() {
    const [zipcode, setZipcode] = useState("");

    const onTypeHandler = (e) => {
        setZipcode(e.target.value);
    };
    // const onKeyDownHandler = async (e) => {
    //     if (e.key === "Enter") {
    //         const res = await getResultsForPostalCode(zipcode);
    //         console.log(res);
    //     }
    // };
    // const onEnterButtonClick = async () => {
    //     const res = await getResultsForPostalCode(zipcode);
    //     console.log(res);
    // };
    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["maps"],
    });

    let map;

    useEffect(() => {
        loader
            .load()
            .then((google) => {
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

                map = new google.maps.Map(
                    document.querySelector(".map"),
                    mapOptions
                );
            })
            .catch((e) => {
                console.log(e);
            });
    });

    return (
        <div className="app-container">
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
                        />
                        <a className="search-icon">
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
