import React from "react";
import { Switch, Route } from "react-router-dom";
import RoutesWithNavigation from "./components/RoutesWithNavigation";
import Login from "./components/login/Login";
import "./App.scss";
import { PrivateRoute } from "./helpers/PrivateRoute";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={RoutesWithNavigation} />
        <RoutesWithNavigation />
      </Switch>
    );
  }
}

export default App;
