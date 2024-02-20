import { IBeer } from "../../types/beer";
import { FaRegStar } from "react-icons/fa";

import styles from './beerCard.module.scss'

export default function BeerCard({ beer }: { beer: IBeer }) {
    return (
        <div className={styles.beerContainer}>
            <div className={styles.starContainer}>
                <FaRegStar className={styles.star} />
            </div>
            <div className={styles.imageDetailsContainer}>
                <div className={styles.imgContainer}>
                    <img className={styles.beerImg} src={beer.image_url} alt="beer-img" />
                </div>
                <div className={styles.detailsContainer}>
                    <p className={styles.beerName}>{beer.name}</p>
                    <p className={styles.beerDesc}>{beer.description.slice(0,100)}...</p>
                </div>
            </div>
        </div>

    );
}