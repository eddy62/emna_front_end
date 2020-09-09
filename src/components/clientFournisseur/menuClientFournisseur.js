import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBRow
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
      AxiosCenter.getWrapperSociete(this.state.societeId)
        .then((response) => {
          const societeNom = response.data.raisonSociale
          this.setState({ societeNom: societeNom });
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
            <MDBCardTitle tag="h2"> Gestion Société : {this.state.societeNom} </MDBCardTitle>
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
        <MDBRow>
          <MDBCol>
            <MDBCard >
              <MDBCardBody>
                <MDBCardTitle tag="h4">Client Fournisseur</MDBCardTitle>
                <br />
                <MDBCardText>
                  Consultation, Enregistrement et Modification des données
                  des mes associes
                      </MDBCardText>
                <br />
                <div>
                  <Link to="/clientFournisseur/liste">
                    <MDBBtn rounded size="sm" color="teal accent-3">
                      Voir La Liste
                          </MDBBtn>
                  </Link>
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
                  Consultation, Enregistrement et Modification des données
                  des mes produits
                      </MDBCardText>
                <br />
                <div className="boutton">
                  <Link to="/produits">
                    <MDBBtn color="teal accent-3" rounded size="sm">
                      Voir La Liste
                          </MDBBtn>
                  </Link>
                  <Link name={this.state.societeNom} to="/produit/creer">
                    <MDBBtn color="teal accent-3" rounded size="sm" >
                      +Ajouter
                          </MDBBtn>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <br></br>
            <div className="row d-flex justify-content-center">
              <Link to="/">
                <MDBBtn color="teal accent-3" rounded size="sm">
                  Retour à l'Acceuil
                </MDBBtn>
              </Link>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>



    );
  }
}

export default MenuClientFournisseur;
