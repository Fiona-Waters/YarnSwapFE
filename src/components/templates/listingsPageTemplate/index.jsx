import { useBreakpoint, useBreakpointValue, useDisclosure, HStack, VStack, Box, SimpleGrid, Spacer, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { set } from "react-hook-form";
import { PrimaryButton } from "../../atoms/primaryButton";
import { Listing } from "../../organisms/listing";

export function ListingsPageTemplate(props) {
    //TODO add search box and functionality

    const { listings, refreshListings, currentUser } = props
    const [ allOtherListings, setAllOtherListings ] = useState()

    useEffect(() => {
        const l = [];
        listings.map((listing) => {
            if (listing.userId != currentUser.uid && listing.swappable == true && listing.status == 'Available') {
                l.push(listing)
            }
        })
        setAllOtherListings(l);
    }, [listings, currentUser])
    

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
                <PrimaryButton label={'Search'} />
            </HStack>
            <SimpleGrid columns={gridCount} spacing={'8'} w={'full'}>
                {allOtherListings?.map((listing, i) => (
                    <Listing listing={listing} key={i} currentUser={currentUser} refreshListings={refreshListings}></Listing>
                ))}
            </SimpleGrid>
        </VStack>
    )

}