import { ThemeProvider } from 'styled-components';
import GlobalStyles from './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import theme from 'utils/theme';

import { Navigation, Wrapper } from 'components';

import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            {
              content: t('HomePage'),
              to: '/',
            },
            {
              content: t('Budget'),
              to: '/budget',
            },
          ]}
          RightElement={
            <div>
              <button>pl</button>
              <button>en</button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route path="/" exact>
              HomePage
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
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  );
}

export default RootApp;
