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

class JuridiqueMenu extends React.Component {
  render() {
    const title = "Espace Juridique";
    const title2 = "Contrat";
    const title3 = "Société";
    const title4 = "Assemblée générale";

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
                    <MDBCardText>Accéder à mes contrats</MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/contrat">
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
                      Accéder à mes clients/fournisseurs
                    </MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/client-fournisseur">
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
                    <MDBCardText>?</MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/">
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
export default JuridiqueMenu;
