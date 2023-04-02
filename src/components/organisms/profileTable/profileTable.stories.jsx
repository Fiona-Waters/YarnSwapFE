import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import ProfileTable from './index';

const queryClient = new QueryClient()

export default {
  title: 'Organisms/ProfileTable',
  component: ProfileTable,

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

const Template = (args) => <ProfileTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  displayName: 'Fiona Waters',
  photoUrl: ""
};
