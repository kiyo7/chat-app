import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const ChatRoom = () => {
  return <div onClick={() => signOut(auth)}>ログアウトする</div>;
};

export default ChatRoom;
