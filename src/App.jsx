//import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from './pages/homePage'
import MainLayout from "./components/layouts/main"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './theme.js'
import { RegisterLogin } from "./pages/register-login"
import DashboardPage from "./pages/dashboardPage"
import ListingsPage from "./pages/listingsPage"
import SwapsPage from "./pages/swapsPage"
import { SwapChatPage } from "./pages/swapChatPage"
import MyProfilePage from "./pages/myProfilePage"
import ProfilePage from "./pages/profilePage"
import AboutPage from "./pages/aboutPage"
import ProtectedRoute from "./protectedRoute";
import { WishlistPage } from "./pages/wishlistPage";


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
            <Route path="about" element={<AboutPage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="swaps" element={<SwapsPage />} />
            <Route path='wishlist' element={<WishlistPage/>} />
            <Route path="swapchat" element={<SwapChatPage />} />
            <Route path="myprofile" element={<MyProfilePage />} />
            <Route path="admin" element={<ProtectedRoute/> } />
          </Route>

        </Routes>
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>

  )
}

export default App
