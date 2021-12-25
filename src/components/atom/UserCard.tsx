import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { ChatRoom } from '../ChatRoom';

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
      <Card sx={{ maxWidth: 345 }} onClick={() => handleOpen()}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={photoURL}></Avatar>}
          title={displayName}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {'私と話しましょう'}
          </Typography>
        </CardContent>
      </Card>
      <ChatRoom
        open={open}
        handleClose={handleClose}
        displayName={displayName}
      />
    </>
  );
};
