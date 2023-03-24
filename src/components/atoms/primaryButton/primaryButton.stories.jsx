
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { theme } from '../../../theme';
import PrimaryButton from './index';

export default {
  title: 'Atoms/PrimaryButton',
  component: PrimaryButton,

  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>

        <Story />

      </ChakraProvider>
    ),
  ],
};


const Template = (args) => <PrimaryButton {...args} />;

export const Default = Template.bind();
Default.args = {
  label: "Wishlist"
}

export const LongLabel = Template.bind();
LongLabel.args = {
  label: "This Button Has A Long Label"
}


