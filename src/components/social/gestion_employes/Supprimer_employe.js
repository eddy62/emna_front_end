import React, { Component } from "react";
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
} from "mdbreact";

class SupprimerEmploye extends Component {
  delete = () => {
    const idEmploye = this.props.employe.id;
    console.log(idEmploye);
    const idSociete = UserService.getSocietyId;
    console.log(idSociete);
    AxiosCenter.deleteWrapperEmploye(idEmploye)
      .then((response) => {
        console.log(response);
        this.props.history.push("/listEmployes/" + idSociete);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <ModalPage confirme={this.delete} />
      </div>
    );
  }
}

class ModalPage extends Component {
  state = {
    modal: false,
    employe: this.props.employe,
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
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
          <MDBModalFooter>
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
            <div onClick={(e) => e.stopPropagation()}>
              <MDBBtn
                rounded
                toggle={this.toggle}
                color="teal accent-3"
                onClick={this.props.confirme}
                circle="true"
                size="sm"
              >
                Supprimer
              </MDBBtn>
            </div>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
export default SupprimerEmploye;
