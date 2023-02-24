//import './App.css'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/homePage'
import About from './components/About'
import Listings from './components/Listings'
import MainLayout from "./components/layouts/main"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './theme.js'
import RegisterLogin from "./pages/register-login"
import DashboardPage from "./pages/dashboardPage"
import ListingsPage from "./pages/listingsPage"
import SwapsPage from "./pages/swapsPage"


function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
      <Routes>
        <Route index element={ <HomePage /> }/>
        <Route path="login" element={<RegisterLogin/>}/>
        <Route path="register" element={<RegisterLogin/>}/>
          <Route path="/*" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage/>}/>
            <Route path="about" element={ <About/> }/>
            <Route path="listings" element={ <ListingsPage/> }/>
            <Route path="swaps" element={ <SwapsPage/> } />
          </Route>      

      </Routes>
    </ChakraProvider>
    </QueryClientProvider>
 
  )
}

export default App
