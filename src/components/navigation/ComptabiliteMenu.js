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

class ComptabiliteMenu extends React.Component {

  componentDidMount() {
    this.backListener = this.props.history.listen(location => {
      console.log(location)
    });
  }

  render() {
    const title = "Espace Comptabilité";
    const title2 = "Facture";
    const title3 = "Devis";
    const title4 = "Relevé Bancaire";
    

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
                    <MDBCardText>
                      Accéder à toutes mes factures d'achats ou de vente
                    </MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/accueilfactures">
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
                    <MDBCardText>Accéder à mes devis</MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/devis">
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
                    <MDBCardText>
                      Accéder à la gestion de mes relevés bancaires
                    </MDBCardText>
                    <br />
                    <div className="boutton">
                      <Link to="/bancaire">
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
export default ComptabiliteMenu;
