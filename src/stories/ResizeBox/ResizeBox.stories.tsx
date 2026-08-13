import { Story, Meta } from '@storybook/react';
import ResizeBox, { ResizeBoxProps } from './index';

export default {
  title: 'Public/ResizeBox',
  component: ResizeBox,
} as Meta;

const Template: Story<ResizeBoxProps> = args => <ResizeBox {...args} />;

export const ResizeY = Template.bind({});
ResizeY.args = {
  children: <div className="flex h-full items-center justify-center">内容</div>,
};

export const ResizeX = Template.bind({});
ResizeX.args = {
  children: <div className="flex h-full items-center justify-center">内容</div>,
  direction: 'x',
  barPosition: 'left',
};
