import React, { useMemo } from 'react';

import { List, ListItem } from './BudgetTransactionList.css';

import { groupBy } from 'lodash';

import { useSelector } from 'react-redux';

import { formatCurrency, formatDate } from 'utils';

const BudgetTransactionList = () => {
  const selectedParentCategoryId = useSelector(
    (store) => store.budget.selectedParentCategoryId
  );

  const allCategories = useSelector((store) => store.common.allCategories);

  const transactions = useSelector((store) => store.budget.budget.transactions);

  const budgetedCategories = useSelector(
    (store) => store.budget.budgetedCategories
  );

  const filteredTransactionsBySelectedParentCategory = useMemo(() => {
    if (typeof selectedParentCategoryId === 'undefined') {
      return transactions;
    }

    if (selectedParentCategoryId === null) {
      return transactions.filter((transaction) => {
        const hasBudgetedCategory = budgetedCategories.some(
          (budgetedCategory) =>
            budgetedCategory.categoryId === transaction.categoryId
        );

        return !hasBudgetedCategory;
      });
    }

    return transactions.filter((transaction) => {
      try {
        const category = allCategories.find(
          (category) => category.id === transaction.categoryId
        );
        const parentCategoryName = category.parentCategory.name;

        return parentCategoryName === selectedParentCategoryId;
      } catch (error) {
        return false;
      }
    });
  }, [
    allCategories,
    budgetedCategories,
    selectedParentCategoryId,
    transactions,
  ]);

  const groupedTransactions = useMemo(
    () =>
      groupBy(
        filteredTransactionsBySelectedParentCategory,
        // (transaction) => moment(transaction.date).format('MM/DD/YYYY')
        (transaction) => new Date(transaction.date).getUTCDate()
      ),
    [filteredTransactionsBySelectedParentCategory]
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li key={key}>
          <ul>
            {transactions.map((transaction) => (
              <ListItem key={transaction.id}>
                <div>{transaction.description}</div>
                <div>{formatCurrency(transaction.amount)}</div>
                <div>{formatDate(transaction.date)}</div>
                <div>
                  {
                    (
                      allCategories.find(
                        (category) => category.id === transaction.categoryId
                      ) || {}
                    ).name
                  }
                </div>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default BudgetTransactionList;
