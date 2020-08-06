import React from "react";
import "./style1.scss";
import { Link } from "react-router-dom";
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
      societe: {
        id: 1,
        civilite: "Monsieur",
        userId: 1,
        comptableId: 1,
        idInfoEntreprise: 1,
        dateDeCreation: "2020-07-27",
        description: "sociéte de de vente de logiciels Java",
        domaineDactivite: "Commerciales",
        email: "jakarta@gmail.com",
        fax: "0954389764",
        formeJuridique: "SARL",
        raisonSociale: "JAKARTA SARL",
        siren: "111 222 333",
        siret: "111 222 333 00444",
        telephone: "0954389765",
        idAdresse: 1,
        boitePostale: "1700",
        codePostal: "59000",
        nomRue: "Avenue des Developpeurs",
        numeroRue: "104",
        ville: "Lille",
        listeEmployes: [{}, {}],
      },
      isLogginActive: true,
    };
  }

  handleEmploye() {}

  render() {
    const title = "Gestion Social";
    const title1 = "Gestion des Employés";
    const title2 = "Validation Comptable";
    const title3 = "Gestion des Variables de Paie";
    const title4 = "Gestion des Fiches de Paie";
    const title5 = "Déclaration Embauche";
    const entreprise = this.state.societe.raisonSociale;

    return (
      <div className="App1">
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
                <hr></hr>
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
                          <Link to="/listEmployes">
                            <MDBBtn rounded size="sm" color="teal accent-3">
                              Gerer
                            </MDBBtn>
                          </Link>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
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
                          <Link to="/listEmployes">
                            <MDBBtn rounded size="sm" color="teal accent-3">
                              Gerer
                            </MDBBtn>
                          </Link>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
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
                          <Link to="/listEmployes">
                            <MDBBtn color="teal accent-3" rounded size="sm">
                              Gerer
                            </MDBBtn>
                          </Link>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
                <br />
                <MDBRow around between>
                  <MDBCol md="3" className="mb-3">
                    <MDBCard className="cadre1">
                      <MDBCardBody>
                        <MDBCardTitle tag="h4">{title3}</MDBCardTitle>
                        <br />
                        <MDBCardText>
                          Enregistrement et modification des variables de paies
                          des Employés
                        </MDBCardText>
                        <br />
                        <div className="boutton">
                          <Link to="/listEmployes">
                            <MDBBtn color="teal accent-3" rounded size="sm">
                              Gerer
                            </MDBBtn>
                          </Link>
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
                          Consultation et Téléchargement des Fiches de Paie des
                          Employés
                        </MDBCardText>
                        <br />
                        <div className="boutton">
                          <Link to="/listEmployes">
                            <MDBBtn color="teal accent-3" rounded size="sm">
                              Gerer
                            </MDBBtn>
                          </Link>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBContainer>
          </div>
        </div>
      </div>
    );
  }
}
export default AccueilSocial;
