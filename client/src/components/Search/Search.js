import "./Search.css";
export default function Search({
    closeResults,
    onTypeHandler,
    onButtonClickHandler,
}) {
    return (
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
            <button className="search-icon" onClick={onButtonClickHandler}>
                <img src="./images/search.svg" alt="" />
            </button>
        </div>
    );
}
