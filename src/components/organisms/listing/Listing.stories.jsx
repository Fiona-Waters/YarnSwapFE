
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import Listing from './index';
import { theme } from '../../../theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

export default {
  title: 'Organisms/Listing',
  component: Listing,

  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient} theme={theme}>
        <ChakraProvider theme={theme}>
          <Story />
        </ChakraProvider>
      </QueryClientProvider>
    ),
  ],
};

const Template = (args) => <Listing {...args} />;

export const HomePageListing = Template.bind({});
HomePageListing.args = {
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

export const MyListing = Template.bind({});
MyListing.args = {
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



