import StartPage from "../StartPage/StartPage";
import Results from "../Results/Results";
import Header from "../Header/Header";
import { useState } from "react";
import { getResultsForPostalCode } from "../../api/apiCalls";
import "./App.css";

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
    const onEnterButtonClick = async () => {
        const res = await getResultsForPostalCode(zipcode);
        console.log(res);
    };

    return (
        <div className="app">
            <main className="main-content">
                <StartPage
                    onTypeHandler={onTypeHandler}
                    onKeyDownHandler={onKeyDownHandler}
                    onEnterButtonClick={onEnterButtonClick}
                />
                {/* <Results /> */}
            </main>
        </div>
    );
}

export default App;
