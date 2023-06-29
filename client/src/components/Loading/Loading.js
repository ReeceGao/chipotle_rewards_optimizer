import "./Loading.css";
export default function Loading() {
    return (
        <div className="loading">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span>Loading...</span>
            <span className="apology-text color-neutral-400">
                Sorry this might take a long time since I am hosting my server
                on a free tier service.
            </span>
        </div>
    );
}
