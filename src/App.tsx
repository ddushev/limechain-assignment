import { BrowserRouter, Route, Routes } from "react-router-dom"

import { BeerContextProvider } from "./contexts/beerContext"

import Home from "./components/home/home"
import Header from "./components/header/header"
import Favorites from "./components/favorites/favorites"
import RandomBeer from "./components/randomBeer/randomBeer"
import PATHS from "./constants/paths"
import Wallet from "./components/wallet/wallet"

function App() {


  return (
    <BrowserRouter>
      <BeerContextProvider>
        <Header />
        <Routes>
          <Route path={PATHS.HOME} element={<Home />}></Route>
          <Route path={PATHS.FAVORITES} element={<Favorites />}></Route>
          <Route path={PATHS.RANDOM_BEER} element={<RandomBeer />}></Route>
          <Route path={PATHS.WALLET} element={<Wallet />}></Route>
        </Routes>
      </BeerContextProvider>
    </BrowserRouter>
  )
}

export default App
