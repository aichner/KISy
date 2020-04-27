//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Route, Switch, Redirect } from "react-router-dom";

//> Components
/**
 * HomePage: Register page
 * ProfilePage: Profile of the member
 * LoginPage: Login page
 */
import { ProfilePage, LoginPage, MessagePage } from "./components/pages";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/me" component={ProfilePage} />
        <Route
          exact
          path="/about"
          component={(props) => <MessagePage {...props} />}
        />
        <Route
          exact
          path="/privacy"
          component={(props) => <MessagePage {...props} />}
        />
        <Route
          exact
          path="/privacy/me"
          component={(props) => <MessagePage {...props} />}
        />
        <Route
          render={function () {
            return <Redirect to="/" />;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
