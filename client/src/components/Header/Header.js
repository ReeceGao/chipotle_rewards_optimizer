import "./Header.css";
export default function Header() {
    return (
        <div className="header-wrapper">
            <a className="site-logo">
                <img src="./images/logo.png" alt="site logo" />
            </a>
            <nav className="primary-navigation">
                <ul role="list" className="nav-list">
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <a>About</a>
                    </li>
                    <li>
                        <a>Rewards</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
