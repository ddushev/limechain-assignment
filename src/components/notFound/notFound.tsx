import { NavLink } from "react-router-dom";
import PATHS from "../../constants/paths";
import styles from "./notFound.module.scss";

export default function NotFound() {
    return (
        <>
            <h2 className={styles.notFoundHeading}>Page not found</h2>
            <NavLink className={styles.homeLink} to={PATHS.HOME}>Go to homepage</NavLink>
        </>
    )
}