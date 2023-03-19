import { useBreakpoint, useBreakpointValue, useDisclosure, HStack, VStack, Box, SimpleGrid, Spacer, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { set } from "react-hook-form";
import { PrimaryButton } from "../../atoms/primaryButton";
import { Search } from "../../atoms/search";
import { Listing } from "../../organisms/listing";

export function ListingsPageTemplate(props) {
    //TODO add search box and functionality

    const { listings, refreshListings, currentUser } = props
    const [allOtherListings, setAllOtherListings] = useState()
    const [filterBrand, setFilterBrand] = useState("")
    const [filterWeight, setFilterWeight] = useState("")
    const [filterFibre, setFilterFibre] = useState("")
    const [filterUsername, setFilterUsername] = useState("")
    const [filterStatus, setFilterStatus] = useState("")

    // order the listings by most recent first
    listings.reverse()
    
    useEffect(() => {
        let l = [];
        listings.map((listing) => {
            if (listing.userId != currentUser.uid && listing.swappable == true && listing.status == 'Available') {
                l.push(listing)
            }
        })
        if (filterBrand) {
            l = l.filter((i) => i.brand?.toLowerCase().search(filterBrand.toLowerCase()) !== -1)
        }
        if (filterWeight) {
            l = l.filter((i) => i.weight?.toLowerCase().search(filterWeight.toLowerCase()) !== -1)
        }
        if (filterFibre) {
            l = l.filter((i) => i.fibreContent?.toLowerCase().search(filterFibre.toLowerCase()) !== -1)
        }
        if (filterUsername) {
            l = l.filter((i) => i.userName?.toLowerCase().search(filterUsername.toLowerCase()) !== -1)
        }
        if (filterStatus) {
            l = l.filter((i) => i.status?.toLowerCase().search(filterStatus.toLowerCase()) !== -1)
        }
        setAllOtherListings(l);
    }, [listings, currentUser, filterBrand, filterWeight, filterFibre, filterUsername, filterStatus])

    const handleChange = (type, value) => {
        if (type === "brand") setFilterBrand(value)
        else if (type === "weight") setFilterWeight(value)
        else if (type === "fibre") setFilterFibre(value)
        else if (type === "username") setFilterUsername(value)
        else if (type === "status") setFilterStatus(value)
    }

    const bp = useBreakpoint();

    const gridCount = useBreakpointValue({
        base: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        '2xl': 4
    })


    return (
        <VStack w="full" flex="1" spacing={12} >
            <HStack w="full" >
                <Spacer />
                <Search onUserInput={handleChange} filterBrand={filterBrand} filterWeight={filterWeight} filterFibre={filterFibre} filterUsername={filterUsername} listings={allOtherListings} filterStatus={filterStatus} currentUser={currentUser.uid} />
            </HStack>
            <SimpleGrid columns={gridCount} spacing={'8'} w={'full'}>
                {allOtherListings?.map((listing, i) => (
                    <Listing listing={listing} key={i} currentUser={currentUser} refreshListings={refreshListings}></Listing>
                ))}
            </SimpleGrid>
        </VStack>
    )

}