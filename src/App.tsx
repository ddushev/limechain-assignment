import { BrowserRouter, Route, Routes } from "react-router-dom"
import Wagmi from "./components/wagmi"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Wagmi />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
