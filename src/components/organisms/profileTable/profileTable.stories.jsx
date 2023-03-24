import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ProfileTable from '.';
import { theme } from '../../../theme';

export default {
  title: 'Organisms/ProfileTable',
  component: ProfileTable,

  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>

        <Story />

      </ChakraProvider>
    ),
  ],
};

const Template = (args) => <ProfileTable {...args} />;

export const Table = Template.bind({});
Table.args = {
  displayName: 'Fiona Waters'
};
