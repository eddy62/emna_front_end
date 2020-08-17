import React, { Component } from "react";
import AxiosCenter from "../../../../../../shared/services/AxiosCenter";
import { Link } from "react-router-dom";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBContainer,
  MDBBtn,
  MDBCol,
} from "mdbreact";
export default class DetailsOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      operation: [],
    };
  }
  componentDidMount() {
    AxiosCenter.getOperationById(this.props.match.params.id)
      .then((res) => {
        const operation = res.data;
        this.setState({
          operation,
          operationId: this.props.match.params.id,
          loaded: true,
        });
      })
      .catch((err) => console.log(err));
  }
  detailsOperation = (props) => {
    return (
      <div className="containerDetailsReleve">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>
                <h1>Détail de votre opération</h1>
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
                            Opération bancaire du:
                            {props.detailsoperation.date}
                          </p>
                        </div>
                        <div className="col-6"></div>
                        <div className="col-3">
                          <p>
                            {" "}
                            {props.detailsoperation.type} de{" "}
                            {props.detailsoperation.solde}€
                          </p>
                        </div>
                      </div>
                      <p>
                        Libellé: {props.detailsoperation.description}
                        Rapprocher: {props.detailsoperation.rapprocher}
                      </p>
                    </div>
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <br />
          </div>
          <Link to={"/detailsreleve/" + 1}>
            <MDBBtn
              className="boutton"
              color=" teal lighten-2"
              rounded
              size="sm"
            >
              <span id="color-button"> Retour</span>
            </MDBBtn>
          </Link>
        </MDBContainer>
      </div>
    );
  };
  render() {
    return <this.detailsOperation detailsoperation={this.state.operation} />;
  }
}
