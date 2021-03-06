import AxiosCenter from "../../../../../../shared/services/AxiosCenter";
import React from "react";
import {Link} from "react-router-dom";
import Loading from "../../../../../../shared/component/Loading";
import UserService from "../../../../../../shared/services/UserService";
import DeletionConfirmationModal from "../../../../../../shared/component/DeletionConfirmationModal";
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer} from "mdbreact";
import RedirectionBtn from "../../../../../../shared/component/buttons/RedirectionBtn";

export default class ListeOperations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      operations: [],
      isReleveUnvalid: false
    };
  }

  componentDidMount() {
    AxiosCenter.getOperationsByReleveId(this.props.releveId)
      .then((res) => {
        const operations = res.data;
        this.setState({ operations} );
      })
      .catch((err) => console.log(err));

      AxiosCenter.getStatementById(this.props.releveId)
      .then((res) => {
        const releve = res.data;
        const isReleveUnvalid = releve.etatReleveId === 1;
        this.setState({ isReleveUnvalid, loaded: true });
      })
      .catch((err) => console.log(err));
  }

  deleteConfirm = (id) => {
    this.deleteOperation(id);
  };

  deleteOperation = (id) => {
    AxiosCenter.deleteOperation(id).then((res) => this.componentDidMount());
  };

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
            { (UserService.isSociety() || UserService.isAdmin()) &&
              props.isReleveUnvalid &&
              <RedirectionBtn
                to={"/editoperation/" + operation.id}
                txt= "Modifier"
                color="default-color"
              />
            }
          </td>
        <td>
          {(UserService.isSociety() || UserService.isAdmin()) &&
          <DeletionConfirmationModal deleteConfirm={() => {
            props.deleteConfirm(operation.id)
          }}/>
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
                  Opérations
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
      return (
        <this.listerLesOperations 
          operations={this.state.operations} 
          deleteConfirm={this.deleteConfirm}
          roleUser={this.state.roleUser}
          isReleveUnvalid={this.state.isReleveUnvalid}
        />
      );  
    } else {
      return <Loading />;
    }
  }
}
