import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBRow,} from "mdbreact";

const ListSociete = () =>{


    return (
      <div className="containerGestionComptable">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>
                <h1>Gestion Des Sociétés</h1>
              </MDBCardTitle>
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
                        <div>Sociétés Activées</div>
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/users/stvu/societes/active">
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
                    <div>Sociétés Desactivées</div>
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/users/stvu/societes/desactive">
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
                    <div>Toutes Les Sociétés</div>
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/users/stvu/societes/all">
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

              <MDBCol className="col-12 mt-4">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle className="MDBCardTitle" style={{ textAlign: 'center' }}>
                    <div>Créer Une Société</div>
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton text-center">
                      <Link to="/users/stvu/societes/add">
                        <MDBBtn
                          className="boutton "
                          color=" teal lighten-2"
                          rounded
                          size="sm"
                        >
                          <span id="color-button">CREER</span>
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <br />
          </div>
          <Link to="/users/stvu" className="btn btn-outline-success mt-5">
              <span >Retourner</span>
          </Link>
        </MDBContainer>
      </div>
    );
  }

export default ListSociete;

