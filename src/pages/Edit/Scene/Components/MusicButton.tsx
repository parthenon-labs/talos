import { useState, useEffect, useRef, useCallback } from 'react';

import { Menu, MenuItem, Switch } from '@mui/material';
import { VolumeUp as VolumeUpIcon } from '@mui/icons-material';
import IconButton from '@/stories/IconButton';
import type Music from '../Music';
import GameScene from '../GameScene';

const MusicButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null!);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback(() => setAnchorEl(null!), []);

  const musicRef = useRef<Music>(null!);
  const [bgMusicPlaying, setBgMusicPlaying] = useState(false);
  const [effectMusicPlaying, setEffectMusicPlaying] = useState(true);

  useEffect(() => {
    musicRef.current = GameScene.getInstance().initMusic(
      bgMusicPlaying,
      effectMusicPlaying,
    );
  }, []);

  return (
    <div className="absolute right-10 top-10">
      <IconButton id="musicButton" size="small" onClick={handleClick}>
        <VolumeUpIcon />
      </IconButton>
      <Menu
        open={!!anchorEl}
        id="musicButton"
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem>
          Music
          <Switch
            checked={bgMusicPlaying}
            onChange={({ target }) => {
              setBgMusicPlaying(target.checked);
              musicRef.current?.toggleBGMusic(target.checked);
            }}
          />
        </MenuItem>

        <MenuItem>
          Sound effects
          <Switch
            checked={effectMusicPlaying}
            onChange={({ target }) => {
              setEffectMusicPlaying(target.checked);
              musicRef.current?.toggleEffectMusic(target.checked);
            }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MusicButton;
