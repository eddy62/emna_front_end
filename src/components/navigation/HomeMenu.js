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
import "./style.scss";
import AxiosCenter from "./../../shared/services/AxiosCenter";

class HomeMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "",
    };
  }
  componentDidMount() {
    AxiosCenter.getCurrentUser().then((response) => {
      this.setState({
        userRole: response.data.authorities[0],
      });
      console.log(this.state.userRole);
    });
  }
  render() {
    const title = "Bienvenue sur EMNA";
    const title2 = "Comptabilité";
    const title3 = "Juridique";
    const title4 = "Social";
    const title5 = "Interface Admin";
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
                    <MDBCardTitle className="MDBCardTitle">
                      {title2}
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/menu/comptabilite">
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
                      {title3}
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/menu/juridique">
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
                      {title4}
                    </MDBCardTitle>
                    <br />

                    <br />
                    <div className="boutton">
                      <Link to="/socialHome">
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
            {this.state.userRole === "ROLE_ADMIN" ? (
              <MDBRow>
                <MDBCol>
                  <MDBCard>
                    <MDBCardBody>
                      <MDBCardTitle className="MDBCardTitle">
                        {title5}
                      </MDBCardTitle>
                      <br />

                      <br />
                      <div className="boutton">
                        <Link to="/socialHome">
                          <MDBBtn className="boutton" rounded size="sm">
                            Gerer
                          </MDBBtn>
                        </Link>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            ) : null}
          </div>
        </MDBContainer>
      </div>
    );
  }
}
export default HomeMenu;
