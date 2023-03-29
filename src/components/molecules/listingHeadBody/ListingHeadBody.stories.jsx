
import { ChakraProvider } from '@chakra-ui/react';
import { Card } from '@chakra-ui/react';
import React from 'react';
import ListingHeadBody from './index';
import { theme } from '../../../theme';

export default {
    title: 'Molecules/ListingHeadBody',
    component: ListingHeadBody,

    decorators: [
        (Story) => (
            <ChakraProvider theme={theme}>
                <Card maxW={72} minW={56} align={"center"} border='4px' p={0} borderColor={'brand.teal'}>
                    <Story />
                </Card>
            </ChakraProvider>
        ),
    ],
};

const Template = (args) => <ListingHeadBody {...args} />;

export const listingHeadBody = Template.bind({});
listingHeadBody.args = {
    listing: {
        userName: 'fwaters123',
        brand: 'Green Elephant Yarn',
        colourway: 'Sunshine',
        weight: 'DK',
        fibreContent: '100% Wool',
        meterage: "200",
        originalCount: 1,
        swappable: true,
        status: "Available",
        image: "../../../../public/icon-192x192.png",
    }
};
