import styled from 'styled-components';

export const Category = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray.light};
  padding: ${({ theme }) => theme.spacing.xs}px;
  display: flex;
  justify-content: space-between;
`;

export const ParentCategory = styled(Category)`
  background-color: ${({ theme }) => theme.colors.gray.normal};
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const CategoryItem = styled(Category)`
  background-color: ${({ theme }) => theme.colors.gray.light};
`;
