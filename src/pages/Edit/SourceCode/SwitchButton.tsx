import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import type { ArrayElement, PropType } from '@/utils/types';
import { useAppSelector, useAppDispatch } from '@/hooks/state';
import { switchMode, setBlocklyCodeChanged } from '../store';

const buttonItem = [
  {
    key: 'blockly',
    text: '积木模式',
  },
  {
    key: 'python',
    text: 'Python模式',
  },
] as const;

type BtnKeys = PropType<ArrayElement<typeof buttonItem>, 'key'>;

const SwitchButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { editMode } = useAppSelector(({ edit }) => edit);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (key: BtnKeys) => {
      dispatch(setBlocklyCodeChanged(false));
      dispatch(switchMode(key));
      const oldSearch = Object.fromEntries(searchParams.entries());
      setSearchParams({ ...oldSearch, mode: key }, { replace: true });
    },
    [searchParams],
  );

  return (
    <ButtonGroup
      size="small"
      disableElevation
      variant="outlined"
      className="absolute right-4 top-4 z-10"
    >
      {buttonItem.map(({ key, text }) => (
        <Button
          variant={key === editMode ? 'contained' : 'outlined'}
          key={key}
          onClick={() => handleClick(key)}
        >
          {text}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SwitchButton;
