import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBModal, MDBModalFooter, MDBModalHeader} from 'mdbreact';

export default class DeletionConfirmationModal extends Component {

state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn color="default-color" onClick={this.toggle}>Supprimer</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Confirmer la suppression ?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Annuler</MDBBtn>
          <MDBBtn color="primary" onClick={this.props.deleteOperation}>Confirmer</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}
