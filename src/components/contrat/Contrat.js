import React from "react";

import { Link } from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from "mdbreact";

export default class Contrat extends React.Component {
  render() {
    return (
      <div>

        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>Gestion des contrats de travail</MDBCardTitle>
              <br />
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
                    <MDBCardTitle className="MDBCardTitle">
                      {" "}
                      Créer un nouveau contrat
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/creercontrat">
                        <MDBBtn
                            className="boutton"
                            color=" teal lighten-2"
                            rounded
                            size="sm"
                        >
                          <span id="color-button"> GERER</span>
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle className="MDBCardTitle">
                      Voir la liste de mes contrats
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/listcontrat">
                        <MDBBtn
                            className="boutton"
                            color=" teal lighten-2"
                            rounded
                            size="sm"
                        >
                          <span id="color-button"> GERER</span>
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle className="MDBCardTitle">
                      Consulter mes référentiels
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/ref">
                        <MDBBtn
                            className="boutton"
                            color=" teal lighten-2"
                            rounded
                            size="sm"
                        >
                          <span id="color-button"> GERER</span>
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <br />
          </div>
        </MDBContainer>
      </div>
    );
  }
}
