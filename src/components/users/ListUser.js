import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";

const ListAdmin = () =>{

    return (
      <div className="containerGestionComptable">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>
                <h1>Gestion Des Admins</h1>
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
                        <div>Admins Activés</div>
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/users/stvu/admins/active">
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
                    <div>Admins Desactivés</div>
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/users/stvu/admins/desactive">
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
                    <div>Tous Les Admins</div>
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/users/stvu/admins/all">
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
                    <div>Créer Un Admin</div>
                  </MDBCardTitle>
                  <br />

                  <br />
                  <div className="boutton text-center">
                    <Link to="/users/stvu/users/add">
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

export default ListAdmin;

