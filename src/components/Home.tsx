import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { db } from '../firebase';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { Header } from './molecule/Header';

import { UserCard } from './atom/UserCard';
import { ChatRoom } from './ChatRoom';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export const Home: React.FC = () => {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState([
    {
      displayName: '',
      photoURL: '',
    },
  ]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const q = query(
      collection(db, 'chat/v1/users'),
      where('displayName', '!=', user.displayName)
    );
    const unSub = onSnapshot(q, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, [user.displayName]);

  return (
    <>
      <div>
        <Header />
        {users.map((user, key) => {
          return (
            <SUserCardWrap key={key} onClick={() => handleOpen()}>
              <UserCard
                displayName={user.displayName}
                photoURL={user.photoURL}
              />
            </SUserCardWrap>
          );
        })}
      </div>
      <ChatRoom open={open} handleClose={handleClose} />
    </>
  );
};

const SUserCardWrap = styled.div`
  display: inline-block;
  margin: 0 10px;
  padding: 100px 20px 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
