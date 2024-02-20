import styles from './searchBeer.module.scss';

export default function SearchBeer() {
    return (
        <div className={styles.searchContainer}>
            <input className={styles.searchInput} type="text" name="beerName" id="searchBeer" placeholder="Search for beer..." />
            <button className={styles.searchBtn}>Search</button>
        </div>
    );
}