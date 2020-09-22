import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBModal, MDBModalFooter, MDBModalHeader} from 'mdbreact';

/**
 * Composant permettant de supprimer un élément via une modal de confirmation
 * 
 * @param deleteConfirm : Appelle la méthode de suppression propre à l'élément à supprimer
 * @param name : affiche le nom de l'élément a supprimer
 * @param id : id de l'élément à supprimer
 * @example <DeletionConfirmationModal deleteConfirm={() => {
              this.deleteConfirm(clause.id)
            }}/>

            deleteConfirm = (id) => {
              this.deleteClause(id);
            };         

            deleteClause = (id) => {
              AxiosCenter.deleteClause(id).then((res) => this.componentDidMount());
            }          
 * @author Jeremy Dumas
 * 
 */
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
        <MDBModalHeader toggle={this.toggle}>Confirmer la suppression {this.props.name} ?</MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Annuler</MDBBtn>
          <MDBBtn color="primary" onClick={this.props.deleteConfirm}>Confirmer</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}
