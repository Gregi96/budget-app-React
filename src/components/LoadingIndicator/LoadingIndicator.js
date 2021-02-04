import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: translate(-50%,-50%) rotate(0deg); }
  100% { transform: translate(-50%,-50%) rotate(360deg); }
`;

const Root = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */

  width: 44px;
  height: 44px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
`;

const OutsideContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.44);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

const InnerContent = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 10px solid #4b4343;
  border-top-color: transparent;
  border-radius: 50%;

  animation: ${rotate} 1s linear infinite;
  top: 50px;
  left: 50px;

  box-sizing: content-box;
`;

function LoadingIndicator() {
  return (
    <Root>
      <OutsideContent>
        <InnerContent />
      </OutsideContent>
    </Root>
  );
}

export default LoadingIndicator;
