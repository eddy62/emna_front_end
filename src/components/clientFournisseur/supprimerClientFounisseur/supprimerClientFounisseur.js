import React, { Component } from 'react';
import ReactDom from 'react-dom';
import AxiosCenter from "./../../../shared/services/AxiosCenter";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class SupprimerClientFournisseur extends Component {


    state = {
        modal: false,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    // componentDidMount() {
    //     ReactDom.findDOMNode(this).addEventListener('click', (event) => {
    //         event.stopPropagation();
    //     }, false);
    // }

    supprimerClient = (id) => {
        AxiosCenter.deleteClientFournisseur(id)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggle}>Supprimer</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Confirmation de suppression </MDBModalHeader>
                    <MDBModalBody>
                        <span>Etez-vous certain de vouloir supprimer le client fournisseur {this.props.client.nom}? </span>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="button" color="secondary" onClick={this.toggle}>Annuler</MDBBtn>
                        <div onClick={e => e.stopPropagation()}>
                            <MDBBtn type="button" onClick={this.supprimerClient(this.props.client.id)} >Supprimer</MDBBtn>
                        </div>

                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default SupprimerClientFournisseur;