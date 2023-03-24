
import { Card, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import SwapCard from './index';
import { theme } from '../../../theme';

export default {
    title: 'Organisms/SwapCard',
    component: SwapCard,

    decorators: [
        (Story) => (
            <ChakraProvider theme={theme}>
                <Card maxW={72} minW={56} align={"center"}  p={0} >
                    <Story />
                </Card>
            </ChakraProvider>
        ),
    ],
};

const Template = (args) => <SwapCard {...args} />;

export const swapCard = Template.bind({});
swapCard.args = {
    listing: {
        id: 1,
        brand: 'Green Elephant Yarn',
        colourway: 'Sunshine',
        weight: 'DK',
        fibreContent: '100% Wool',
        unitWeight: '100',
        meterage: '425',
        originalCount: '1',

        status: 'Available'
    }
};
