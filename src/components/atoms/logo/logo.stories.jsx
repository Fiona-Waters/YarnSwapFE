import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { theme } from '../../../theme';
import Logo from './index';

export default {
  title: 'Atoms/Logo',
  component: Logo,

  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>

        <Story />

      </ChakraProvider>
    ),
  ],
};


const Template = (args) => <Logo {...args} />;

export const Default = Template.bind();
Default.args = {
  w: 32,
  h: 32
}

