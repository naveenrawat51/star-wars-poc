import React, { Suspense } from "react";
import Login from "./pages/login/Login";
import { Route, Switch } from "react-router-dom";
import Search from "./pages/search/Search";
import { connect } from "react-redux";
import ErrorBoundary from "./components//errorBoundary/ErrorBoundary";

function App(props) {
  let routes = (
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => <Login {...props} />}
      />
      <Route
        path="/search"
        exact
        render={(props) => <Search {...props} />}
      />
    </Switch>
  );

  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback>{routes}</Suspense>
      </div>
    </ErrorBoundary>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated !== null,
  };
};

export default connect(mapStateToProps, null)(App);
