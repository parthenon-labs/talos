import { useState, useRef, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { GridOn, GridOff } from '@mui/icons-material';
import IconButton from '@/stories/IconButton';
import GameScene from '../GameScene';

const GridButton = () => {
  const [open, setOpen] = useState(false);
  const gameScene = useRef<GameScene>(null!);
  const handleClick = () => {
    setOpen(pre => gameScene.current.setGridEnabled(!pre));
  };
  useEffect(() => {
    gameScene.current = GameScene.getInstance();
    gameScene.current.createGrid(open);
  }, []);

  return (
    <div className="absolute right-10 top-24">
      <IconButton size="small" onClick={handleClick}>
        <Tooltip title={`${open ? 'Hide' : 'Show'} grid`} arrow>
          {open ? <GridOff /> : <GridOn />}
        </Tooltip>
      </IconButton>
    </div>
  );
};

export default GridButton;
