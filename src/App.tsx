import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import ChatRoom from './components/ChatRoom';
import Auth from './components/Auth';

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoUrl: authUser.photoURL,
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
        <Sdiv className="App">
          <ChatRoom />
        </Sdiv>
      ) : (
        <Auth />
      )}
    </>
  );
};

const Sdiv = styled.div`
  display: flex;
  height: 100vh;
  padding: 30px 80px;
  background-color: #3f1f1f;
`;

export default App;
