import { useRef } from 'react';
import { Story, Meta } from '@storybook/react';
import FullScreenButton, { FullScreenButtonProps } from './index';

export default {
  title: 'Public/FullScreenButton',
  component: FullScreenButton,
} as Meta;

const Template: Story<FullScreenButtonProps> = args => (
  <FullScreenButton {...args} />
);

export const RootFullScreen = Template.bind({});
RootFullScreen.args = {};

export const ElementFullScreen = () => {
  const ref = useRef<HTMLDivElement>(null!);
  return (
    <>
      <RootFullScreen element={ref} />
      <div ref={ref}>全屏元素</div>
    </>
  );
};
