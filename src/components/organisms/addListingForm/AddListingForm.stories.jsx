
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { AddListingForm } from './index';
import { theme } from '../../../theme';

export default {
  title: 'Organisms/AddListingForm',
  component: AddListingForm,

  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>

        <Story />

      </ChakraProvider>
    ),
  ],
};

const Template = (args) => <AddListingForm {...args} />;

export const listingForm = Template.bind({});
listingForm.args = {
  listing: {
   
  }
};





