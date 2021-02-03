import { ThemeProvider } from 'styled-components';
import GlobalStyles from './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import theme from 'utils/theme';

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';

import { Home } from 'pages';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchBudget,
  fetchBudgetedCategories,
} from './data/actions/budget.actions';

function App() {
  const budget = useSelector((store) => store.budget.budget);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBudget(1));
    dispatch(fetchBudgetedCategories(1));
  }, []);

  const { i18n } = useTranslation();

  console.log(budget);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            {
              content: 'HomePage',
              to: '/',
            },
            {
              content: 'Budget',
              to: '/budget',
            },
          ]}
          RightElement={
            <div>
              <Button
                variant={'regular'}
                onClick={() => i18n.changeLanguage('pl')}
              >
                pl
              </Button>
              <Button
                variant={'regular'}
                onClick={() => i18n.changeLanguage('en')}
              >
                en
              </Button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/budget">BudgetPage</Route>
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
}

function RootApp() {
  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <App />
    </React.Suspense>
  );
}

export default RootApp;
