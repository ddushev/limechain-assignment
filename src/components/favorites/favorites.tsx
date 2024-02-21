import { useBeerContext } from "../../contexts/beerContext";
import BeerList from "../beerList/beerList";

import style from "./favorites.module.scss";

export default function Favorites() {
    const { favorites } = useBeerContext();
    return (
        <>
            <h2 className={style.favoritesHeading}>{favorites.length > 0 ? 'Your Favorites:' : 'Nothing in your list yet.'}</h2>
            <BeerList beers={favorites} />
        </>
    );

}