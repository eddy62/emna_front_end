import React, { Component } from "react";
import TokenService from "../../shared/services/TokenService";

export default class Home extends Component {
  logout = () => {
    this.props.history.push("/login");
    TokenService.deconnexion();
  };
  render() {
    return (
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          EMNA
        </a>

        <div className="btn btn-primary" onClick={this.logout}>
          Logout
        </div>
      </header>
    );
  }
}
