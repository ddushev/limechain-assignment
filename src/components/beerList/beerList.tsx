import styles from './beerList.module.scss'
import BeerCard from '../beerCard/beerCard';
import { useBeerContext } from '../../contexts/beerContext';

export default function BeerList() {
    const { beers } = useBeerContext();
    return (
        <div className={styles.beerListContainer}>
            {beers.map((beer) => <BeerCard key={beer.id} beer={beer}/>)}
        </div>
    );
}