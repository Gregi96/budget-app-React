import styled from 'styled-components';

const RootButton = styled.button`
  color: ${({ theme: { colors }, primary }) =>
    primary ? colors.gray.light : colors.gray.dark};
  cursor: inherit;
  border: none;
  background-color: transparent;
  cursor: ${(props) =>
    props.to || props.onClick || props.type === 'submit'
      ? 'pointer'
      : 'default'};

  &:hover {
    color: ${({ theme: { colors } }) => colors.gray.normal};
  }
`;

export const InlineButton = styled(RootButton)`
  &:hover {
    text-decoration: underline;
  }
`;

export const RegularButton = styled(RootButton)`
  background: ${({ theme, primary }) =>
    primary ? theme.colors.pink.normal : theme.colors.gray.light};
  margin: ${({ theme }) => `${theme.spacing.xs / 2}px`};
  padding: ${({ theme }) => `${theme.spacing.xs / 2}px ${theme.spacing.xs}px`};
  border: ${({ theme }) => `2px solid ${theme.colors.gray.dark}`};
  border-radius: 3px;
`;
