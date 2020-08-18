import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import AxiosCenter from "../../../shared/services/AxiosCenter";

class DeleteProduit extends Component {
    state = {
        modal: false,

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    supprimerProduit = () => {
        AxiosCenter.deleteProduit(this.props.produit.id)
            .then((response) => {
                console.log(response.data)
                this.toggle();
                this.props.history.push("/produits");


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
                        Etes-vous certain de vouloir supprimer le Produit {this.props.produit.nom} ?
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

export default DeleteProduit;