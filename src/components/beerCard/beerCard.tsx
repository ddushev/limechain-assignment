import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { IBeer } from "../../types/beer";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useBeerContext } from "../../contexts/beerContext";

import styles from './beerCard.module.scss'
import hashBeerData from "../../utils/hasBeerData";

export default function BeerCard({ beer }: { beer: IBeer }) {
    const location = useLocation();
    const { favorites, toggleFavorite, beers } = useBeerContext();
    const [isChanged, setIsChanged] = useState(false);
    const isFavorite = favorites.some((b) => b.id === beer.id);
    useEffect(() => {
        const checkIfChanged = async () => {
            if (location.pathname === '/favorites') {
                const b = beers.find((b) => b.id === beer.id);
                if (b) {
                    setIsChanged(await hashBeerData(b) !== beer.hash);
                }
            }
        };

        checkIfChanged();
    }, [location.pathname, beers, beer]);

    let beerName = beer.name;
    if (location.pathname === '/favorites') {
        if (isChanged) {
            beerName += ' - changed';
        } else {
            beerName += ' - not changed';
        }
    }

    return (
        <div className={styles.beerContainer}>
            <div onClick={() => toggleFavorite(beer)} className={styles.starContainer}>
                <button className={styles.starBtn}>
                    {isFavorite ? <FaStar className={styles.star} /> : <FaRegStar className={styles.star} />}
                </button>
            </div>
            <div className={styles.imageDetailsContainer}>
                <div className={styles.imgContainer}>
                    <img className={styles.beerImg} src={beer.image_url} alt="beer-img" />
                </div>
                <div className={styles.detailsContainer}>
                    <p className={styles.beerName}>{beerName}</p>
                    <p className={styles.beerDesc}>{beer.description.slice(0, 100)}...</p>
                </div>
            </div>
        </div>

    );
}