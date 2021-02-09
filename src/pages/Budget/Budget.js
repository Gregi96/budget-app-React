import React, { Fragment, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from './Budget.css';

import {
  fetchBudget,
  fetchBudgetedCategories,
  addTransaction,
} from 'data/actions/budget.actions';

import { fetchAllCategories } from 'data/actions/common.action';
import { LoadingIndicator, Modal, Button } from 'components';

import BudgetCategoryList from './components/BudgetCategoryList';

import BudgetTransactionList from './components/BudgetTransactionList';

import { Route, Switch, useHistory } from 'react-router-dom';

import AddTransactionForm from './components/AddTransactionForm';

const Budget = () => {
  const commonState = useSelector((store) => store.common.loadingState);
  const budgetState = useSelector((store) => store.budget.loadingState);
  const allCategories = useSelector((store) => store.common.allCategories);
  const budgetId = useSelector((store) => store.budget.budget.id);

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(fetchBudget(1));
    dispatch(fetchBudgetedCategories(1));
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const isLoaded = useMemo(
    () =>
      !!commonState &&
      Object.keys(commonState).length === 0 &&
      !!budgetState &&
      Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  const handleSubmitAddTransaction = (values) => {
    dispatch(
      addTransaction({
        budgetId: budgetId,
        data: values,
      })
    ).then(() => {
      history.goBack();
    });
  };

  return (
    <Fragment>
      <Grid>
        <section>
          {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
        </section>
        <section>
          {isLoaded ? (
            <Fragment>
              <Button to={'/budget/transactions/new'}>
                Add new transactions
              </Button>
              <BudgetTransactionList />
            </Fragment>
          ) : (
            <LoadingIndicator />
          )}
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm
              categories={allCategories}
              groupCategoriesBy={'parentCategory.name'}
              onSubmit={handleSubmitAddTransaction}
            />
          </Modal>
        </Route>
      </Switch>
    </Fragment>
  );
};

export default Budget;
