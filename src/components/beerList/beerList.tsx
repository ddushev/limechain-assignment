import BeerCard from '../beerCard/beerCard';
import { IBeer } from '../../types/beer';

import styles from "./beerList.module.scss"

export default function BeerList({ beers }: {beers: IBeer[]}) {
    return (
        <div className={styles.beerListContainer}>
            {beers.map((beer) => <BeerCard key={beer.id} beer={beer} />)}
        </div>
    );
}