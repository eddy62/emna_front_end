import React, { Component } from "react";
import "./style2.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import Loading from "../../../shared/component/Loading";
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
  state = {
    modal: false,
    loaded: false,
  };

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
          loaded: true,
        });
        this.props.history.push("/listEmployes/" + UserService.getSocietyId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (!this.state.loaded) return <Loading />;
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
            </MDBRow>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default SupprimerEmploye;
