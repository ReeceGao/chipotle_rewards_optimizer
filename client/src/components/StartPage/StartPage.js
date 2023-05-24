import "./StartPage.css";
export default function StartPage({ onTypeHandler, onKeyDownHandler }) {
    return (
        <div className="container chipotle-brown">
            <div className="content">
                <img
                    src="../images/chip.png"
                    alt="Chipotle Rewards Optimizer"
                    className="rewards-icon"
                />
                <h1 className="purpose-text">
                    Find out the best way to use your Chipotle Rewards points at
                    local Chipotle resturants!
                </h1>
                <div className="input-section">
                    <p className="enter-zipcode-text">Enter Zip Code:</p>
                    <input
                        className="input"
                        type="text"
                        minLength="5"
                        maxLength="5"
                        onChange={onTypeHandler}
                        onKeyDown={onKeyDownHandler}
                    />
                    <button className="search">Search</button>
                </div>
            </div>
        </div>
    );
}
