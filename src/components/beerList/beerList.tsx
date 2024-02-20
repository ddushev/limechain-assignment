import { useEffect, useState } from 'react';
import styles from './beerList.module.scss'
import { getAllBeers } from '../../api/apiBeer';
import { IBeer } from '../../types/beer';

export default function BeerList() {
    const [beers, setBeers] = useState<IBeer[]>([]);

    useEffect(() => {
        getAllBeers()
            .then((data) => setBeers(data))
            .catch((err) => console.warn(err.message));
    }, []);
    return (
        <div className={styles.beerListContainer}>
            BeerList
        </div>
    );
}