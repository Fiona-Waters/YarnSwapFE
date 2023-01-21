import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from './components/Home'
import About from './components/About'
import Listings from './components/Listings'

function App() {

  return (
   <div className="App">
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/about" element={ <About/> }/>
      <Route path="/listings" element={ <Listings/> }/>
    </Routes>
   </div>
  )
}

export default App
