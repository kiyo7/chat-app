import React, { useState } from 'react';

//@mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

//components
import { ChatRoom } from '../ChatRoom';

import styled, { keyframes } from 'styled-components';

interface User {
  displayName: string;
  photoURL: string;
}

export const UserCard: React.FC<User> = (props) => {
  const { displayName, photoURL } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SCard sx={{ maxWidth: 345 }} onClick={() => handleOpen()}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={photoURL}></Avatar>}
          title={displayName}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {'暇です'}
          </Typography>
        </CardContent>
      </SCard>
      <ChatRoom
        open={open}
        handleClose={handleClose}
        displayName={displayName}
      />
    </>
  );
};
const Slide = keyframes`
from {
 transform: translateY(10px);
 opacity: 0;
}
to {
  transform: translateY(0px)
  opacity: 1;
}`;

const SCard = styled(Card)`
  :hover {
    cursor: pointer;
    animation: ${Slide} 1s linear;
  }
`;
