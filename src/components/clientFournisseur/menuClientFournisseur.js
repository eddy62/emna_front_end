import React, { Component } from "react";
import { Link } from "react-router-dom";
import Style from './ClientFournisseur.module.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBBtn, MDBContainer, MDBRow,
  MDBCol
} from "mdbreact";




class MenuClientFournisseur extends Component {


  render() {
    return (


      <div className="justify-content-center align-items-center container-fluid p-5 ">
        <div className="justify-content-center align-items-center container-fluid p-5 ">
          <MDBContainer>
            <div className="justify-content-center align-items-center container-fluid p-5 ">
              <MDBCardHeader color="default-color">
                <MDBCardTitle tag="h2">Recherchez parmi toutes les entreprises</MDBCardTitle>

                <br></br>
                <div className="justify-content-center container-fluid align-items-center">
                  <form class="form-inline ">
                    <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Qui? Ou?"
                      aria-label="Search" />
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </form>
                </div>

              </MDBCardHeader>
            </div>
            <div>
              <br></br>
            </div>
            <div className="justify-content-center align-items-center">
              <MDBRow>
                <MDBCol>
                  <MDBCard >
                    <MDBCardBody>
                      <MDBCardTitle tag="h4">Lister mes associes</MDBCardTitle>
                      <br />
                      <MDBCardText>
                        Consultation et Modification des données
                        des mes associes
                      </MDBCardText>
                      <br />
                      <div>
                        <Link to="/clientFournisseur/liste">
                          <MDBBtn rounded size="lg" color="teal accent-3">
                            Voir
                          </MDBBtn>
                        </Link>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard >
                    <MDBCardBody>
                      <MDBCardTitle tag="h4">Ajouter un nouveau client founisseur</MDBCardTitle>
                      <br />
                      <MDBCardText>
                        Enregistrement des données des mes associes
                      </MDBCardText>
                      <br />
                      <div className="boutton">
                        <Link to="/clientFournisseur/creer">
                          <MDBBtn color="teal accent-3" rounded size="lg">
                            +Ajouter
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
      </div>


    );
  }
}

export default MenuClientFournisseur;
