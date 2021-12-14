import React from 'react';

import styled from 'styled-components';

import { auth } from '../firebase';
import { MenuAppBar } from './molecule/Header';

import backGround from '../Images/backGround.jpeg';
import { UserCard } from './atom/UserCard';

import { selectUser, userSlice } from '../features/userSlice';
import { useSelector } from 'react-redux';

export const Home: React.FC = () => {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <SDiv>
      <div>
        <MenuAppBar />
      </div>
      {[...Array(12)].map(() => {
        return (
          <SUserCardWrap>
            <UserCard />
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
