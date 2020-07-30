
import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListerClientFournisseur from './listerClientFournisseur';
import AddClientFournisseur from './addClientFournisseur';
import { MDBBtn } from "mdbreact";
import Style from './ClientFournisseur.module.css'
import NavBar from '../home/NavBar';

class MenuClientFournisseur extends Component {

  render() {
    return (

      <Router>
        <NavBar />
        <div className={"container-fluid" + Style.menu}>
          <h1 className={Style.h1}>Gestion Client Fournisseur</h1>
        </div>
        <div>
          <nav>
            <Fragment>
              <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                  <Link to="/liste">
                    <MDBBtn className={Style.button} color="info" >La Liste Des Mes Associés</MDBBtn></Link>
                </li>
                <li className="nav-item">
                  <Link to="/creer">
                    <MDBBtn color="info" > +Céer Une Société </MDBBtn> </Link>
                </li>
              </ul>
            </Fragment>
          </nav>

          <Route path="/liste" component={ListerClientFournisseur} />
          <Route path="/creer" component={AddClientFournisseur} />
        </div>
      </Router>

    );
  }
}



export default MenuClientFournisseur;