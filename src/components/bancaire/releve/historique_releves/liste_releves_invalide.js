import AxiosCenter from "../../../../shared/services/AxiosCenter";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../../../shared/component/Loading";
import ReleveConstants from "../releve_constants"
import UserService from '../../../../shared/services/UserService';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBContainer,
  MDBBtn,
  MDBCol,
} from "mdbreact";
export default class ListeRelevesInvalide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      releves: [],
      societyId: UserService.getSocietyId()
    };
  }
  componentDidMount() {
    AxiosCenter.getReleveByEtatAndSociety(ReleveConstants.RELEVE_ETAT_INVALIDE, this.state.societyId)
      .then((res) => {
        const releves = res.data;
        this.setState({ releves, loaded: true });
      })
      .catch((err) => console.log(err));
  }

  deleteReleve = (id) => {
    AxiosCenter.deleteReleve(id).then((res) => this.componentDidMount());
  };

  listerLesReleves(props) {
    const Releves = props.releves.map((releve, index) => {
      return (
        <tr key={releve.id} className="alert alert-success" role="alert">
          <td> {releve.dateDebut}</td>
          <td>{releve.dateFin}</td>
          <td>{releve.solde}</td>
          <td>{releve.banque}</td>
          <td>
            <Link to={"/detailsreleveinvalide/" + releve.id}>
              {" "}
              voir le détail
            </Link>
          </td>
          <td>
            <button
              //className="btn btn-small btn-danger"
              onClick={() => props.deleteReleve(releve.id)}
            >
              X
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="containerDetailsReleve">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>Relevés en cours</MDBCardTitle>
              <br />
            </MDBCardHeader>
          </div>
          <div></div>
          <div>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
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
      return (
        <this.listerLesReleves
          deleteReleve={this.deleteReleve}
          releves={this.state.releves}
        />
      );
    } else {
      return <Loading />;
    }
  }
}
