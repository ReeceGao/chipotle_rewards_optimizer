import "./Header.css";
export default function Header() {
    return (
        <div className="header-wrapper">
            <button href="#" className="site-logo">
                <img src="./images/logo.png" alt="site logo" />
            </button>
            <div className="fw-600 purpose-text">
                Find out which Chipotle rewards are most worth it at your local
                Chipotle restaurants!
            </div>
        </div>
    );
}
