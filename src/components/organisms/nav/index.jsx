import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
   
} from '@chakra-ui/react'

export function NavigationMenu() {
    return (
        <Breadcrumb separator="" spacing="20px" fontWeight={'bold'} fontSize={'xl'}>
            <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink href="/listings">Listings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink href="/swaps">Swaps</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink href="/wishlist">Wishlist</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink href="/forum">Forum</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink href="/about">About</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink href="/profile">My Profile</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}