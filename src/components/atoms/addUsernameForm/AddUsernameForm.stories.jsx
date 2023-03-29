
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import AddUsernameForm from './index';

const queryClient = new QueryClient()

export default {
    title: 'Atoms/AddUsernameForm',
    component: AddUsernameForm,

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

const Template = (args) => <AddUsernameForm {...args} />;

export const Default = Template.bind({});

