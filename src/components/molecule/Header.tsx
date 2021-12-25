import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
//@mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, styled } from '@mui/material';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';

interface Props {
  wide: string;
  title: string;
  onClickEvent: () => void;
  isChatRoom?: boolean;
}

export const Header: React.FC<Props> = (props) => {
  const { wide, title, onClickEvent, isChatRoom = false } = props;

  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          position: 'fixed',
          zIndex: 10,
          width: wide,
        }}
      >
        <Toolbar>
          {isChatRoom && <SWestOutlinedIcon onClick={onClickEvent} />}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {isChatRoom || <Avatar src={user.photoURL} />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={onClickEvent}>ログアウト</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const SWestOutlinedIcon = styled(WestOutlinedIcon)`
  margin-right: 10px;
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
