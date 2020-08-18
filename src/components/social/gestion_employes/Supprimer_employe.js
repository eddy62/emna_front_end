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
  MDBRow,
} from "mdbreact";

class SupprimerEmploye extends Component {
  delete = () => {
    const idEmploye = this.props.employe.id;
    console.log(idEmploye);
    const idSociete = UserService.getSocietyId;
    console.log(idSociete);
    const roleUser = UserService.getRole;
    console.log(roleUser);
    if (roleUser === "ROLE_SOCIETY") {
      AxiosCenter.deleteWrapperEmploye(idEmploye)
        .then((response) => {
          console.log(response);
          this.setState({
            modal: !this.state.modal,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("NON AUTORISE !");
    }
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
    const idSociete = UserService.getSocietyId;
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
                Terminer
              </MDBBtn>
              <div onClick={(e) => e.stopPropagation()}>
                <MDBBtn
                  rounded
                  color="teal accent-3"
                  onClick={this.props.confirme}
                  circle="true"
                  size="sm"
                >
                  Supprimer
                </MDBBtn>
              </div>
            </MDBRow>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
export default SupprimerEmploye;
