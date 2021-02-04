import React from 'react';
import { useSelector } from 'react-redux';
import { groupBy } from 'lodash';

import ToogleableList from 'components/ToogleableList';

import ParentCategory from './ParentCategory';

import CategoryItem from './CategoryItem';

const BudgetCategoryList = () => {
  const budgetedCategories = useSelector(
    (store) => store.budget.budgetedCategories
  );
  const allCategories = useSelector((store) => store.common.allCategories);

  const budgetedCategoriesByParent = groupBy(
    budgetedCategories,
    (item) =>
      allCategories.find((category) => category.id === item.categoryId)
        .parentCategory.name
  );

  const listItems = Object.entries(budgetedCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory name={parentName} onClick={() => onClick(parentName)} />
      ),
      children: categories.map((budgetedCategory) => {
        const { name } = allCategories.find(
          (category) => category.id === budgetedCategory.categoryId
        );

        return <CategoryItem key={budgetedCategory.id} name={name} />;
      }),
    })
  );

  return <ToogleableList items={listItems} />;
};

export default BudgetCategoryList;
