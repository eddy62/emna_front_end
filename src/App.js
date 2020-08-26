import React from "react";
import { Switch, Route } from "react-router-dom";
import RoutesWithNavigation from "./components/RoutesWithNavigation";
import Login from "./components/login/Login";
import "./App.scss";
import { PrivateRoute } from "./helpers/PrivateRoute";
import Register from "./components/login/Register";
import { ForgotPassword } from "./components/login/ForgotPassword";
import { ResetPassword } from "./components/login/ResetPassword";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot/password" component={ForgotPassword} />
        <Route path="/reset/password" component={ResetPassword} />
        <PrivateRoute path="/" component={RoutesWithNavigation} />
        <RoutesWithNavigation />
      </Switch>
    );
  }
}

export default App;
