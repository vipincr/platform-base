import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './apolloClient';
import Auth from './components/auth/Auth';
import Settings from './components/settings/Settings';
import { Provider as ReduxProvider } from 'react-redux';
import store from './state/store';

const App = () => {
  const apolloClient = createApolloClient();

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/settings" component={Settings} />
            {/* Additional routes can be added here */}
          </Switch>
        </Router>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default App;
