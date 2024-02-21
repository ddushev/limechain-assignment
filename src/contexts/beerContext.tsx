import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { IBeer } from "../types/beer";
import { getBeers } from "../api/apiBeer";
import { useSearchParams } from "react-router-dom";
import QUERY_PARAMS from "../constants/queryParams";

interface IContext {
    beers: IBeer[],
    favorites: Set<IBeer>,
    searchBeers: (searchText: string) => void,
    toggleFavorite: (beer: IBeer) => void,
}

const BeerContext = createContext<IContext | undefined>(undefined);

export const BeerContextProvider = ({ children }: { children: ReactNode }) => {
    const [beers, setBeers] = useState<IBeer[]>([]);
    const [favorites, setFavorites] = useState<Set<IBeer>>(new Set());

    const [searchParams, _setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get(QUERY_PARAMS.BEER_NAME)) {
            getBeers()
                .then((data) => setBeers(data))
                .catch((err) => console.warn(err.message));
        }

    }, [searchParams]);

    async function searchBeers(searchText: string) {
        try {
            const foundBeers = await getBeers(`${QUERY_PARAMS.BEER_NAME}=${searchText}`);
            setBeers(foundBeers);
        } catch (err: any) {
            console.warn(err.message)
        }

    }

    function toggleFavorite(beer: IBeer) {
        const updatedFavorites = new Set(favorites);
        if (updatedFavorites.has(beer)) {
            updatedFavorites.delete(beer);
        } else {
            updatedFavorites.add(beer);
        }
        setFavorites(updatedFavorites);
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