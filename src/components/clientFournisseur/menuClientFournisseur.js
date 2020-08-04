
import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListerClientFournisseur from './listerClientFournisseur';
import AddClientFournisseur from './addClientFournisseur';
import { MDBBtn } from "mdbreact";
import Style from './ClientFournisseur.module.css'
import NavBar from '../home/NavBar';
import SideBar from '../home/SideBar';
;


class MenuClientFournisseur extends Component {

  render() {
    return (
      <div>

        <div> <NavBar /></div>
        <div className={"container-fluid" + Style.menu}>
          <h1 className={Style.h1}>Gestion Client Fournisseur</h1>
        </div>
        <div>
          <nav>

            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <Link to="/clientFournisseur/liste">
                  <MDBBtn className={Style.button} color="info" >La Liste Des Mes Associés</MDBBtn></Link>
              </li>
              <li className="nav-item">
                <Link to="/clientFournisseur/creer">
                  <MDBBtn color="info" > +Céer Une Société </MDBBtn> </Link>
              </li>
            </ul>
          </nav>
        </div >
      </div >


    );
  }
}



export default MenuClientFournisseur;