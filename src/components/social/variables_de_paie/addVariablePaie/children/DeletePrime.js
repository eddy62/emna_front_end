import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";

class DeletePrime extends Component {
    constructor(props) {
        super(props);
        this.state = {

            modalDeletePrime: false,
        }
    }

    toggleDeletePrime = () => {
        this.setState({
            modalDeletePrime: !this.state.modalDeletePrime
        });
    }

    supprimerPrime = () => {
        AxiosCenter.deletePrime(this.props.prime.id)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong> La prime {this.props.prime.id} a été bien supprimé</strong>
                    </div>,
                    { position: "top-right" }
                );
                this.setState({
                    modalDeletePrime: !this.state.modalDeletePrime,
                    redirect: true,
                })
            })
            .catch((error) => {
                console.log(error);
                toast.error(
                    <div className="text-center">
                        <strong>Erreur lors la suppression &nbsp;&nbsp;!</strong>
                        <br />
                    </div>,
                    { position: "top-right" }
                );
            });

    };
    redirection = () => this.setState({ redirect: true });

    componentDidMount() {

    }

    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggleDeletePrime}>Delete</MDBBtn>
                <MDBModal isOpen={this.state.modalDeletePrime} toggle={this.toggleDeletePrime} size="lg">
                    <MDBModalHeader color="default-color" toggle={this.toggleDeletePrime}>
                        Suppression
                    </MDBModalHeader>

                    <MDBModalBody>
                        Etes-vous certain de vouloir supprimer cette prime?
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn rounded type="button" circle="true" size="sm" onClick={this.toggleDeletePrime}>Annuler</MDBBtn>

                        <MDBBtn rounded toggle={this.toggleDeletePrime} color="secondary" onClick={() => this.supprimerPrime()} circle="true" size="sm" >
                            Supprimer</MDBBtn>
                        {this.state.redirect && (
                            <Redirect to={"/primes"} />
                        )}

                    </MDBModalFooter>
                </MDBModal>


            </MDBContainer>
        )
    }

}
export default DeletePrime;