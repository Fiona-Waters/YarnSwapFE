import { useBreakpoint, useBreakpointValue, useDisclosure, HStack, VStack, Box, SimpleGrid, Spacer, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Listing } from "../../organisms/listing";

export function AdminPageTemplate(props) {

    const { listings, refreshListings, currentUser } = props
    const [listingsForApproval, setListingsForApproval] = useState([])

    useEffect(() => {
        console.log("this one", listings)
        const l = [];
        listings?.map((listing) => {
            // An admin will only see listings here that are awaiting approval and that are not their own
            if (listing.status == "Awaiting approval" && currentUser.uid != listing.userId) {
                l.push(listing)
            }
        })
        setListingsForApproval(l)
    }, [listings])

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
          
            <Heading as='h3' size='md' alignSelf={"flex-start"} fontFamily={"sans-serif"} fontWeight={'bold'}>Listings For Approval</Heading>
            <SimpleGrid p={'5'} columns={gridCount} spacing={'8'} w={'full'}>
                {listingsForApproval?.map((listing, i) => (
                    <Listing refreshListings={refreshListings} listing={listing} key={i} currentUser={currentUser} />
                ))}

            </SimpleGrid>

        </VStack>
    )

}