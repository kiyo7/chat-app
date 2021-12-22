import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

interface User {
  displayName: string;
  photoURL: string;
}

export const UserCard: React.FC<User> = (props) => {
  const { displayName, photoURL } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
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
  );
};
