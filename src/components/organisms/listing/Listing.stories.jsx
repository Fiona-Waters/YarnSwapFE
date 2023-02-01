
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import {Listing} from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Organisms/Listing',
  component: Listing,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

  decorators: [
    (Story) => (
        <ChakraProvider>
          
          <Story />
          
        </ChakraProvider>
    ),
  ],
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Listing {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  listing: {
    id:1,
    brand:'Green Elephant Yarn',
    colorway: 'Sunshine',
    weight: 'DK',
    fibreContent: '100% Wool'
  }
};



