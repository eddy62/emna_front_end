import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style2.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBIcon,
  MDBModalFooter,
  MDBRow,
} from "mdbreact";

class ArchiverEmploye extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      modal: false,
      societeId: UserService.getSocietyId(),
      employe: {},
      load: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  archive = () => {
    const employe = this.props.employe;
    console.log(employe);
    AxiosCenter.archiveWrapperEmploye(employe)
      .then((response) => {
        console.log(response);
        toast.success(
          <div className="text-center">
            <strong>Employé Archivé &nbsp;&nbsp;!</strong>
          </div>,
          { position: "top-right" }
        );
        this.setState({
          modal: !this.state.modal,
          redirect: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          <div className="text-center">
            <strong>Employé NON Archivé &nbsp;&nbsp;!</strong>
          </div>,
          { position: "top-right" }
        );
      });
  };

  redirection = () => this.setState({ redirect: true });

  render() {
    const societeId = this.state.societeId;

    return (
      <MDBContainer>
        <MDBBtn
          color="teal accent-3"
          rounded
          circle="true"
          size="sm"
          onClick={this.toggle}
        >
          Archiver
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <div className="align-self-center">
            <MDBModalHeader toggle={this.toggle}>
              <MDBIcon
                icon="exclamation-triangle"
                className="attention"
                size="2x"
              />
            </MDBModalHeader>
          </div>
          <MDBModalBody>
            <p className="p">Voulez-vous archiver l'Employé ?</p>
            <span className="gras">ATTENTION, </span>
            <br />
            <span className="gras">
              L'Employé ne sera plus dans l'effectif de la Société !
            </span>
            <br />
            <small>(Les données seront archivées pendant 5 ans)</small>
          </MDBModalBody>
          <MDBModalFooter between around>
            <MDBRow>
              <MDBBtn
                rounded
                type="button"
                circle="true"
                size="sm"
                color="teal accent-3"
                onClick={this.toggle}
              >
                Annuler
              </MDBBtn>
              <MDBBtn
                rounded
                toggle={this.toggle}
                color="teal accent-3"
                onClick={this.archive}
                circle="true"
                size="sm"
              >
                Archiver
              </MDBBtn>
              {this.state.redirect && (
                <Redirect to={"/listEmployes/" + societeId} />
              )}
            </MDBRow>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ArchiverEmploye;
