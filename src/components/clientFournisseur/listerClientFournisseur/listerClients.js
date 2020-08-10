import React, { Component } from "react";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import Style from "./../ClientFournisseur.module.css";
import SupprimerClientFournisseur from "../supprimerClientFounisseur/supprimerClient";
import { MDBBtn } from 'mdbreact';
import { Link } from "react-router-dom";


class ListerClientFournisseur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      // idUser: null,
      // roleUser: '',
      // nomUser: '',

    };
  }

  componentDidMount() {

    // AxiosCenter.getCurrentUser()
    //   .then((response) => {
    //     const idUser = response.data.id
    //     const roleUser = response.data.authorities

    //     console.log("data " + response.data)
    //     this.setState({
    //       idUser: idUser,
    //       roleUser: roleUser
    //     });
    //     console.log("role " + this.state.roleUser)
    //     console.log("id " + this.state.idUser)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

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
                      <td >{c.nom}</td>
                      <td >{c.siren}</td>
                      <td>{c.email}</td>
                      <td>
                        <div size="sm" className="btn-group flex-btn-group-container">
                          <MDBBtn color="info" rounded circle="true" size="sm">
                            <Link to={`/clientFournisseur/detail/${c.id}`}>
                              <span>Detail</span>
                            </Link>
                          </MDBBtn>
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
        <Link to="/client-fournisseur">
          <MDBBtn rounded color="teal accent-3">
            Retour
                  </MDBBtn>
        </Link>
      </div>
    );
  }
}

export default ListerClientFournisseur;
