
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { theme } from '../../../theme';
import { Logo } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Logo',
  component: Logo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

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
  w:32,
  h:32
}

