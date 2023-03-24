import { Box, Button, ButtonGroup, HStack, SimpleGrid, useBreakpoint, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../atoms/logo";
import PrimaryButton from "../../atoms/primaryButton";

import Listing from "../../organisms/listing";

export default function HomePageTemplate(props) {

    const { listings } = props;
    const [ availableListings, setAvailableListings ] = useState([])
   
    useEffect(() => {
        const l = [];
        listings?.map((listing) => {
            if (listing.swappable == true && listing.status == 'Available') {
                l.push(listing)
            }
        })
        setAvailableListings(l)
    }, [listings])
    

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
                <Link to={'register'}><PrimaryButton label={'Register'}/></Link>
                <Link to={'login'}><PrimaryButton label={'Login'}/></Link>
                </ButtonGroup>
            </HStack>
            <Box >
                <SimpleGrid columns={gridCount} spacing={'25'}>
                    {availableListings?.map((listing, i) => (
                        <Listing listing={listing} key={i}></Listing>
                    ))}
                    
                </SimpleGrid>
            </Box>
        </VStack>
    )
}
