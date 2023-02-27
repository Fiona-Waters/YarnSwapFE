import { Box, Divider, Flex, Heading, SimpleGrid, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpoint, useBreakpointValue, useControllableProp } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { PrimaryButton } from "../../atoms/primaryButton";
import { Listing } from "../../organisms/listing";
import { SwapCard } from "../../organisms/swapCard";


export function SwapsTemplate(props) {

    const { swaps, listings, refreshListings, refreshSwaps, currentUser } = props
    const [inComingSwaps, setIncomingSwaps] = useState([])
    const [outgoingSwaps, setOutgoingSwaps] = useState([])

    useEffect(() => {
        const i = [];
        const o = [];
        swaps?.map((swap) => {
            if (swap.swap.swapperUserId == currentUser.uid && swap.swap.swapStatus != "Archived") {
                i.push(swap)
            }
            if (swap.swap.swappeeUserId == currentUser.uid && swap.swap.swapStatus != "Archived") {
                o.push(swap)
            }
        })
        setIncomingSwaps(i);
        setOutgoingSwaps(o);
        console.log('Use Effect Called', swaps)
    }, [swaps, currentUser])

    const bp = useBreakpoint();

    const gridCount = useBreakpointValue({
        base: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        '2xl': 2
    })
    return (
        <>
            <Spacer />
            <Tabs>
                <TabList>
                    <Tab>
                        <Heading as='h3' size='md'> Incoming Swap Requests </Heading>
                    </Tab>
                    <Tab>
                        <Heading as='h3' size='md'> Outgoing Swap Requests </Heading>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex spacing='4' p={5}>
                            <Box flex='1' p={5} align={"center"} >
                                <Heading as='h3' size='md'> Incoming Swap Requests </Heading>
                                <br></br>
                                <SimpleGrid columns={gridCount} spacing={'8'} w={'full'}>
                                    {inComingSwaps?.map((swap, i) =>
                                    (
                                        <SwapCard listings={listings} listing={swap.listing} swap={swap} key={i} currentUser={currentUser} refreshListings={refreshListings} refreshSwaps={refreshSwaps} />
                                    ))}
                                </SimpleGrid>
                            </Box>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex spacing='4' p={5}>
                            <Box flex='1' p={5} align={"center"} >
                                <Heading as='h3' size='md'> Outgoing Swap Requests </Heading>
                                <br></br>
                                <SimpleGrid columns={gridCount} spacing={'8'} w={'full'}>
                                    {outgoingSwaps?.map((swap, i) => (
                                        <SwapCard listings={listings} listing={swap.listing} swap={swap} key={i} currentUser={currentUser} refreshListings={refreshListings} />
                                    ))}
                                </SimpleGrid>
                            </Box>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>

    )
}
