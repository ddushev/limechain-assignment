import { BrowserRouter, Route, Routes } from "react-router-dom"

import { BeerContextProvider } from "./contexts/beerContext"
import { WalletGuard } from "./components/walletGuard/walletGuard"

import Home from "./components/home/home"
import Header from "./components/header/header"
import Favorites from "./components/favorites/favorites"
import RandomBeer from "./components/randomBeer/randomBeer"
import PATHS from "./constants/paths"
import Wallet from "./components/wallet/wallet"
import BeerDetails from "./components/beerDetails/beerDetails"
import AddBeer from "./components/addBeer/addBeer"

function App() {


    return (
        <BrowserRouter>
            <BeerContextProvider>
                <Header />
                <Routes>
                    <Route element={<WalletGuard />}>
                        <Route path={PATHS.HOME} element={<Home />}></Route>
                        <Route path={PATHS.FAVORITES} element={<Favorites />}></Route>
                        <Route path={PATHS.RANDOM_BEER} element={<RandomBeer />}></Route>
                        <Route path={PATHS.ADD_BEER} element={<AddBeer />}></Route>
                        <Route path={`${PATHS.BEER_DETAILS}/:beerId`} element={<BeerDetails />}></Route>
                    </Route>
                    <Route path={PATHS.WALLET} element={<Wallet />}></Route>
                </Routes>
            </BeerContextProvider>
        </BrowserRouter>
    )
}

export default App
