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

export class MenuReleveNon extends React.Component {
  render() {
    return (
      <div className="containerReleve">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>
                <h1>Gestion de vos relevés bancaires</h1>
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
                      {" "}
                      Releve non signé
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/releveinvalide/">
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
                      Rapprochement bancaire
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/relevevalide">
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
export default MenuReleveNon;
