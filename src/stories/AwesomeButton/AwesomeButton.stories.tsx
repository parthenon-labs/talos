import { Story, Meta } from '@storybook/react';
import AwesomeButton, { AwesomeButtonProps } from './index';

export default {
  title: 'Public/AwesomeButton',
  component: AwesomeButton,
} as Meta;

const Template: Story<AwesomeButtonProps> = args => <AwesomeButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '默认按钮',
};
