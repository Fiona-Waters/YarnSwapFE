import { useBreakpoint, useBreakpointValue, useDisclosure, HStack, VStack, Box, SimpleGrid, Spacer } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/primaryButton";
import { AddListingForm } from "../../organisms/addListingForm";
import { Listing } from "../../organisms/listing";

export function DashboardTemplate(props) {
    //TODO create 'add listing' form and functionality
    //TODO add search box and functionality
    //TODO get and display users own listings


    const { listings } = props

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
                <PrimaryButton label={'Create Listing'} onclick={onOpen} />
                <Spacer/>
                <PrimaryButton label={'Search'} onclick={onOpen} />
            </HStack>
            <AddListingForm isOpen={isOpen} onClose={onClose} />

            <SimpleGrid columns={gridCount} spacing={'25'} w={'full'}>
                {listings?.map((listing, i) => (
                    <Listing listing={listing} key={i}></Listing>
                ))}

            </SimpleGrid>

        </VStack>
    )

}