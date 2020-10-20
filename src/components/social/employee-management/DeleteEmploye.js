import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import * as dateFns from "date-fns";
import "./gestionEmploye.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import {MDBBtn, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow,} from "mdbreact";
import NotificationService from "../../../shared/services/NotificationService";

class DeleteEmploye extends Component {
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
    const entityName = "Employé(e)"

    const idEmploye = this.props.employe.id;
    console.log(idEmploye);
    const { employe } = this.props;
    const diff = dateFns.differenceInCalendarYears(
      new Date(),
      new Date(employe.dateSortie)
    );
    console.log(diff);

    AxiosCenter.deleteWrapperEmployee(idEmploye)
      .then((response) => {
        console.log(response);
        const resultat = response.data;
        if (resultat) {
          NotificationService.successDeletion(entityName);
        } else {
          toast.error(
            <div className="text-center">
              <strong>Employé NON Supprimé !</strong>
              <br />
              <small>
                Le temps d'archivage est de {diff} ans.
                <br />
                (minimum 5 ans)
              </small>
            </div>,
          );
        }
        this.setState({
          modal: !this.state.modal,
          redirect: true,
        });
      })
      .catch((error) => {
        console.log(error);
        NotificationService.failedDeletion(entityName);
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
            <p>Supprimer l'Employé et toutes ses données?</p>
            <span className="gras">ATTENTION,</span>
            <br />
            <span className="gras">LA SUPPRESSION EST IRREVERSIBLE !</span>
            <br />
            <small>
              (L'Employé doit avoir été archivé depuis au moins 5 ans)
            </small>
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

export default DeleteEmploye;
