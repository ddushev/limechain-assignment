import { BrowserRouter, Route, Routes } from "react-router-dom"

import { BeerContextProvider } from "./contexts/beerContext"

import Home from "./components/home/home"
import Header from "./components/header/header"
import Favorites from "./components/favorites/favorites"

function App() {


  return (
    <BrowserRouter>
      <BeerContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/favorites' element={<Favorites />}></Route>
        </Routes>
      </BeerContextProvider>
    </BrowserRouter>
  )
}

export default App
