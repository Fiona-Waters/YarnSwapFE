//import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './pages/homePage'
import About from './components/About'
import Listings from './components/Listings'
import MainLayout from "./components/layouts/main"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './theme.js'
import RegisterLogin from "./pages/register-login"
import DashboardPage from "./pages/dashboardPage"
import ListingsPage from "./pages/listingsPage"
import SwapsPage from "./pages/swapsPage"
import { SwapChatPage } from "./pages/swapChatPage"
import MyProfilePage from "./pages/myProfilePage"
import ProfilePage from "./pages/profilePage"


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1800000,
        staleTime: 1800000
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter >
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<RegisterLogin />} />
          <Route path="register" element={<RegisterLogin />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/*" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="about" element={<About />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="swaps" element={<SwapsPage />} />
            <Route path="swapchat" element={<SwapChatPage />} />
            <Route path="myprofile" element={<MyProfilePage />} />
          </Route>

        </Routes>
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>

  )
}

export default App
