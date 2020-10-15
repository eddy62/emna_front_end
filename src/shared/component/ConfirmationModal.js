import React, {useState} from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

/**
 * Composant permettant de créer une modale sur un bouton et de lui attribuer une action
 * @param title message a afficher
 * @param action action effectuer après avoir cliquer sur le bouton valider
 * @param name nom du bouton a afficher
 * @param color couleur du bouton
 * @param rounded permet l'arrondi du bouton
 * @param size déffinit sa taille
 * @author TALLA Brahim
 * @constructor
 */

const ConfirmationModal =
    ({title,action, name, color, rounded, size }) => {
       const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="d-inline-block">
                <MDBBtn onClick={() => setIsOpen(true)}
                        color={color}
                        rounded={rounded}
                        size={size}>
                    {name}
                </MDBBtn>
                <MDBModal isOpen={isOpen}>
                    <MDBModalHeader>{title}</MDBModalHeader>
                    <MDBModalBody>
                    {/*    texte optionnel*/}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={() => setIsOpen(false)}>Annuler</MDBBtn>
                        <MDBBtn color="primary" onClick={ ()=> {action(); setIsOpen(false)}}>Confirmer</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }


export default ConfirmationModal;