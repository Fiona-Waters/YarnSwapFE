import { Box, Button, SimpleGrid } from "@chakra-ui/react";

import { Listing } from "../../organisms/listing";

export function HomePageTemplate(props) {

    const { listings } = props;
    return (
        <Box flex={1} bg="green.200">
            <SimpleGrid columns="5" spacing={"2"}>
                {listings.map((listing) => (
                    <Listing listing={listing}></Listing>
                ))}
                
            </SimpleGrid>
        </Box>
    )
}