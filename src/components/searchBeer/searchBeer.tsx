import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useBeerContext } from "../../contexts/beerContext";
import QUERY_PARAMS from "../../constants/queryParams";

import SimpleBtn from "../../elements/simpleBtn/simpleBtn";

import styles from "./searchBeer.module.scss";

export default function SearchBeer() {
    const [searchValue, setSearchValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchBeers } = useBeerContext();

    useEffect(() => {
        const beerName = searchParams.get(QUERY_PARAMS.BEER_NAME);
        if (beerName) {
            setSearchValue(beerName);
            searchBeers(beerName);
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const handleSearchClick = () => {
        const updateSearchParams = new URLSearchParams(searchParams);
        if (!searchValue) {
            updateSearchParams.delete(QUERY_PARAMS.BEER_NAME);
            setSearchParams(updateSearchParams);
            return;
        }
        updateSearchParams.set(QUERY_PARAMS.BEER_NAME, searchValue);
        setSearchParams(updateSearchParams);
        searchBeers(searchValue);
    }

    return (
        <div className={styles.searchContainer}>
            <input className={styles.searchInput} type="text" name="beerName" id="searchBeer" placeholder="Search for beer..." value={searchValue} onChange={handleInputChange} />
            <SimpleBtn onClickHandler={handleSearchClick} type="button" additionalStyles={styles.searchBtn}>Search</SimpleBtn>
        </div>
    );
}