import React, {useState} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const ConfirmationModal =
    ({title,action,txt }) => {
       const [isOpen, setIsOpen] = useState(false);

        return (
            <MDBContainer>
                <MDBBtn onClick={() => setIsOpen(true)}>{txt}</MDBBtn>
                <MDBModal isOpen={isOpen}>
                    <MDBModalHeader>{title}</MDBModalHeader>
                    <MDBModalBody>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={() => setIsOpen(false)}>Annuler</MDBBtn>
                        <MDBBtn color="primary" onClick={ ()=> {action(); setIsOpen(false)}}>Confirmer</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }


export default ConfirmationModal;