import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { withRouter } from "react-router-dom";
import "./style.scss";

class SideBar extends Component {
  render() {
    return (
      <Menu>
        <a className="menu-item" href="/">
          Home
        </a>

        <a className="menu-item" href="/laravel">
          Gestion Comptable
        </a>

        <a
          className="menu-item"
          onClick={() => this.props.history.push("/contrat")}
        >
          Gestion Contrats
        </a>

        <a className="menu-item" href="/react">
          Gestion Sociale
        </a>
      </Menu>
    );
  }
}
export default withRouter(SideBar);
