import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Spacer, Text, VStack } from "@chakra-ui/react";

const AboutPage = () => {


    return (
        <>
            <Spacer p='10px' />
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'brand.blue', color: 'black' }}>
                            <Box as="span" flex='1' textAlign='left' fontSize='2xl'>
                                Yarn Swap Guidelines
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Insert List of Guidelines here
                        <ol>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ol>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'brand.teal', color: 'black' }}>
                            <Box as="span" flex='1' textAlign='left' fontSize='2xl'>
                                FAQs
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Insert FAQs here
                        <ol>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ol>
                        
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default AboutPage;