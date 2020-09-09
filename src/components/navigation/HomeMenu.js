import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBRow,} from "mdbreact";
import "./style.scss";
import UserService from "../../shared/services/UserService";
import Loading from "./../../shared/component/Loading";

class HomeMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    this.setState({
      loaded: true,
    });
  }
  render() {
    const title = "Bienvenue sur EMNA";
    const title2 = "Comptabilité";
    const title3 = "Juridique";
    const title4 = "Social";
    const title5 = "Interface Admin";
    if (this.state.loaded) {
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
                        <MDBBtn
                          className="boutton"
                          rounded
                          size="sm"
                          onClick={() => {
                            this.props.history.push(
                              "/socialHome/" + UserService.getSocietyId()
                            );
                          }}
                        >
                          Gerer
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <br />
              {UserService.getRole() === "ROLE_ADMIN" ? (
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
                          <Link to="/users/stvu">
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
    } else {
      return <Loading />;
    }
  }
}
export default HomeMenu;
