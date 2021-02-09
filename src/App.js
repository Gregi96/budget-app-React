import { ThemeProvider } from 'styled-components';
import GlobalStyles from './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import theme from 'utils/theme';

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';

import { Home, Budget } from 'pages';

import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  const { i18n } = useTranslation();

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
            <Route path="/budget">
              <Budget />
            </Route>
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
