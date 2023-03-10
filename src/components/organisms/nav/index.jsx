import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom'
import { getUserProfile } from '../../../api/yarn-swap-api';

export function NavigationMenu() {
    const { data: userProfile } = useQuery('getUserProfile', getUserProfile)
    var isAdminUser = Boolean(userProfile?.role == "admin");

    const location = useLocation()
    const page = location.pathname;

    return (
        <Breadcrumb separator="" spacing="20px" fontSize={'xl'}>
            <BreadcrumbItem isCurrentPage={page === '/dashboard'} fontWeight={page === '/dashboard' ? 'bold' : 'normal'} color={page === '/dashboard' ? 'brand.navBlue' : 'normal'}>
                <BreadcrumbLink as={Link} to="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/listings'} fontWeight={page === '/listings' ? 'bold' : 'normal'} color={page === '/listings' ? 'brand.navBlue' : 'normal'}>
                <BreadcrumbLink as={Link} to="/listings">Listings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/swaps'} fontWeight={page === '/swaps' ? 'bold' : 'normal'} color={page === '/swaps' ? 'brand.navBlue' : 'normal'}>
                <BreadcrumbLink as={Link} to="/swaps">Swaps</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/wishlist'} fontWeight={page === '/wishlist' ? 'bold' : 'normal'} color={page === '/wishlist' ? 'brand.navBlue' : 'normal'}>
                <BreadcrumbLink as={Link} to="/wishlist">Wishlist</BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbItem isCurrentPage={page === '/forum'} fontWeight={page === '/forum' ? 'bold': 'normal'}>
                <BreadcrumbLink href="/forum">Forum</BreadcrumbLink>
            </BreadcrumbItem> */}
            <BreadcrumbItem isCurrentPage={page === '/about'} fontWeight={page === '/about' ? 'bold' : 'normal'} color={page === '/about' ? 'brand.navBlue' : 'normal'}>
                <BreadcrumbLink as={Link} to="/about">About</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={page === '/myprofile'} fontWeight={page === '/myprofile' ? 'bold' : 'normal'} color={page === '/myprofile' ? 'brand.navBlue' : 'normal'}>
                <BreadcrumbLink as={Link} to="/myprofile">My Profile</BreadcrumbLink>
            </BreadcrumbItem>
            {isAdminUser
                ? <BreadcrumbItem isCurrentPage={page === '/admin'} fontWeight={page === '/admin' ? 'bold' : 'normal'} color={page === '/admin' ? 'brand.navBlue' : 'normal'}>
                    <BreadcrumbLink as={Link} to="/admin">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                : <></>
            }
        </Breadcrumb>
    )
}