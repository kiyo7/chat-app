import React from 'react';

import styled from 'styled-components';

import { IconButton, Modal, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  resetEmail: string;
  setResetEmail: React.Dispatch<React.SetStateAction<string>>;
  sendResetEmail: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
}

export const PasswordResetModal: React.FC<Props> = (props) => {
  const { openModal, setOpenModal, resetEmail, setResetEmail, sendResetEmail } =
    props;
  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <SMDiv style={getModalStyle()}>
          <div>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="email"
              name="email"
              label="Reset E-mail"
              value={resetEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setResetEmail(e.target.value);
              }}
            />
            <IconButton onClick={sendResetEmail}>
              <SendIcon />
            </IconButton>
          </div>
        </SMDiv>
      </Modal>
    </>
  );
};

const SMDiv = styled.div`
  outline: none;
  position: absolute;
  width: 500px;
  border-radius: 10;
  background-color: #fff;
  box-shadow: 0 0 10px #8f8b8b;
  padding: 100px;
`;

export default Modal;
