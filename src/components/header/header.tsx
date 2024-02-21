import { NavLink } from "react-router-dom";

import PATHS from "../../constants/paths";

import styles from "./header.module.scss";

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <h1 className={styles.slogan}>Beans Love Beers</h1>
            <nav>
                <ul className={styles.navList}>
                    <li><NavLink to={PATHS.HOME}>Home</NavLink></li>
                    <li><NavLink to={PATHS.FAVORITES}>Favorites</NavLink></li>
                    <li><NavLink to={PATHS.RANDOM_BEER}>Random beer</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}