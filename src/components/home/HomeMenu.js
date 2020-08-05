import React from "react";
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

class HomeMenu extends React.Component {
  render() {
    const title = "Bienvenue sur EMNA";
    const title2 = "Comptabilité";
    const title3 = "Juridique";
    const title4 = "Social";

    return (
      <div className="App">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>
                <h1>{title}</h1>
              </MDBCardTitle>
              <br />
              <MDBCardTitle>
                <h3>Accueil</h3>
              </MDBCardTitle>
            </MDBCardHeader>
          </div>
          <div>
            <hr></hr>
          </div>
          <div>
            <MDBRow>
              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle className="text">{title2}</MDBCardTitle>
                    <br />
                    <MDBCardText>
                      Validation Comptables des variables de Paie des Employés
                    </MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/listEmployes">
                        <MDBBtn className="boutton" rounded size="sm">
                          Gerer
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle className="text">{title3}</MDBCardTitle>
                    <br />
                    <MDBCardText>
                      Enregistrement et modification des variables de paies des
                      Employés
                    </MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/listEmployes">
                        <MDBBtn className="boutton" rounded size="sm">
                          Gerer
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle className="text">{title4}</MDBCardTitle>
                    <br />
                    <MDBCardText>
                      Consultation et Téléchargement des Fiches de Paie des
                      Employés
                    </MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/listEmployes">
                        <MDBBtn className="boutton" rounded size="sm">
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
    );
  }
}
export default HomeMenu;
