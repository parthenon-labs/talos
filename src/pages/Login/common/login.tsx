import { useEffect, useState, useRef } from 'react';

import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import QRCode from 'qrcode.react';
import { LocalStorageKeys } from '@/utils/storage';
import {
  LoginBody,
  LoginResponse,
  SignupBody,
  SignupResponse,
  // QRResponse,
} from '@/apis/model/User';
import UserService from '@/apis/services/User';
import { UserCacheInfo } from '@/apis/queryKeys';
import {
  PhoneConfig,
  PasswordConfig,
  SignupConfig,
  ForgetConfig,
} from './form-config';
import { clearPending } from '@/utils/request';
import MyForm from './index';
import { TabPanelProps } from './type';
import { WEIXIN } from './weixin';
import { useTip } from '@/hooks/useTip';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
export const useLogin = (param?: string) => {
  const queryClient = useQueryClient();
  const [, setStorage] = useLocalStorage(LocalStorageKeys.UserToken);
  const [value, setValue] = useState<number>(0);
  const [componentType, setComponentType] = useState<string>('weixin');
  const currentStatus = useRef('weixin');

  const [loginWxUrl, setLoginWxUrl] = useState<string>();

  const [signupCode, setSignupCode] = useState<string>('Get code');
  const { Tip, setOpen } = useTip({ status: false, msg: '' });
  const navigate = useNavigate();
  const loginMutation = useMutation<LoginResponse, unknown, LoginBody>(
    params => UserService.login(params),
    {
      onSuccess(data) {
        queryClient.setQueryData([UserCacheInfo.UserInfo], data);
        (
          axios.defaults.headers as Record<string, string>
        ).Authorization = `Bearer ${!data.token}`;
        setStorage(data.token);
        navigate('/');
      },
    },
  );
  const signupMutation = useMutation<SignupResponse, unknown, SignupBody>(
    params => UserService.signup(params),
    {
      onSuccess(data) {
        // eslint-disable-next-line no-console
        console.log(data);
        setComponentType('login');
      },
    },
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = {
      phone: data.get('phone')!,
      code: data.get('code')!,
      password: data.get('password')!,
    };
    componentType === 'signin' && loginMutation.mutate(params);
    componentType === 'signup' && signupMutation.mutate(params);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 60,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  });
  const TabPanel = (props: TabPanelProps) => {
    const { children, currentValue, index } = props;
    return (
      <>
        {currentValue === index && (
          <Box component="div" sx={{ paddingTop: '20px' }}>
            <Typography component="span">{children}</Typography>
          </Box>
        )}
      </>
    );
  };
  const QRGet = useMutation<string, unknown, void>(
    () => UserService.getWxUrl(),
    {
      onSuccess(res) {
        setLoginWxUrl(res);
      },
      onError() {},
    },
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const wxCode = searchParams.get('code');
    if (!wxCode) return;
    UserService.loginWx({ wxCode })
      .then(res => {
        const { token } = res;
        localStorage.setItem('login_token', token);
        setOpen({ status: true, msg: 'Signed in successfully' });
        navigate('/');
      })
      .catch(() => {
        navigate('/login');
      });
    return () => {
      clearPending();
    };
  }, []);
  const clearCallback = () => {
    if (/\d/.test(signupCode)) return;
    setSignupCode('Resend in 59s');
    let code: number = 59;
    const timer: number = window.setInterval(() => {
      code -= 1;
      if (currentStatus.current !== 'signup') {
        setSignupCode('Get code');
        window.clearInterval(timer);
        return;
      }
      if (code === 0) {
        setSignupCode('Get code');
        window.clearInterval(timer);
      } else {
        setSignupCode(`Resend in ${code}s`);
      }
    }, 1000);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={
        !param ? 'w-[500px] rounded-2xl border border-gray-500 p-8' : ''
      }
      // style={{ background: `url(${loginbg}) fixed no-repeat center` }}
    >
      {Tip}
      {componentType === 'signin' && (
        <>
          <Box component="div">
            <StyledTabs value={value} onChange={handleChange}>
              <Tab label="SMS" className="w-1/2" />
              <Tab label="Password" className="w-1/2" />
            </StyledTabs>
          </Box>
          <TabPanel currentValue={value} index={0}>
            <MyForm group={PhoneConfig} />
          </TabPanel>
          <TabPanel currentValue={value} index={1}>
            <MyForm group={PasswordConfig} />
          </TabPanel>
        </>
      )}
      {componentType === 'signup' && (
        <MyForm group={SignupConfig} cb={clearCallback} inText={signupCode} />
      )}
      {componentType === 'forget' && <MyForm group={ForgetConfig} />}
      {componentType === 'weixin' && (
        <div className="flex justify-center">
          {loginWxUrl && (
            <iframe src={loginWxUrl} title="WeChat sign-in" style={{ height: 400 }} />
          )}
        </div>
      )}
      <WEIXIN
        componentType={componentType}
        QRGet={QRGet}
        currentStatus={currentStatus}
        setComponentType={setComponentType}
      />
    </Box>
  );
};
