
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import Listing from './index';
import { theme } from '../../../theme';

export default {
  title: 'Organisms/Listing',
  component: Listing,

  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>

        <Story />

      </ChakraProvider>
    ),
  ],
};

const Template = (args) => <Listing {...args} />;

export const HomePageListing = Template.bind({});
HomePageListing.args = {
  listing: {
    id: 1,
    brand: 'Green Elephant Yarn',
    colourway: 'Sunshine',
    weight: 'DK',
    fibreContent: '100% Wool'
  }
};

export const MyListing = Template.bind({});
MyListing.args = {
  listing: {
    id: 1,
    brand: 'Green Elephant Yarn',
    colourway: 'Sunshine',
    weight: 'DK',
    fibreContent: 'Wool'
  }
};



