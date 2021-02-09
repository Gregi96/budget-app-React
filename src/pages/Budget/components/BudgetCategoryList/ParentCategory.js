import React, { useMemo } from 'react';

import {
  ParentCategory as Root,
  CategoryAmount,
} from './BudgetCategoryList.css';

import { formatCurrency } from 'utils';

const ParentCategory = ({
  name,
  onClick,
  categories,
  transactions,
  amount,
}) => {
  const categoryLeftValue = useMemo(() => {
    if (!!amount) return null;

    const budgeted = (() => {
      try {
        return categories.reduce((sum, next) => {
          const { budget } = next;
          return sum + budget;
        }, 0);
      } catch (error) {
        return null;
      }
    })();

    const parentCategoryTransaction = transactions.filter((transaction) =>
      categories.find(
        (category) => category.categoryId === transaction.categoryId
      )
    );

    const spentOnParentCategory = parentCategoryTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const totalLeft = budgeted ? budgeted - spentOnParentCategory : null;

    return totalLeft;
  }, [categories, transactions, amount]);

  const amountValue = useMemo(() => amount || categoryLeftValue, [
    amount,
    categoryLeftValue,
  ]);

  return (
    <Root onClick={onClick}>
      <span>{name}</span>
      <CategoryAmount nagative={categoryLeftValue < 0}>
        {formatCurrency(amountValue)}
      </CategoryAmount>
    </Root>
  );
};

export default ParentCategory;
