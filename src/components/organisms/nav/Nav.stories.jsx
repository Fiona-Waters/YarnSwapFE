import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';


import { theme } from '../../../theme';
import NavigationMenu from './index';

const queryClient = new QueryClient()

export default {
  title: 'Organisms/Nav',
  component: NavigationMenu,

  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </QueryClientProvider>
    ),
  ],
};

const Template = (args) => <NavigationMenu {...args} />;

export const MainNav = Template.bind({});
MainNav.args = {

};





