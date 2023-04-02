
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import AddListingForm from './index';
import { theme } from '../../../theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

export default {
  title: 'Organisms/AddListingForm',
  component: AddListingForm,

  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Story />
        </ChakraProvider>
      </QueryClientProvider>
    ),
  ],
};

const Template = (args) => <AddListingForm {...args} isOpen={true} />;

export const Default = Template.bind({
  isOpen: true,
  onClose: () => {},
  refreshListings: () => {},
  currentUser: {
    uid: "1234"
  },
  listing: {}

})





