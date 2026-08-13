import { Story, ComponentMeta } from '@storybook/react';
import { UseQueryResult } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HandleBoundary, { HandleBoundaryProps } from './index';

export default {
  title: 'Public/HandleRequestBoundary',
  component: HandleBoundary,
  decorators: [
    Stories => (
      <>
        <Stories />
        <ReactQueryDevtools />
      </>
    ),
  ],
} as ComponentMeta<typeof HandleBoundary>;

const Template: Story<
  HandleBoundaryProps<{ text: string }, unknown>
> = args => <HandleBoundary {...args} />;

const code = `const query = useQuery(['demo-cache-key'], () => axios.get('/path'));

return (
  <HandleBoundary query={query}>
    {data => <div>{data.text}</div>}
  </HandleBoundary>
);`;

export const DataSucceeded = Template.bind({});

DataSucceeded.args = {
  children: data => <div>{data.text}</div>,
  query: {
    isSuccess: true,
    data: {
      text: 'hello',
    },
  } as UseQueryResult<{ text: string }>,
};

DataSucceeded.parameters = {
  docs: { source: { code } },
};

export const DataLoading = Template.bind({});

DataLoading.args = {
  query: {
    isLoading: true,
    isSuccess: false,
  } as UseQueryResult<{ text: string }>,
};

DataLoading.parameters = {
  docs: { source: { code } },
};

export const DataError = Template.bind({});
DataError.args = {
  query: {
    isLoading: false,
    isSuccess: false,
  } as UseQueryResult<{ text: string }>,
};
DataError.parameters = {
  docs: { source: { code } },
};
