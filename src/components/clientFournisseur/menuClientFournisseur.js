import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBBtn, MDBContainer, MDBRow,
  MDBCol
} from "mdbreact";
import AxiosCenter from "../../shared/services/AxiosCenter";
import UserService from '../../shared/services/UserService';


class MenuClientFournisseur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientFournisseur: {},
      loading: false,
      value: '',
      societeId: UserService.getSocietyId(),
      roleUser: UserService.getRole(),
      societeNom: '',
    };
  }

  componentDidMount() {
    if (this.state.roleUser === "ROLE_SOCIETY") {
      AxiosCenter.getSocieteById(this.state.societeId)
        .then((response) => {
          const infoEntrepriseId = response.data.infoEntrepriseId;
          AxiosCenter.getInfoEntrepriseById(infoEntrepriseId)
            .then((response) => {
              const societeNom = response.data.raisonSociale
              this.setState({ societeNom: societeNom });
              console.log(" nom societe " + this.state.societeNom)
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }

  search = async val => {
    this.setState({ loading: true });
    AxiosCenter.getClientFournisseurByNom(val)
      .then((response) => {
        const clientFournisseur = response.data;
        this.setState({
          clientFournisseur: clientFournisseur,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });

  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };
  render() {
    return (

      <MDBContainer>
        <div className="justify-content-center align-items-center container-fluid p-5 ">
          <MDBCardHeader color="default-color">
            <MDBCardTitle tag="h2">Recherchez parmi toutes les entreprises {this.state.societeNom} </MDBCardTitle>
            <br></br>
            <div className="justify-content-center container-fluid align-items-center">
              <form className="form-inline ">
                <input value={this.state.value}
                  onChange={e => this.onChangeHandler(e)} className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Raison sociale??"
                  aria-label="Search" />
                <i className="fas fa-search" aria-hidden="true"></i>
              </form>
            </div>
          </MDBCardHeader>
        </div>
        <div>
          <br></br>

          {this.state.clientFournisseur ? (
            <Link to={`/clientFournisseur/detail/${this.state.clientFournisseur.id}`}>
              <span>{this.state.clientFournisseur.nom}</span>
            </Link>
          ) : (null)}

          <br></br>
        </div>
        <div className="justify-content-center align-items-center">
          <MDBRow>
            <MDBCol>
              <MDBCard >
                <MDBCardBody>
                  <MDBCardTitle tag="h4">Lister mes associes</MDBCardTitle>
                  <br />
                  <MDBCardText>
                    Consultation et Modification des données
                    des mes associes
                      </MDBCardText>
                  <br />
                  <div>
                    <Link to="/clientFournisseur/liste">
                      <MDBBtn rounded size="sm" color="teal accent-3">
                        Voir
                          </MDBBtn>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard >
                <MDBCardBody>
                  <MDBCardTitle tag="h4">Ajouter un nouveau client founisseur</MDBCardTitle>
                  <br />
                  <MDBCardText>
                    Enregistrement des données des mes associes
                      </MDBCardText>
                  <br />
                  <div className="boutton">
                    <Link to="/clientFournisseur/creer">
                      <MDBBtn color="teal accent-3" rounded size="sm">
                        +Ajouter
                          </MDBBtn>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard >
                <MDBCardBody>
                  <MDBCardTitle tag="h4">Produits</MDBCardTitle>
                  <br />
                  <MDBCardText>
                    Enregistrement,Consultation et Modification mes produits
                      </MDBCardText>
                  <br />
                  <div className="boutton">
                    <Link to="/produits">
                      <MDBBtn color="teal accent-3" rounded size="sm">
                        produits
                          </MDBBtn>
                    </Link>
                    <Link to="/produit/creer">
                      <MDBBtn color="teal accent-3" rounded size="sm">
                        +Ajouter
                          </MDBBtn>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>



    );
  }
}

export default MenuClientFournisseur;
