//import './App.css'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/homePage'
import About from './components/About'
import Listings from './components/Listings'
import MainLayout from "./components/layouts/main"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './theme.js'


function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
      <Routes>
        <Route index element={ <HomePage /> }/>
        <Route path="/*" element={<MainLayout />}>
          
          <Route path="about" element={ <About/> }/>
          <Route path="listings" element={ <Listings/> }/>
        </Route>      

      </Routes>
    </ChakraProvider>
    </QueryClientProvider>
 
  )
}

export default App
