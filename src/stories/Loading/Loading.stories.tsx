import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from './index';

export default {
  title: 'Public/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = () => <Loading />;

export const Default = Template.bind({});
