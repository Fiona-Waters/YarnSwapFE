import { useBreakpoint, useBreakpointValue, useDisclosure, HStack, VStack, Box, SimpleGrid, Spacer, Heading } from "@chakra-ui/react";
import { getBrands } from "../../../api/yarn-swap-api";
import { PrimaryButton } from "../../atoms/primaryButton";
import { AddListingForm } from "../../organisms/addListingForm";
import { Listing } from "../../organisms/listing";

export function DashboardTemplate(props) {
    //TODO add search box and functionality

    const { listings, refreshListings, currentUser } = props

    let userListings = [];
    listings?.map((listing) => {
        if (listing.userId == currentUser) {
            userListings.push(listing)
        }
    })

    const bp = useBreakpoint();

    const gridCount = useBreakpointValue({
        base: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        '2xl': 4
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log(bp, gridCount);
    return (
        <VStack w="full" flex="1" spacing={12} >
            <HStack w="full" >
                <PrimaryButton label={'Create Listing'} onClick={onOpen} />
                <Spacer />
                <PrimaryButton label={'Search'} onClick={onOpen} />
            </HStack>
            <Heading bg='brand.blue' alignSelf={"flex-start"} fontFamily={"sans-serif"} fontSize={"2xl"} color={'black'} fontWeight={'bold'}>My Listings</Heading>

            <AddListingForm isOpen={isOpen} onClose={onClose} refreshListings={refreshListings} currentUser={currentUser} />

            <SimpleGrid columns={gridCount} spacing={'8'} w={'full'}>
                {userListings?.map((listing, i) => (
                    <Listing listing={listing} key={i} currentUser={currentUser}></Listing>
                ))}

            </SimpleGrid>

        </VStack>
    )

}