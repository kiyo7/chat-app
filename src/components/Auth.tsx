import React, { useState } from 'react';

//material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';

import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../features/userSlice';

//firebase
import { auth, provider, storage } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { PasswordResetModal } from './PasswordResetModal';

const theme = createTheme();

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  const dispatch = useDispatch();

  const signUp = async () => {
    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    let url = '';
    if (avatar) {
      const S =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');
      const fileName = randomChar + '_' + avatar.name;
      await uploadBytes(ref(storage, `avatars/${fileName}`), avatar);
      url = await getDownloadURL(ref(storage, `avatars/${fileName}`));
    }
    if (authUser.user) {
      await updateProfile(authUser.user, {
        displayName: userName,
        photoURL: url,
      });
    }
    dispatch(
      updateUserProfile({
        displayName: userName,
        photoUrl: url,
      })
    );
  };

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail('');
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail('');
      });
  };

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatar(e.target.files![0]);
      e.target.value = '';
    }
  };

  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? 'ログイン' : '新規登録'}
            </Typography>
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={userName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserName(e.target.value);
                  }}
                />
                <Box textAlign="center">
                  <IconButton>
                    <label>
                      <AccountCircleIcon fontSize="large" />
                      <SInput type="file" onChange={onChangeImageHandler} />
                    </label>
                  </IconButton>
                </Box>
              </>
            )}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={
                  isLogin
                    ? async () => {
                        try {
                          await signIn();
                        } catch (err: any) {
                          alert(err.message);
                        }
                      }
                    : async () => {
                        try {
                          await signUp();
                        } catch (err: any) {
                          alert(err.message);
                        }
                      }
                }
              >
                {isLogin ? 'ログインする' : '新規登録'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={() => setOpenModal(true)}>
                    {isLogin && 'パスワードを忘れた'}
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={() => setIsLogin(!isLogin)}>
                    {!isLogin ? 'ログインする' : '新規登録'}
                  </Link>
                </Grid>
              </Grid>

              <IconButton onClick={signInGoogle}>
                <GoogleIcon />
              </IconButton>
            </Box>
          </Box>
          <PasswordResetModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            sendResetEmail={sendResetEmail}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const SInput = styled.input`
  text-align: center;
  display: none;
`;
