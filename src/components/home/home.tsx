import BeerList from "../beerList/beerList";
import SearchBeer from "../searchBeer/searchBeer";

export default function Home() {
    return (
        <>
            <SearchBeer />
            <BeerList />
        </>
    );
}