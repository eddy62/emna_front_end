import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBRow,} from "mdbreact";


const ListComptable = () => {



  return (
    <div className="containerGestionComptable">
      <MDBContainer>
        <div>
          <MDBCardHeader color="default-color">
            <MDBCardTitle>
              <h1>Gestion Des Comptables</h1>
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
                    <div>Comptables Activés</div>
                  </MDBCardTitle>
                  <br />

                  <br />
                  <div className="boutton">
                    <Link to="/users/stvu/comptables/active">
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
                    <div>Comptables Desactivés</div>
                  </MDBCardTitle>
                  <br />

                  <br />
                  <div className="boutton">
                    <Link to="/users/stvu/comptables/desactive">
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
                    <div>Tous Les Comptables</div>
                  </MDBCardTitle>
                  <br />

                  <br />
                  <div className="boutton">
                    <Link to="/users/stvu/comptables/all">
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
                    <div>Créer Un Comptable</div>
                  </MDBCardTitle>
                  <br />

                  <br />
                  <div className="boutton text-center">
                    <Link to="/users/stvu/comptables/add">
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
          <Link to="/users/stvu" className="btn btn-outline-success mt-5">
              <span >Retourner</span>
          </Link>
        </div>
      </MDBContainer>
    </div>

  );
}

export default ListComptable;

