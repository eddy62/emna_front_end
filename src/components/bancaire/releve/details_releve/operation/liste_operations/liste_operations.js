import AxiosCenter from "../../../../../../shared/services/AxiosCenter";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../../../../../shared/component/Loading";
import UserService from "../../../../../../shared/services/UserService";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer,
  MDBCol,
} from "mdbreact";

export default class ListeOperations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      operations: [],
      roleUser: UserService.getRole(),
      isReleveUnvalid: false
    };
  }

  componentDidMount() {
    AxiosCenter.getOperationByReleveId(this.props.releveId)
      .then((res) => {
        const operations = res.data;
        this.setState({ operations, loaded: true });
      })
      .catch((err) => console.log(err));

      AxiosCenter.getReleveById(this.props.releveId)
      .then((res) => {
        const releve = res.data;
        const isReleveUnvalid = releve.etatReleveId !== 2;
        this.setState({ isReleveUnvalid, loaded: true });
      })
      .catch((err) => console.log(err));
  }

  listerLesOperations(props) {
    const Operations = props.operations.map((operation,index) => {
      return (
        <tr key={operation.id} className="alert alert-success" role="alert">
          <td> {operation.date}</td>
          <td> {operation.description} </td>
          <td> {operation.type}</td>
          <td> {operation.solde}</td>
          <td>
            <Link to={"/detailsoperation/" + operation.id}>
              {" "}
              voir le détail
            </Link>
          </td>
            <td>
              { (props.roleUser === "ROLE_SOCIETY" || props.roleUser === "ROLE_ADMIN") &&
                !props.isReleveUnvalid &&
                <Link to={  "/editoperation/" + operation.id}>
                  {" "}
                  Modifier
                </Link>
              }
            </td>
        </tr>
      );
    });

    return (
      <MDBContainer>
        <div>
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle className="MDBCardTitle">
                  <h1>Opérations</h1>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Solde</th>
                      </tr>
                    </thead>
                    <tbody>{Operations}</tbody>
                  </table>
                </MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </div>
      </MDBContainer>
    );
  }

  render() {
    if (this.state.loaded) {
      return <this.listerLesOperations operations={this.state.operations} roleUser={this.state.roleUser}/>;
    } else {
      return <Loading />;
    }
  }
}
