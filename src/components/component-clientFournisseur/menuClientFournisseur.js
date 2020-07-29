
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListerClientFournisseur from './listerClientFournisseur';
import AddClientFournisseur from './addClientFournisseur';
import { MDBBtn } from "mdbreact";
import Style from './ClientFournisseur.module.css'


class MenuClientFournisseur extends Component {

  render() {
    return (

      <Router>
        <div className={Style.menu}>
          <h1 className={Style.h1}>Gestion Société</h1>
        </div>
        <div>
          <nav>
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <Link to="/liste">
                  <MDBBtn>La Liste Des Mes Associés</MDBBtn></Link>
              </li>
              <li className="nav-item">
                <Link to="/creer">
                  <MDBBtn> +Céer Une Société </MDBBtn> </Link>
              </li>
              <li className="nav-item">
                <MDBBtn> +Céer Une Société </MDBBtn>
              </li>
            </ul>
          </nav>
          <Route path="/liste" component={ListerClientFournisseur} />
          <Route path="/creer" component={AddClientFournisseur} />
        </div>
      </Router>

    );
  }
}



export default MenuClientFournisseur;