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
import UserService from "../../shared/services/UserService";
const SelectToViewUser = () => {

    return (
        <div className="App">
          <MDBContainer>
            <div>
              <MDBCardHeader color="default-color">
                <MDBCardTitle>
                  <h1>Gestion Des Utilisateurs</h1>
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
                        <div>Comptables</div>
                      </MDBCardTitle>
                      <br />

                      <br />
                      <div className="boutton">
                        <Link to="/users/stvu/comptables">
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
                      <MDBCardTitle className="MDBCardTitle">
                       <div>Sociétés</div>
                      </MDBCardTitle>
                      <br />

                      <br />
                      <div className="boutton">
                        <Link to="/users/stvu/societe">
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
                      <MDBCardTitle className="MDBCardTitle">
                       <div>Admins</div>
                      </MDBCardTitle>
                      <br />

                      <br />
                      <div className="boutton">
                        <Link to="/users/stvu/users">
                          <MDBBtn className="boutton" rounded size="sm">
                            Gerer
                          </MDBBtn>
                        </Link>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <br />
                <MDBRow>
                  <MDBCol>
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardTitle className="MDBCardTitle">
                        <div>Tous Les Utilisateurs</div>
                        </MDBCardTitle>
                        <br />

                        <br />
                        <div className="boutton">
                          <Link to="/users/stvu/all">
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

export default SelectToViewUser;