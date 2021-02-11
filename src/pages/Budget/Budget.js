import React, { Fragment, useState } from 'react';

import { Grid } from './Budget.css';

import { Modal, Button, LoadingIndicator } from 'components';

import { Route, Switch } from 'react-router-dom';

import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

import 'styled-components/macro';

const BudgetCategoryList = React.lazy(() =>
  import('./components/BudgetCategoryList')
);

const BudgetTransactionList = React.lazy(() =>
  import('./components/BudgetTransactionList')
);
const AddTransactionView = React.lazy(() =>
  import('pages/Budget/components/AddTransactionForm')
);

const Budget = () => {
  const { reset } = useQueryErrorResetBoundary();
  const [showTransactions, setShowTransactions] = useState(true);

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
        <section
          css={`
            margin-left: 10px;
          `}
        >
          <ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
            <React.Suspense fallback={<LoadingIndicator />}>
              <Button to={'/budget/transactions/new'}>
                Add new transactions
              </Button>
              <Button onClick={() => setShowTransactions(!showTransactions)}>
                {showTransactions ? 'Hide Transactions' : 'Show Transactions'}
              </Button>
              {showTransactions && <BudgetTransactionList />}
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
