import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { MenuAppBar } from './molecule/Header';

import backGround from '../Images/backGround.jpeg';
import { UserCard } from './atom/UserCard';

export const Home: React.FC = () => {
  const [users, setUsers] = useState([
    {
      displayName: '',
      photoUrl: '',
    },
  ]);

  console.log(users);

  useEffect(() => {
    const q = query(collection(db, 'chat/v1/users'));
    const unSub = onSnapshot(q, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          displayName: doc.data().displayName,
          photoUrl: doc.data().photoURL,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <SDiv>
      <div>
        <MenuAppBar />
      </div>
      {users.map((user, key) => {
        return (
          <SUserCardWrap key={key}>
            <UserCard displayName={user.displayName} photoUrl={user.photoUrl} />
          </SUserCardWrap>
        );
      })}
    </SDiv>
  );
};

const SDiv = styled.div`
  width: 100vw;
  background-image: url(${backGround});
  background-size: cover;
`;

const SUserCardWrap = styled.div`
  display: inline-block;
  margin: 0 10px;
  padding: 30px 20px 10px;
  &:hover {
    cursor: pointer;
  }
`;
