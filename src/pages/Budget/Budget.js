import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from './Budget.css';

import {
  fetchBudget,
  fetchBudgetedCategories,
} from 'data/actions/budget.actions';

import { fetchAllCategories } from 'data/actions/common.action';
import { LoadingIndicator } from 'components';

import BudgetCategoryList from './components/BudgetCategoryList';

const Budget = () => {
  const commonState = useSelector((store) => store.common.loadingState);
  const budgetState = useSelector((store) => store.budget.loadingState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBudget(1));
    dispatch(fetchBudgetedCategories(1));
    dispatch(fetchAllCategories());
  }, []);

  const isLoaded = useMemo(
    () =>
      !!commonState &&
      Object.keys(commonState).length === 0 &&
      !!budgetState &&
      Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  return (
    <Grid>
      <section>
        {' '}
        {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}{' '}
      </section>
      <section>{isLoaded ? ' Transaction list' : <LoadingIndicator />}</section>
    </Grid>
  );
};

export default Budget;
