import { ThemeProvider } from 'styled-components';
import GlobalStyles from './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import theme from 'utils/theme';

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components';

import { Home, Budget } from 'pages';

import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { QueryClient, QueryClientProvider } from 'react-query';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

function RootApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </QueryClientProvider>
  );
}

export default RootApp;
