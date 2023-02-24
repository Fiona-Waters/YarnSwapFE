import { Card, Divider, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { ListingHeadBody } from "../../molecules/listingHeadBody";

export function SwapCard(props) {

    const {listings, listing} = props
    return(
        <>
        <Card maxW='960px' mx="auto" minW={56} align={"center"}  p={0} border='4px' borderColor={'brand.blue'} >
            <Stack divider={<StackDivider />} spacing='4'>
        <ListingHeadBody listings={listings} listing={listing}/>
        
        </Stack>
        </Card>
        
        </>
    )
}