import React from "react";
import { Link } from "react-router-dom";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import ListeOperations from "./operation/liste_operations/liste_operations";
import Loading from "../../../../shared/component/Loading";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBContainer,
  MDBBtn,
  MDBCol,
} from "mdbreact";
export class ReleveEnCours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      releve: [],
    };
  }
  componentDidMount() {
    AxiosCenter.getReleveById(1)
      .then((res) => {
        const releve = res.data;
        this.setState({
          releve,
          releveId: this.props.match.params.id,
          loaded: true,
        });
      })
      .catch((err) => console.log(err));
  }

  detailsReleve = (props) => {
    return (
      <div className="containerDetailsReleve">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>
                <h1>Détail de votre relevé</h1>
                <h3>Ce relevé intègre les opérations comptabilisées</h3>
              </MDBCardTitle>
              <br />
            </MDBCardHeader>
          </div>
          <div>
            <hr></hr>
          </div>
          <div>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="MDBCardTitle">
                    <div>
                      <div className="row">
                        <div className="col-3">
                          <p>
                            Relevé bancaire:
                            <br />
                            du {props.detailsreleve.dateDebut}
                            <br />
                            au {props.detailsreleve.dateFin}{" "}
                          </p>
                        </div>
                        <div className="col-6"></div>
                        <div className="col-3">
                          Information de la banque :{" "}
                          {props.detailsreleve.banque}
                        </div>
                      </div>
                      <p>
                        Solde du compte pour ce mois :{" "}
                        {props.detailsreleve.solde} €
                      </p>
                    </div>
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <br />
          </div>
        </MDBContainer>
      </div>
    );
  };
  render() {
    if (this.state.loaded) {
      return (
        <div>
          <MDBContainer>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="MDBCardTitle">
                    <div>
                      <this.detailsReleve detailsreleve={this.state.releve} />
                    </div>
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6">
                        {" "}
                        <ListeOperations
                          operations={this.state.operations}
                          releveId={this.state.releveId}
                        />
                      </div>
                      <div className="col-3"></div>
                    </div>
                    <div className="row">
                      <p>
                        <Link to={"/bancaire"}>
                          <MDBBtn
                            className="boutton"
                            color=" teal lighten-2"
                            rounded
                            size="sm"
                          >
                            <span id="color-button"> Retour</span>
                          </MDBBtn>
                        </Link>
                      </p>
                      <p>
                        <Link to={"/creationoperation"}>
                          <MDBBtn
                            className="boutton"
                            color=" teal lighten-2"
                            rounded
                            size="sm"
                          >
                            <span id="color-button">
                              {" "}
                              Ajouter une opération
                            </span>
                          </MDBBtn>
                        </Link>
                      </p>
                    </div>
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBContainer>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
export default ReleveEnCours;
