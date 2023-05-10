import StartPage from "../StartPage/StartPage";
import Header from "../Header/Header";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import { getResultsForPostalCode } from "../../api/apiCalls";

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

    return (
        <div className="App">
            <div className="Header">
                <Header />
            </div>
            <div className="Body">
                <StartPage
                    onTypeHandler={onTypeHandler}
                    onKeyDownHandler={onKeyDownHandler}
                />
            </div>
        </div>
    );
}

export default App;
