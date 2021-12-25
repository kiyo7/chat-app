import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';

//firebase
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

//components
import { Auth } from './components/Auth';
import { Home } from './components/Home';

import backGround from './Images/backGround.gif';
import styled from 'styled-components';

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <SDiv className="App">
          <Home />
        </SDiv>
      ) : (
        <Auth />
      )}
    </>
  );
};

const SDiv = styled.div`
  display: flex;
  height: 200vh;
  background-image: url(${backGround});
  background-size: cover;
`;

export default App;
