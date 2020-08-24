import React, { Component } from "react";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import SupprimerClientFournisseur from "../supprimerClientFounisseur/supprimerClient";
import { MDBBtn, MDBCardHeader, MDBCardTitle, MDBContainer } from 'mdbreact';
import { Link } from "react-router-dom";
import UserService from '../../../shared/services/UserService';


class ListerClientFournisseur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      societeId: UserService.getSocietyId(),
      roleUser: UserService.getRole(),
      nomSociete: this.props.societeNom,

    };
  }

  componentDidMount() {
    if (this.state.roleUser === "ROLE_SOCIETY") {
      AxiosCenter.getAllClientFournisseurBySociete(this.state.societeId)
        .then((response) => {
          const clients = response.data;
          this.setState({ clients });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }


  render() {
    return (
      <MDBContainer>
        <div>
          <MDBCardHeader color="default-color">Liste Des Clients Founisseurs</MDBCardHeader>
          <MDBCardTitle tag="h1"> {this.state.nomSociete} </MDBCardTitle>
          <div>
            <br></br>
          </div>
          <table className="table table-striped table-bordered  table-sm">
            <caption>La liste des clients fournisseurs</caption>
            <thead color="teal accent-3">
              <tr className=" bg-info">
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
                      <div className="btn-group flex-btn-group-container">
                        <Link to={`/clientFournisseur/detail/${c.id}`}>
                          <MDBBtn color="info" rounded circle="true" size="sm">
                            <span>Detail</span>
                          </MDBBtn>
                        </Link>
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
        <div className="row d-flex justify-content-center">
          <Link to="/client-fournisseur">
            <MDBBtn rounded color="teal accent-3">
              Retour
                  </MDBBtn>
          </Link>
        </div>
      </MDBContainer >);
  }
}

export default ListerClientFournisseur;
