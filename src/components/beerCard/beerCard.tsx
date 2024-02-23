import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

import { IBeer } from "../../types/beer";
import { useBeerContext } from "../../contexts/beerContext";
import hashBeerData from "../../utils/hasBeerData";
import beerOpenSound from "../../../assets/sounds/beer-open.mp3";

import styles from "./beerCard.module.scss"
import PATHS from "../../constants/paths";

export default function BeerCard({ beer }: { beer: IBeer }) {
    const location = useLocation();
    const { favorites, toggleFavorite, beers } = useBeerContext();
    const [isChanged, setIsChanged] = useState(false);
    const isFavorite = favorites.some((b) => b.id === beer.id);
    useEffect(() => {
        const checkIfChanged = async () => {
            if (location.pathname === "/favorites") {
                const b = beers.find((b) => b.id === beer.id);
                if (b) {
                    setIsChanged(await hashBeerData(b) !== beer.hash);
                }
            }
        };

        checkIfChanged();
    }, [location.pathname, beers, beer]);

    let beerName = beer.name;
    if (location.pathname === "/favorites") {
        if (isChanged) {
            beerName += " - changed";
        } else {
            beerName += " - not changed";
        }
    }

    const playBeerOpenSound = () => {
        const audio = new Audio(beerOpenSound);
        audio.play();
    };

    return (
        <div className={styles.beerContainer}>
            <div onClick={() => toggleFavorite(beer)} className={styles.starContainer}>
                <button className={styles.starBtn}>
                    {isFavorite ? <FaStar className={styles.star} /> : <FaRegStar className={styles.star} />}
                </button>
            </div>
            <div className={styles.imageDetailsContainer}>
                <div className={styles.imgContainer}>
                    <NavLink to={`${PATHS.BEER_DETAILS}/${beer.id - 1}`}>
                        <img onClick={playBeerOpenSound} className={styles.beerImg} src={beer.image_url} alt="beer-img" />
                    </NavLink>
                </div>
                <div className={styles.detailsContainer}>
                    <p className={styles.beerName}>{beerName}</p>
                    <p className={styles.beerDesc}>{beer.description.slice(0, 100)}...</p>
                </div>
            </div>
        </div>

    );
}