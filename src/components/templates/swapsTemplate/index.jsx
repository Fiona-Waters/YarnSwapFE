import { Box, Divider, Flex, Heading, SimpleGrid, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/primaryButton";
import { Listing } from "../../organisms/listing";


export function SwapsTemplate(props) {

    const { listings, refreshListings, currentUser } = props

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
                        <Flex p={5}>
                            <Box flex='1' p={5} align={"center"} >
                                <Heading as='h3' size='md'> Incoming Swap Requests </Heading>

                                <br></br>

                                <SimpleGrid columns={gridCount} spacing={'8'} w={'full'}>
                                    {listings?.map((listing, i) => (
                                        <Listing listing={listing} key={i} currentUser={currentUser} refreshListings={refreshListings}></Listing>
                                    ))}
                                </SimpleGrid>
                            </Box>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex p={5}>
                            <Box flex='1' p={5} align={"center"} >
                                <Heading as='h3' size='md'> Outgoing Swap Requests </Heading>
                                <br></br>
                                <SimpleGrid columns={gridCount} spacing={'8'} w={'full'}>
                                    {listings?.map((listing, i) => (
                                        <Listing listing={listing} key={i} currentUser={currentUser} refreshListings={refreshListings}></Listing>
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
