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
                  微信登录
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
                &lt;&lt;返回登录
              </span>
            )}
          </>
        ) : (
          <div>
            <p className="m-4 text-gray-400">使用手机微信扫一扫快捷登录</p>
            <p
              className="m-4 
                text-center 
              text-gray-400"
              aria-hidden="true"
              onClick={() => {
                navigate('/');
              }}
            >
              点此跳过
            </p>
            {/* <p
              aria-hidden="true"
              onClick={() => {
                setComponentType('signin');
                currentStatus.current = 'signin';
              }}
              className="text-center m-6 text-blue-500 hover:text-blue-400"
            >
              已有账号，去登录
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
              找回密码
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
              注册账号
            </span>
          </div>
          <Button type="submit" fullWidth variant="contained" className="m-1">
            {componentType === 'signup' && '注册'}
            {componentType === 'signin' && '登录'}
            {componentType === 'forget' && '提交'}
          </Button>
        </>
      ) : null}
    </>
  );
};
