import React from 'react';

import { CategoryItem as Root } from './BudgetCategoryList.css';

const CategoryItem = ({ name }) => {
  return <Root>{name}</Root>;
};

export default CategoryItem;
