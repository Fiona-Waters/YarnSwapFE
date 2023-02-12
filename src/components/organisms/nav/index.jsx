import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
   
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

export function NavigationMenu() {

    const location = useLocation()
    const page = location.pathname;

    return (
        <Breadcrumb separator="" spacing="20px"  fontSize={'xl'}>
            <BreadcrumbItem isCurrentPage={page === '/dashboard'} fontWeight={page === '/dashboard' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/listings'} fontWeight={page === '/listings' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/listings">Listings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/swaps'} fontWeight={page === '/swaps' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/swaps">Swaps</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/wishlist'} fontWeight={page === '/wishlist' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/wishlist">Wishlist</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/forum'} fontWeight={page === '/forum' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/forum">Forum</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/about'} fontWeight={page === '/about' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/about">About</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/profile'} fontWeight={page === '/profile' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/profile">My Profile</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}