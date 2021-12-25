import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
//firebase
import { auth, db } from '../firebase';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

//components
import { Header } from './molecule/Header';
import { UserCard } from './atom/UserCard';

import styled from 'styled-components';

export const Home: React.FC = () => {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState([
    {
      displayName: '',
      photoURL: '',
    },
  ]);

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
        <Header
          wide={'100vw'}
          title={'ひまチャ'}
          onClickEvent={() => signOut(auth)}
        />
        {users.map((user, key) => {
          return (
            <SUserCardWrap key={key}>
              <UserCard
                displayName={user.displayName}
                photoURL={user.photoURL}
              />
            </SUserCardWrap>
          );
        })}
      </div>
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
