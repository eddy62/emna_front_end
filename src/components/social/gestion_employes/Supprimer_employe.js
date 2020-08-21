import React, { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./style2.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
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

class SupprimerEmploye extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      modal: false,
      societeId: UserService.getSocietyId(),
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  delete = () => {
    const idEmploye = this.props.employe.id;
    console.log(idEmploye);

    AxiosCenter.deleteWrapperEmploye(idEmploye)
      .then((response) => {
        console.log(response);
        this.setState({
          modal: !this.state.modal,
          redirect: true,
        });
      })
      .catch((error) => {
        console.log(error);
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
          Supprimer
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>
            <MDBIcon icon="exclamation-triangle" color="red" />
          </MDBModalHeader>
          <MDBModalBody>
            <span>Voulez-vous supprimer l'Employé ?</span>
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
                onClick={this.delete}
                circle="true"
                size="sm"
              >
                Supprimer
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

export default SupprimerEmploye;
