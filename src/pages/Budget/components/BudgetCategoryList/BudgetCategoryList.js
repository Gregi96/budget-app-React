import React, { useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { groupBy } from 'lodash';

import 'styled-components/macro';
import ToogleableList from 'components/ToogleableList';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import { useTranslation } from 'react-i18next';
import { selectParentCategory } from 'data/actions/budget.actions';
import { useQuery } from 'react-query';
import API from 'data/fetch';

const BudgetCategoryList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClickParentCategoryRef = useRef(null);

  const { data: budget } = useQuery(
    ['budget', { id: 1 }],
    API.budget.fetchBudget
  );

  const { data: allCategories } = useQuery(
    'allCategories',
    API.common.fetchAllCategories
  );
  const { data: budgetedCategories } = useQuery(
    ['budgetedCategories', { id: 1 }],
    API.budget.fetchBudgetedCategories
  );

  const budgetedCategoriesByParent = useMemo(
    () =>
      groupBy(
        budgetedCategories,
        (item) =>
          allCategories.find((category) => category.id === item.categoryId)
            .parentCategory.name
      ),
    [budgetedCategories, allCategories]
  );

  const handleClearParentCategorySelect = useCallback(() => {
    dispatch(selectParentCategory());
    handleClickParentCategoryRef.current();
  }, [dispatch, handleClickParentCategoryRef]);

  const handleSelectRestParentCategories = useCallback(() => {
    dispatch(selectParentCategory(null));
    handleClickParentCategoryRef.current();
  }, [dispatch, handleClickParentCategoryRef]);

  const listItems = useMemo(
    () =>
      Object.entries(budgetedCategoriesByParent).map(
        ([parentName, categories]) => ({
          id: parentName,
          Trigger: ({ onClick }) => (
            <ParentCategory
              name={parentName}
              onClick={() => {
                onClick(parentName);
                dispatch(selectParentCategory(parentName));
              }}
              categories={categories}
              transactions={budget.transactions}
            />
          ),
          children: categories.map((budgetedCategory) => {
            const { name } = allCategories.find(
              (category) => category.id === budgetedCategory.categoryId
            );

            return (
              <CategoryItem
                key={budgetedCategory.id}
                name={name}
                item={budgetedCategory}
                transactions={budget.transactions}
              />
            );
          }),
        })
      ),
    [allCategories, budget.transactions, budgetedCategoriesByParent, dispatch]
  );

  const totalSpent = useMemo(
    () =>
      budget.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
    [budget.transactions]
  );

  const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [
    budget.totalAmount,
    totalSpent,
  ]);

  const amountTaken = useMemo(
    () =>
      budgetedCategories.reduce((sum, budgetedCategory) => {
        const categoryTransactions = budget.transactions.filter(
          (transaction) => transaction.categoryId === budgetedCategory.id
        );

        const categoryExpenses = categoryTransactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        );

        return sum + Math.max(categoryExpenses, budgetedCategory.budget);
      }, 0),
    [budget.transactions, budgetedCategories]
  );

  const notBudgetedTransaction = useMemo(
    () =>
      budget.transactions.filter(
        (transaction) =>
          !budgetedCategories.find(
            (budgetedCategory) => budgetedCategory.id === transaction.categoryId
          )
      ),
    [budget.transactions, budgetedCategories]
  );

  const notBudgetedExpenses = useMemo(
    () =>
      notBudgetedTransaction.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
    [notBudgetedTransaction]
  );

  const availableForRestCategories = useMemo(
    () => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [budget.totalAmount, amountTaken, notBudgetedExpenses]
  );

  return (
    <div>
      <div
        css={`
          border-bottom: solid 5px ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleClearParentCategorySelect}
        />
      </div>
      <ToogleableList
        items={listItems}
        clickRef={handleClickParentCategoryRef}
      />
      <div
        css={`
          border-top: solid 5px ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory
          name={t('Other categories')}
          amount={availableForRestCategories}
          onClick={handleSelectRestParentCategories}
        />
      </div>
    </div>
  );
};

export default BudgetCategoryList;
