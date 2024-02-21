import { useEffect, useState } from "react";

import BeerCard from "../beerCard/beerCard";
import { IBeer } from "../../types/beer";
import { getRandomBeer } from "../../api/apiBeer";

import styles from "./randomBeer.module.scss";


export default function RandomBeer() {
    const [beer, setBeer] = useState<IBeer>();
    useEffect(() => {
        getRandomBeer()
            .then((beers) => setBeer(beers[0]))
            .catch((err) => console.warn(err));
    }, []);
    return (
        <div className={styles.container}>
            {
                beer ? (
                    <>
                        <h2 className={styles.componentHeadings}>Your random beer is:</h2>
                        <BeerCard beer={beer} />
                    </>
                ) : (
                    <h2 className={styles.componentHeadings}>Loading...</h2>
                )
            }
        </div>

    );
}