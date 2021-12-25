import React from 'react';
import styled from 'styled-components';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton } from '@mui/material';

interface Props {
  setMsg: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput: React.FC<Props> = (props) => {
  const { setMsg } = props;

  const sendMessage = () => {
    console.log('メッセージ送信');
  };
  return (
    <>
      <STextInputWrapper>
        <SDummy aria-hidden="true" />
        <STextArea
          id="FlexTextarea"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMsg(e.target.value)
          }
        />
        <IconButton onClick={() => sendMessage()}>
          <SendRoundedIcon fontSize="large" />
        </IconButton>
      </STextInputWrapper>
    </>
  );
};

const STextInputWrapper = styled.div`
  width: 100%;
  font-size: 1rem;
  line-height: 1.8;
  display: flex;
`;

const SDummy = styled.div`
  overflow: hidden;
  visibility: hidden;
  box-sizing: border-box;
  padding: 3px 15px;
  min-height: 50px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border: 1px solid;
`;

const STextArea = styled.textarea`
  display: block;
  overflow: hidden;
  box-sizing: border-box;
  padding: 3px 15px;
  width: 95%;
  background-color: transparent;
  border-radius: 10px;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  resize: none;
  &: focus {
    box-shadow: 0 0 0 2px #000000;
    outline: 0;
  }
`;

export default TextInput;
