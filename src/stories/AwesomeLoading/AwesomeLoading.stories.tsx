import { ComponentStory, ComponentMeta } from '@storybook/react';

import AwesomeLoading from './index';

export default {
  title: 'Public/AwesomeLoading',
  component: AwesomeLoading,
} as ComponentMeta<typeof AwesomeLoading>;

const Template: ComponentStory<typeof AwesomeLoading> = () => (
  <AwesomeLoading />
);

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: {
      code: '<AwesomeLoading />',
      language: 'tsx',
      type: 'auto',
    },
  },
};
