import React from 'react';
import styled from 'styled-components';

const TextInput = () => {
  return (
    <STextInputWrapper>
      <SDummy aria-hidden="true"></SDummy>
      <STextArea id="FlexTextarea"></STextArea>
    </STextInputWrapper>
  );
};

const STextInputWrapper = styled.div`
  position: relative;
  top: 420px;
  font-size: 1rem;
  line-height: 1.8;
`;

const SDummy = styled.div`
  overflow: hidden;
  visibility: hidden;
  box-sizing: border-box;
  padding: 5px 15px;
  min-height: 70px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border: 1px solid;
`;

const STextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  overflow: hidden;
  box-sizing: border-box;
  padding: 5px 15px;
  width: 90%;
  height: 100%;
  background-color: transparent;
  border: 1px solid #b6c3c6;
  border-radius: 4px;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  resize: none;
  &: focus {
    box-shadow: 0 0 0 4px rgba(35, 167, 195, 0.3);
    outline: 0;
  }
`;

export default TextInput;
