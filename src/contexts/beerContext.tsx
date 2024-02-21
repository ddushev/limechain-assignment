import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { IBeer } from "../types/beer";
import { getAllBeers } from "../api/apiBeer";

interface IContext {
    beers: IBeer[]
}

const BeerContext = createContext<IContext | undefined>(undefined);

export const BeerContextProvider = ({ children }: { children: ReactNode }) => {
    const [beers, setBeers] = useState<IBeer[]>([]);

    useEffect(() => {
        getAllBeers()
            .then((data) => setBeers(data))
            .catch((err) => console.warn(err.message));
    }, []);

    const context = {
        beers
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