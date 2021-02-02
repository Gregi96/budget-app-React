import styled from 'styled-components';

export const Content = styled.section`
  padding-left: 15px;
  padding-right: 15px;
`;

export const Title = styled.p`
  font-size: ${({ theme: { textSize } }) => `${textSize.title.large}px`};
  margin: 20px 0px 5px 0px;
`;

export const Text = styled.div`
  max-width: 700px;
  line-height: 25px;
`;
