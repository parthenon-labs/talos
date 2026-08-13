import { useEffect } from 'react';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { UseMutationResult } from '@tanstack/react-query';
import Svg from '@/assets/weixin.svg';

interface WEIXINProps {
  componentType: string;
  QRGet: UseMutationResult<string, unknown, void, unknown>;
  setComponentType: React.Dispatch<React.SetStateAction<string>>;
  currentStatus: React.MutableRefObject<string>;
}
export const WEIXIN = ({
  componentType,
  QRGet,
  setComponentType,
  currentStatus,
}: WEIXINProps) => {
  useEffect(() => {
    QRGet.mutate();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex cursor-pointer items-center justify-center">
        {componentType !== 'weixin' ? (
          <>
            {componentType === 'signin' ? (
              <>
                <Svg width="20" height="20" />
                <span
                  aria-hidden="true"
                  onClick={() => {
                    setComponentType('weixin');
                    currentStatus.current = 'weixin';
                    QRGet.mutate();
                  }}
                  className="m-1"
                >
                  WeChat sign-in
                </span>
              </>
            ) : (
              <span
                aria-hidden="true"
                onClick={() => {
                  setComponentType('signin');
                  currentStatus.current = 'signin';
                }}
                className="m-1 text-blue-500 underline"
              >
                &lt;&lt; Back to sign-in
              </span>
            )}
          </>
        ) : (
          <div>
            <p className="m-4 text-gray-400">Scan with WeChat to sign in</p>
            <p
              className="m-4 
                text-center 
              text-gray-400"
              aria-hidden="true"
              onClick={() => {
                navigate('/');
              }}
            >
              Skip for now
            </p>
            {/* <p
              aria-hidden="true"
              onClick={() => {
                setComponentType('signin');
                currentStatus.current = 'signin';
              }}
              className="text-center m-6 text-blue-500 hover:text-blue-400"
            >
              Already have an account? Sign in
            </p> */}
          </div>
        )}
      </div>
      {componentType !== 'weixin' ? (
        <>
          <div className="m-2 flex justify-center">
            <span
              aria-hidden="true"
              onClick={() => {
                setComponentType('forget');
                currentStatus.current = 'x';
              }}
              className={cn(
                `cursor-pointer`,
                `${componentType === 'forget' ? 'text-blue-500' : ''}`,
              )}
            >
              Reset password
            </span>
            ｜
            <span
              aria-hidden="true"
              onClick={() => {
                setComponentType('signup');
                currentStatus.current = 'signup';
              }}
              className={cn(
                `cursor-pointer`,
                `${componentType === 'signup' ? 'text-blue-500' : ''}`,
              )}
            >
              Create account
            </span>
          </div>
          <Button type="submit" fullWidth variant="contained" className="m-1">
            {componentType === 'signup' && 'Sign up'}
            {componentType === 'signin' && 'Sign in'}
            {componentType === 'forget' && 'Submit'}
          </Button>
        </>
      ) : null}
    </>
  );
};
