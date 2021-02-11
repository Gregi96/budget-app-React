import React, { Fragment } from 'react';

import { Grid } from './Budget.css';

import { Modal, Button, LoadingIndicator } from 'components';

import BudgetCategoryList from './components/BudgetCategoryList';

import BudgetTransactionList from './components/BudgetTransactionList';

import { Route, Switch } from 'react-router-dom';

import AddTransactionView from 'pages/Budget/components/AddTransactionForm';

// import { useQuery } from 'react-query';
import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

// import API from 'data/fetch';

const Budget = () => {
  const { reset } = useQueryErrorResetBoundary();

  const fallbackRender = ({ resetErrorBoundary }) => (
    <div>
      Something went wrong!
      <Button onClick={() => resetErrorBoundary()}>Try again</Button>
    </div>
  );

  return (
    <Fragment>
      <Grid>
        <section>
          <ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
            <React.Suspense fallback={<LoadingIndicator />}>
              <BudgetCategoryList />
            </React.Suspense>
          </ErrorBoundary>
        </section>
        <section>
          <ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
            <React.Suspense fallback={<LoadingIndicator />}>
              <Button to={'/budget/transactions/new'}>
                Add new transactions
              </Button>
              <BudgetTransactionList />
            </React.Suspense>
          </ErrorBoundary>
        </section>
      </Grid>

      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionView />
          </Modal>
        </Route>
      </Switch>
    </Fragment>
  );
};

export default Budget;
