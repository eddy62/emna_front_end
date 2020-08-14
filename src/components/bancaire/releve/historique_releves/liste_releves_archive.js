import AxiosCenter from "../../../../shared/services/AxiosCenter";
import React from "react";
import { Link } from "react-router-dom";
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
export default class ListeRelevesArchives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      releves: [],
    };
  }

  componentDidMount() {
    AxiosCenter.getReleveByEtatAndSociety(3, 3)
      .then((res) => {
        const releves = res.data;
        this.setState({ releves, loaded: true });
      })
      .catch((err) => console.log(err));
  }

  listerLesReleves(props) {
    const Releves = props.releves.map((releve, index) => {
      return (
        <tr key={releve.id} className="alert alert-success" role="alert">
          <td> {releve.dateDebut}</td>
          <td>{releve.dateFin}</td>
          <td>{releve.solde}</td>
          <td>{releve.banque}</td>
          <td>
            <Link to={"/detailsreleve/" + releve.id}> voir le détail</Link>
          </td>
        </tr>
      );
    });

    return (
      <div className="containerDetailsReleve">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>
                <h1>Historique de vos relevés bancaire</h1>
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
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Date de création</th>
                            <th scope="col">Date de fin</th>
                            <th scope="col">Solde</th>
                            <th scope="col">Banque</th>
                          </tr>
                        </thead>
                        <tbody>{Releves}</tbody>
                      </table>

                      <p>
                        <Link to={"/menureleve"}>
                          {" "}
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
  }

  render() {
    if (this.state.loaded) {
      return <this.listerLesReleves releves={this.state.releves} />;
    } else {
      return <Loading />;
    }
  }
}
