import React, { Component } from "react";
import NavBar from "./NavBar";
import TokenService from "../../shared/services/TokenService";
import SideBar from "./SideBar";

export default class Home extends Component {
  logout = () => {
    this.props.history.push("/login");
    TokenService.deconnexion();
  };
  render() {
    return (
      <React.Fragment>
        <NavBar logout={this.logout} />
        <SideBar />
      </React.Fragment>
      // <div className="btn btn-primary" onClick={this.logout}>
      //   Logout
      // </div>
    );
  }
}
