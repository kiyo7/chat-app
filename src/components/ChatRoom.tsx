import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextInput from './atom/TextInput';

import chatBack from '../Images/chatBack.jpg';
import styled from 'styled-components';

import { Header } from './molecule/Header';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '100vh',
  backgroundImage: `url(${chatBack})`,
  backgroundSize: 'contain',
  border: '2px solid #000',
  boxShadow: 24,
};

interface Props {
  open: boolean;
  handleClose: () => void;
  displayName: string;
}

export const ChatRoom: React.FC<Props> = (props) => {
  const { open, handleClose, displayName } = props;

  const [msg, setMsg] = useState('');

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style}>
            <Header
              wide={'90vw'}
              title={displayName}
              onClickEvent={handleClose}
              isChatRoom={true}
            />
            <p style={{ paddingTop: '50px' }}>{msg}</p>
            <SSendIconWrap>
              <TextInput setMsg={setMsg} />
            </SSendIconWrap>
          </Box>
        </>
      </Modal>
    </div>
  );
};

const SSendIconWrap = styled.div`
  position: fixed;
  width: 90%;
  bottom: 5%;
`;
