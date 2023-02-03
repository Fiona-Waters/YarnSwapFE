import { Box, Button, ButtonGroup, HStack, SimpleGrid, useBreakpoint, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Logo } from "../../atoms/logo";
import { PrimaryButton } from "../../atoms/primaryButton";

import { Listing } from "../../organisms/listing";

export function HomePageTemplate(props) {

    const { listings } = props;

    const bp = useBreakpoint();

    const gridCount = useBreakpointValue({
        base: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        '2xl': 5
    })

    console.log(bp, gridCount);
    return (
        <VStack h="full" w="full" minH="100vh" spacing={12} pt={120}>
            <Box>
                <Logo w={40} h={40}/>
            </Box>
            <HStack>
                <ButtonGroup spacing='3'>
                    <PrimaryButton label={'Register'}/>
                    <PrimaryButton label={'Login'}/>
                </ButtonGroup>
            </HStack>
            <Box >
                <SimpleGrid columns={gridCount} spacing={'25'}>
                    {listings.map((listing, i) => (
                        <Listing listing={listing} key={i}></Listing>
                    ))}
                    
                </SimpleGrid>
            </Box>
        </VStack>
    )
}
