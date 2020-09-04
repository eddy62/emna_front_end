import React from "react";
import "./style1.scss";
import { Link } from "react-router-dom";
import AxiosCenter from "../../shared/services/AxiosCenter";
import UserService from "../../shared/services/UserService";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";

class AccueilSocial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      societe: {},
      isLogginActive: true,
    };
  }
  componentDidMount() {
    const idSociete = this.props.match.params.id;
    console.log(idSociete);
    AxiosCenter.getWrapperSociete(idSociete)
      .then((response) => {
        const societe = response.data;
        console.log(societe);
        this.setState({ societe: societe });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const title = "Gestion Social";
    const title1 = "Gestion des Employés";
    const title2 = "Validation Comptable";
    const title3 = "Gestion des Variables de Paie";
    const title4 = "Gestion des Fiches de Paie";
    const title5 = "Déclaration Embauche";
    const entreprise = this.state.societe.raisonSociale;

    return (
      <div className="App">
        <div className="social">
          <div>
            <MDBContainer>
              <div className="titre">
                <MDBCardHeader color="default-color">
                  <MDBCardTitle tag="h1">{title}</MDBCardTitle>
                  <br />
                  <MDBCardTitle tag="h3">{entreprise}</MDBCardTitle>
                </MDBCardHeader>
              </div>
              <div className="titre">
                <hr />
              </div>
              <div className="menu">
                <MDBRow around between>
                  <MDBCol md="3" className="mb-3">
                    <MDBCard className="cadre1">
                      <MDBCardBody>
                        <MDBCardTitle tag="h4">{title1}</MDBCardTitle>
                        <br />
                        <MDBCardText>
                          Enregistrement, Consultation et Modification des
                          données des Employés de la Sociéte
                        </MDBCardText>
                        <br />
                        <div>
                          <MDBBtn
                            rounded
                            size="sm"
                            color="teal accent-3"
                            onClick={() => {
                              this.props.history.push(
                                "/listEmployes/" + this.state.societe.id
                              );
                            }}
                          >
                            Gerer
                          </MDBBtn>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  {UserService.getRole() === "ROLE_SOCIETY" ? (
                    <MDBCol md="3" className="mb-3">
                      <MDBCard className="cadre1">
                        <MDBCardBody>
                          <MDBCardTitle tag="h4">{title5}</MDBCardTitle>
                          <br />
                          <MDBCardText>
                            Déclaration d'Embauche en ligne et Télechargement
                            Attestation d'Embauche
                          </MDBCardText>
                          <br />
                          <div>
                            <MDBBtn
                              rounded
                              size="sm"
                              color="teal accent-3"
                              onClick={() => {
                                this.props.history.push(
                                  "/socialHome/" + this.state.societe.id
                                );
                              }}
                            >
                              Gerer
                            </MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ) : null}
                  {UserService.getRole() === "ROLE_ACCOUNTANT" ? (
                    <MDBCol md="3" className="mb-3">
                      <MDBCard className="cadre1">
                        <MDBCardBody>
                          <MDBCardTitle tag="h4">{title2}</MDBCardTitle>
                          <br />
                          <MDBCardText>
                            Validation Comptables des variables de Paie des
                            Employés et pièces comptables
                          </MDBCardText>
                          <br />
                          <div className="boutton">
                            <MDBBtn
                              color="teal accent-3"
                              rounded
                              size="sm"
                              onClick={() => {
                                this.props.history.push(
                                  "/socialHome/" + this.state.societe.id
                                );
                              }}
                            >
                              Gerer
                            </MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ) : null}
                </MDBRow>
                <br />
                {(UserService.getRole() === "ROLE_SOCIETY") |
                (UserService.getRole() === "ROLE_ACCOUNTANT") ? (
                  <MDBRow around between>
                    <MDBCol md="3" className="mb-3">
                      <MDBCard className="cadre1">
                        <MDBCardBody>
                          <MDBCardTitle tag="h4">{title3}</MDBCardTitle>
                          <br />
                          <MDBCardText>
                            Enregistrement et modification des variables de
                            paies des Employés
                          </MDBCardText>
                          <br />
                          <div className="boutton">
                            <MDBBtn
                              color="teal accent-3"
                              rounded
                              size="sm"
                              onClick={() => {
                                this.props.history.push(
                                  "/variables_de_paie/addVariablePaie/ParentAddVariablePaie/" + this.state.societe.id
                                );
                              }}
                            >
                              Gerer
                            </MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="3" className="mb-3">
                      <MDBCard className="cadre1">
                        <MDBCardBody>
                          <MDBCardTitle tag="h4">{title4}</MDBCardTitle>
                          <br />
                          <MDBCardText>
                            Consultation et Téléchargement des Fiches de Paie
                            des Employés
                          </MDBCardText>
                          <br />
                          <div className="boutton">
                            <MDBBtn
                              color="teal accent-3"
                              rounded
                              size="sm"
                              onClick={() => {
                                this.props.history.push(
                                  "/socialHome/" + this.state.societe.id
                                );
                              }}
                            >
                              Gerer
                            </MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                ) : null}
              </div>
              <div className="titre">
                <hr />
              </div>
              <Link to="/">
                <MDBBtn color="teal accent-3" rounded size="sm">
                  Retour à l'Accueil
                </MDBBtn>
              </Link>
            </MDBContainer>
          </div>
        </div>
      </div>
    );
  }
}
export default AccueilSocial;
