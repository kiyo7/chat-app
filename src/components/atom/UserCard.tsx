import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';

export const UserCard: React.FC = (props) => {
  const user = useSelector(selectUser);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={user.photoUrl}
          ></Avatar>
        }
        title={user.displayName}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {'私と話しましょう'}
        </Typography>
      </CardContent>
    </Card>
  );
};
