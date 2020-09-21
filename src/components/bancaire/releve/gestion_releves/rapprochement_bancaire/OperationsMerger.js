import React, {Component} from 'react';
import {MDBInput, MDBBtn, MDBCardTitle} from 'mdbreact';

class OperationsMerger extends Component{
    render() {
        return (
            <div>
                <MDBInput label="Numéro de facture" />
                <MDBBtn color=" teal lighten-2" rounded size="sm">
                    <span id="color-button">Ajouter</span>
                </MDBBtn>
            </div>
        );
    }
}

export default OperationsMerger;