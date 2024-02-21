import { useLocation, useSearchParams } from "react-router-dom";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { IBeer } from "../types/beer";
import { getBeers } from "../api/apiBeer";
import QUERY_PARAMS from "../constants/queryParams";
import hashBeerData from "../utils/hasBeerData";

interface IContext {
    beers: IBeer[],
    favorites: IBeer[],
    searchBeers: (searchText: string) => void,
    toggleFavorite: (beer: IBeer) => void,
}


const BeerContext = createContext<IContext | undefined>(undefined);

export const BeerContextProvider = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const [beers, setBeers] = useState<IBeer[]>([]);
    const [favorites, setFavorites] = useState<IBeer[]>([]);

    const [searchParams, _setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get(QUERY_PARAMS.BEER_NAME)) {
            getBeers()
                .then((data) => setBeers(data))
                .catch((err) => console.warn(err.message));
        }

    }, [searchParams, location]);

    async function searchBeers(searchText: string) {
        try {
            const foundBeers = await getBeers(`${QUERY_PARAMS.BEER_NAME}=${searchText}`);
            setBeers(foundBeers);
        } catch (err: any) {
            console.warn(err.message)
        }

    }

    async function toggleFavorite(beer: IBeer) {
        let currentHash: string;
        
        if (beer.hash) {
            const { hash } = beer;
            currentHash = hash;
        } else {
            currentHash = await hashBeerData(beer);
        }
    
        if (favorites.some((b) => b.hash === currentHash)) {
            setFavorites(favorites.filter((b) => b.hash !== currentHash));
        } else {
            setFavorites([...favorites, { ...beer, hash: currentHash }]);
        }
    }
    

    const context = {
        beers,
        favorites,
        searchBeers,
        toggleFavorite,
    }

    return (
        <BeerContext.Provider value={context}>
            {children}
        </BeerContext.Provider>
    );
}

export const useBeerContext = () => {
    const context = useContext(BeerContext);
    if (!context) {
        throw new Error("useBeerContext must be used within a BeerContextProvider");
    }
    return context;
}