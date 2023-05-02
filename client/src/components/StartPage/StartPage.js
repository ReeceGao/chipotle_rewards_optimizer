export default function StartPage({ onTypeHandler, onKeyDownHandler }) {
  return (
    <div>
      <div>Enter Zip Code:</div>
      <input
        type="text"
        minLength="5"
        maxLength="5"
        onChange={onTypeHandler}
        onKeyDown={onKeyDownHandler}
      />
    </div>
  );
}
