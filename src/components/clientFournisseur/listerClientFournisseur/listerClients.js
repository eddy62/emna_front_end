import React, { Component } from "react";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import DetailsClientFournisseur from "../detailsClientFounisseur/detailsClient";
import { Link } from "react-router-dom";
import { MDBBtn } from 'mdbreact';
import Style from "./../ClientFournisseur.module.css";
import SupprimerClientFournisseur from "../supprimerClientFounisseur/supprimerClient";

class ListerClientFournisseur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
    };
  }

  componentDidMount() {
    AxiosCenter.getAllClientFournisseurBySociete(1)
      .then((response) => {
        const clients = response.data;
        this.setState({ clients });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    return (
      <div>

        <div className="container-fluid container-fluid p-5  justify-content-center align-items-center ">
          <h1 className={Style.h2}>Liste de clients de société </h1>
          <div>
            <table className="table table-striped table-bordered table-hover table-sm">
              <caption>La liste des clients fournisseurs</caption>
              <thead className={Style.add}>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">SIREN</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {this.state.clients && this.state.clients.length ? (
                  this.state.clients.map((c, index) => (
                    <tr key={index}>
                      <td scope="row">{c.nom}</td>
                      <td scope="row">{c.siren}</td>
                      <td scope="row">{c.email}</td>
                      <td>
                        <div size="sm" className="btn-group flex-btn-group-container">
                          <DetailsClientFournisseur client={c} />
                          <SupprimerClientFournisseur client={c} />
                        </div>

                      </td>
                    </tr>
                  ))
                ) : (
                    <h1 className="text-center"> Pas des Client ... </h1>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListerClientFournisseur;
