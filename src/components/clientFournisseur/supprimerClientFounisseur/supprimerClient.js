import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";

class SupprimerClient extends Component {
  state = {
    modal: false,
    userId: UserService.getUserId(),

  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  supprimerProduit = () => {
    AxiosCenter.deleteClientFournisseur(this.props.client.id, this.state.userId)
      .then((response) => {
        const resultat = response.data;
        this.toggle()
        this.setState()
        this.props.history.push("/clientFournisseur/liste");
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle} rounded size="sm" color="secondary">Supprimer</MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Confirmation de suppression
</MDBModalHeader>
          <MDBModalBody>
            Etes-vous certain de vouloir supprimer le client {this.props.client.nom} ?
        </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn rounded type="button" circle="true" size="sm" onClick={this.toggle}>Annuler</MDBBtn>
            <MDBBtn rounded toggle={this.toggle} color="secondary" onClick={() => this.supprimerProduit()} circle="true" size="sm" >
              Supprimer</MDBBtn>

          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default SupprimerClient;