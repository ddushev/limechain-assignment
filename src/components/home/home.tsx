import { useBeerContext } from "../../contexts/beerContext";
import BeerList from "../beerList/beerList";
import SearchBeer from "../searchBeer/searchBeer";

export default function Home() {
    const { beers } = useBeerContext();
    return (
        <>
            <SearchBeer />
            <BeerList beers={beers} />
        </>
    );
}