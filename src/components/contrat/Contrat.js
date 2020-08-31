import React from "react";
//import Axios from 'axios';
import { Link } from "react-router-dom";
export default class Contrat extends React.Component {
  render() {
    return (
      <div>
        <h1>GESTION DES CONTRATS</h1>
        <hr />

        <div className="center">
          <div className="accueil">
            <div className="card testimonial-card">
              <div className="card-up bg-success lighten-1"></div>
              <div className="avatar mx-auto white">
                <i className="fas fa-file fa-7x"></i>
              </div>
              <div className="card-body">
                <h4 className="card-title">Creer un nouveau contrat</h4>
                <hr />

                <p>
                  <Link to={"/creercontrat"}>
                    <button className="btn btn-success btn-block my-4">
                      Creer un nouveau contrat
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="accueil">
            <div className="card testimonial-card">
              <div className="card-up bg-success lighten-1"></div>
              <div className="avatar mx-auto white">
                <i className="fas fa-file-alt fa-7x"></i>
              </div>
              <div className="card-body">
                <h4 className="card-title">Voir la liste de mes contrats</h4>
                <hr />

                <p>
                  <Link to={"/listcontrat"}>
                    <button className="btn btn-success btn-block my-4">
                      Voir la liste de mes contrats
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="accueil">
            <div className="card testimonial-card">
              <div className="card-up bg-success lighten-1"></div>
              <div className="avatar mx-auto white">
                <i className="fas fa-archive fa-7x"></i>
              </div>
              <div className="card-body">
                <h4 className="card-title">Consulter mes référentiels</h4>
                <hr />

                <p>
                  <Link to={"/ref"}>
                    <button className="btn btn-success btn-block my-4">
                      Consulter mes référentiels
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
