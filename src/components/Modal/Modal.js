import React from 'react';
import { createPortal } from 'react-dom';

import { Wrapper, Content, CloseIcon } from './Modal.css';

import { useHistory } from 'react-router-dom';

const Modal = ({ children }) => {
  let history = useHistory();

  const handleClose = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return createPortal(
    <Wrapper onClick={handleClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={history.goBack}>&times;</CloseIcon>
        {children}
      </Content>
    </Wrapper>,

    document.getElementById('modal')
  );
};

export default Modal;
