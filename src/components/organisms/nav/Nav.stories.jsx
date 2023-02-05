import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { theme } from '../../../theme';
import { NavigationMenu } from './index';

export default {
  title: 'Organisms/Nav',
  component: NavigationMenu,

  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>

        <Story />

      </ChakraProvider>
    ),
  ],
};

const Template = (args) => <NavigationMenu {...args} />;

export const MainNav = Template.bind({});
MainNav.args = {

};





