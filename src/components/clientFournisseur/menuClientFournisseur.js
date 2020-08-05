import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import Style from './ClientFournisseur.module.css'



class MenuClientFournisseur extends Component {
  render() {
    return (

      <div className="container-fluid container-fluid p-5 bg-light justify-content-center align-items-center ">
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
      </div>


    );
  }
}

export default MenuClientFournisseur;
