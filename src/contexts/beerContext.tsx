import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { IBeer } from "../types/beer";
import { getBeers } from "../api/apiBeer";
import { useSearchParams } from "react-router-dom";
import QUERY_PARAMS from "../constants/queryParams";

interface IContext {
    beers: IBeer[],
    searchBeers: (searchText: string) => void;
}

const BeerContext = createContext<IContext | undefined>(undefined);

export const BeerContextProvider = ({ children }: { children: ReactNode }) => {
    const [beers, setBeers] = useState<IBeer[]>([]);
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

    const context = {
        beers,
        searchBeers
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