//import './App.css'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/homePage'
import About from './components/About'
import Listings from './components/Listings'
import MainLayout from "./components/layouts/main"
import { QueryClient, QueryClientProvider } from "react-query"

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        <Route index element={ <HomePage /> }/>
        <Route path="about" element={ <About/> }/>
        <Route path="listings" element={ <Listings/> }/>
      </Route>      

    </Routes>
    </QueryClientProvider>
 
  )
}

export default App
