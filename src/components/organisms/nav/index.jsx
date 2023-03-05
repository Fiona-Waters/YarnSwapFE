import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
   
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

export function NavigationMenu() {

    const location = useLocation()
    const page = location.pathname;

    return (
        <Breadcrumb separator="" spacing="20px"  fontSize={'xl'}>
            <BreadcrumbItem isCurrentPage={page === '/dashboard'} fontWeight={page === '/dashboard' ? 'bold': 'normal'}>
                <BreadcrumbLink as={Link} to="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/listings'} fontWeight={page === '/listings' ? 'bold': 'normal'}>
                <BreadcrumbLink as={Link} to="/listings">Listings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/swaps'} fontWeight={page === '/swaps' ? 'bold': 'normal'}>
                <BreadcrumbLink as={Link} to="/swaps">Swaps</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/wishlist'} fontWeight={page === '/wishlist' ? 'bold': 'normal'}>
                <BreadcrumbLink as={Link} to="/wishlist">Wishlist</BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbItem isCurrentPage={page === '/forum'} fontWeight={page === '/forum' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/forum">Forum</BreadcrumbLink>
            </BreadcrumbItem> */}
            <BreadcrumbItem isCurrentPage={page === '/about'} fontWeight={page === '/about' ? 'bold': 'normal'}>
                <BreadcrumbLink as={Link} to="/about">About</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/myprofile'} fontWeight={page === '/myprofile' ? 'bold': 'normal'}>
                <BreadcrumbLink as={Link} to="/myprofile">My Profile</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}