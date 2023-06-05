import "./StartPage.css";
export default function StartPage({
    onTypeHandler,
    onKeyDownHandler,
    onEnterButtonClick,
}) {
    return (
        <div className="container chipotle-brown">
            <div className="content">
                <div className="rewards-icon default-padding">
                    <img
                        src="../images/chip.png"
                        alt="Chipotle Rewards Optimizer"
                    />
                </div>
                <div className="purpose-container">
                    <h1 className="purpose default-padding">
                        Find out the best way to use your Chipotle Rewards
                        points at local Chipotle resturants!
                    </h1>
                </div>
                <div className="input-section default-padding">
                    <p className="enter-zipcode-text">Enter Zipcode</p>
                    <div>
                        <input
                            placeholder="e.g. 73072"
                            className="input"
                            type="text"
                            minLength="5"
                            maxLength="5"
                            onChange={onTypeHandler}
                            onKeyDown={onKeyDownHandler}
                        />
                        <span>
                            <button
                                onClick={onEnterButtonClick}
                                className="search"
                            >
                                Search
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
