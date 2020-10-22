import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";

class DeleteProduit extends Component {
    state = {
        modal: false,
        userId: UserService.getUserId(),
        redirect: false

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    supprimerProduit = () => {
        AxiosCenter.deleteProduct(this.props.produit.id, this.state.userId)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong> Le Produit {this.props.produit.nom} a été bien Supprimé</strong>
                    </div>,
                    {position: "top-right"}
                );
                this.setState({
                    modal: !this.state.modal,
                    redirect: true,
                })
            })
            .catch((error) => {
                console.log(error.response);
                toast.error(
                    <div className="text-center">
                        <strong>{error.response.data.title}</strong>
                        <br/>
                    </div>,
                    {position: "top-right"}
                );
            });

    };
    redirection = () => this.setState({redirect: true});

    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggle} rounded color="secondary">Supprimer</MDBBtn>
                <MDBModal isOpen={this.state.modal}>
                    <MDBModalHeader>
                        Confirmation de suppression
                    </MDBModalHeader>
                    <MDBModalBody>
                        Etes-vous certain de vouloir supprimer le Produit {this.props.produit.nom} ?
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn rounded type="button" circle="true" size="sm" onClick={this.toggle}>
                            Annuler
                        </MDBBtn>

                        <MDBBtn rounded color="secondary" onClick={() => this.supprimerProduit()}
                                circle="true" size="sm">
                            Supprimer
                        </MDBBtn>
                        {this.state.redirect && (
                            <Redirect to={"/produits"}/>
                        )}

                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default DeleteProduit;