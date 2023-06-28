import "./Results.css";

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

export default function Results({ closeResults, markerMap, selectedMarker }) {
    let runningRank = 0;
    let prevVal = 0;
    return (
        <div className="results">
            <div className="results-header">
                <span className="fs-500 fw-700">Results</span>
                <div className="legend fs-300 color-neutral-400">
                    <span>value: cost / points</span>
                    <span>cost: price of the menu item</span>
                    <span>points: required chipotle reward points</span>
                </div>
                <img src="./images/close.svg" alt="" onClick={closeResults} />
            </div>
            <ul>
                {markerMap
                    .get(selectedMarker)
                    .bestValues.map((entry, index) => {
                        const imgStr = entry.reward.split(" ").join("");
                        const displayString =
                            entry.reward +
                            (entry.menuItem ? ` (${entry.menuItem})` : "");
                        let displayRanking = 0;
                        if (entry.value === prevVal) {
                            displayRanking = runningRank;
                        } else {
                            displayRanking = ++runningRank;
                            prevVal = entry.value;
                        }
                        return (
                            <li key={index}>
                                <div className="reward-identity">
                                    <span>{displayRanking}.</span>
                                    <img
                                        src={rewardToPictureMapping[imgStr]}
                                        alt=""
                                    />
                                    {displayString}
                                </div>
                                <div className="reward-stats fs-300">
                                    <span className="color-neutral-400">
                                        value: ${entry.value}
                                    </span>
                                    <span className="color-neutral-400">
                                        cost: ${entry.price}
                                    </span>
                                    <span className="color-neutral-400">
                                        points: {entry.points}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
