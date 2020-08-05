import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Style from './ClientFournisseur.module.css'
import { Link } from "react-router-dom";


class DetailsClientFournisseur extends Component {

    state = {
        modal6: false,
        modal7: false
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }


    render() {
        return (
            <MDBContainer>
                <MDBBtn className={Style.button1} onClick={this.toggle(6)}>Details</MDBBtn>
                <MDBModal isOpen={this.state.modal6} toggle={this.toggle(6)} side position="top-right">
                    <MDBModalHeader toggle={this.toggle(6)}>Présentation de la société</MDBModalHeader>
                    <MDBModalBody>
                        <div className={Style.container}>
                            <p>Details:</p>
                            <dl>
                                <dt>Raison sociale</dt>
                                <dd>{this.props.client.nom}.</dd>
                                <dt>SIREN</dt>
                                <dd>{this.props.client.siren}.</dd>
                                <dt>Email</dt>
                                <dd>{this.props.client.email}.</dd>
                                <dt>Téléphone</dt>
                                <dd>{this.props.client.telephone}.</dd>
                                <dt>Adresse</dt>
                                <dd>{this.props.client.numeroRue + " "}{this.props.client.nomRue + "  "}{this.props.client.codePostal + " "}{this.props.client.ville}.</dd>
                            </dl>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="dark" size="sm" onClick={this.toggle(6)}>Fermer</MDBBtn>
                        <Link to={`/clientFournisseur/modifier/${this.props.client.id}`} >
                            <MDBBtn color="primary" size="sm">
                                <span className="d-none d-md-inline">
                                    Modifier </span>
                            </MDBBtn>
                        </Link>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default DetailsClientFournisseur;