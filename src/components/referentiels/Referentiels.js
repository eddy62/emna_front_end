import React from "react";
//import Axios from 'axios';
import {Link} from "react-router-dom";

export default class Referentiels extends React.Component {
  render() {
    return (
      <div>
        <h1>GESTION DES REFERENTIELS</h1>
        <hr />

        <div className="center">
          <div className="accueil">
            <div className="card testimonial-card">
              <div className="card-up bg-success lighten-1"></div>
              <div className="avatar mx-auto white">
                <i className="fas fa-file fa-7x"></i>
              </div>
              <div className="card-body">
                <h4 className="card-title">Article</h4>
                <hr />

                <p>
                  <Link to={"/articles"}>
                    <button className="btn btn-success btn-block my-4">
                      Consulter mes articles
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
                <h4 className="card-title">Clause</h4>
                <hr />

                <p>
                  <Link to={"/clauses"}>
                    <button className="btn btn-success btn-block my-4">
                      Consulter mes clauses
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
