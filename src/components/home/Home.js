import React, { Component } from "react";
import NavBar from "./NavBar";
import TokenService from "../../shared/services/TokenService";

export default class Home extends Component {
  logout = () => {
    this.props.history.push("/login");
    TokenService.deconnexion();
  };
  render() {
    return (
      <NavBar logout={this.logout} />

      // <div className="btn btn-primary" onClick={this.logout}>
      //   Logout
      // </div>
    );
  }
}
