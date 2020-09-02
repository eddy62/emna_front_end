import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import * as dateFns from "date-fns";
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
    const { employe } = this.props;
    const diff = dateFns.differenceInCalendarYears(
      new Date(),
      new Date(employe.dateSortie)
    );
    console.log(diff);

    AxiosCenter.deleteWrapperEmploye(idEmploye)
      .then((response) => {
        console.log(response);
        const resultat = response.data;
        if (resultat) {
          toast.success(
            <div className="text-center">
              <strong>Employé Supprimé &nbsp;&nbsp;!"</strong>
            </div>,
            { position: "top-right" }
          );
        } else {
          toast.error(
            <div className="text-center">
              <strong>Employé NON Supprimé &nbsp;&nbsp;!</strong>
              <br />
              <small>
                Le temps d'archivage est de {diff} &nbsp;ans.
                <br />
                (minimum 5 ans)
              </small>
            </div>,
            { position: "top-right" }
          );
        }
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
            <MDBIcon icon="exclamation-triangle" className="attention" />
          </MDBModalHeader>
          <MDBModalBody>
            <p>Voulez-vous supprimer l'Employé et toutes ses données?</p>
            <span className="gras">
              Attention, la suppression est IRREVERSIBLE !
            </span>
            <p>(L'Employé doit avoir été archivé depuis au moins 5 ans)</p>
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
