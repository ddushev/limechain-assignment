import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/home/home"
import Header from "./components/header/header"
import Favorites from "./components/favorites/favorites"

function App() {


  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
