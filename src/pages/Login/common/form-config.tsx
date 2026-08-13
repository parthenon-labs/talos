import { TextField } from '@mui/material';
import cn from 'classnames';
import { styled } from '@mui/material/styles';
import { FormItem } from './type';

const TextFieldSpe = styled(TextField)({
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '4px 0 0 4px',
  },
});
const phoneDOM = (mb: boolean = false) => {
  const sx = !mb ? { mb: 2 } : {};
  const className = mb ? 'flex-1' : 'mb-10';
  const props = {
    required: true,
    placeholder: 'Phone number',
    fullWidth: true,
    name: 'phone',
    key: 'phone',
    sx,
    className,
  };
  if (!mb) return <TextField {...props} />;
  return <TextFieldSpe {...props} />;
};
const codeDOM = (mb: boolean = false) => (
  <TextField
    required
    placeholder="Verification code"
    fullWidth
    name="code"
    key="code"
    sx={!mb ? { mb: 2 } : {}}
    className="mb-10"
  />
);
const passWordDOM = (mb: boolean = false) => (
  <TextField
    required
    placeholder="Password"
    fullWidth
    name="password"
    key="password"
    sx={!mb ? { mb: 2 } : {}}
    className="mb-10"
  />
);
/* 手机号登录可能有修改 */
export const PhoneConfig: Array<FormItem> = [
  {
    children: phoneDOM(),
  },
  {
    children: codeDOM(),
  },
];
/* 密码登录可能有修改 */
export const PasswordConfig: Array<FormItem> = [
  {
    children: phoneDOM(),
  },
  {
    children: passWordDOM(),
  },
];
/* 注册可能有修改 */
export const SignupConfig: Array<FormItem> = [
  {
    children: (cb, inText) => {
      const b: boolean = /\d/.test(inText);
      return (
        <div className="mb-5 flex items-center" key="signuporcb">
          {phoneDOM(true)}
          <div
            className={cn(
              `flex h-[56px] w-[100px] items-center justify-center`,
              `cursor-pointer rounded-r border border-l-0 text-indigo-400`,
              `${!b ? 'hover:text-indigo-300' : ''}`,
            )}
            style={{ borderColor: `rgba(0, 0, 0, 0.23)` }}
            aria-hidden="true"
            onClick={cb}
          >
            {inText}
          </div>
        </div>
      );
    },
  },
  {
    children: () => passWordDOM(),
  },
];
/* 忘记密码可能有修改 */
export const ForgetConfig: Array<FormItem> = [
  {
    children: phoneDOM(),
  },
  {
    children: codeDOM(),
  },
];
