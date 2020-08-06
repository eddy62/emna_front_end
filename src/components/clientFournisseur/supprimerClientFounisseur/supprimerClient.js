import React, { Component } from 'react';
import AxiosCenter from "../../../shared/services/AxiosCenter";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';



class SupprimerClient extends Component {


    supprimerClient = () => {
        AxiosCenter.deleteClientFournisseur(this.props.client.id)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <div>
                <ModalPage suppressionConfirme={this.supprimerClient} />
            </div>

        )
    }

}

class ModalPage extends Component {

    state = {
        modal: false,
        client: this.props.client
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal

        });
    }
    render() {
        return (
            <MDBContainer>
                <MDBBtn color="secondary" circle="true" size="sm" onClick={this.toggle}>Supprimer</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Confirmation de suppression </MDBModalHeader>
                    <MDBModalBody>
                        <span>Etez-vous certain de vouloir supprimer le client fournisseur?? </span>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="button" circle="true" size="sm" onClick={this.toggle}>Annuler</MDBBtn>
                        <div onClick={e => e.stopPropagation()}>
                            <MDBBtn toggle={this.toggle} color="secondary" onClick={this.props.suppressionConfirme} circle="true" size="sm" >
                                Supprimer</MDBBtn>
                        </div>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }

}
export default SupprimerClient;