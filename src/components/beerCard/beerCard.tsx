import { IBeer } from "../../types/beer";
import { FaRegStar, FaStar } from "react-icons/fa";

import styles from './beerCard.module.scss'
import { useBeerContext } from "../../contexts/beerContext";

export default function BeerCard({ beer }: { beer: IBeer }) {
    const { favorites, toggleFavorite } = useBeerContext();
    const isFavorite = favorites.some((b) => b.id === beer.id);
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
                    <p className={styles.beerName}>{beer.name}</p>
                    <p className={styles.beerDesc}>{beer.description.slice(0, 100)}...</p>
                </div>
            </div>
        </div>

    );
}