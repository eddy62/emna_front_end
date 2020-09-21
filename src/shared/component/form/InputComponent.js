import {MDBInput} from "mdbreact";
import React from "react";

/**
 * Composant permettant de traiter les input d'un formulaire
 * Retourne soit le message, soit rien, selon s'il y a une erreur ou non
 *
 * @param error: l'erreur a traité
 * @param {boolean}touched (boolean): permettant de savoir sir le champ a été 'touché' par l'utilisateur ou non.
 * @author Robin De Ruyck
 *
 */
const InputComponent = ({ field, form: { touched, errors }, ...props }) => (
     <div >
        <MDBInput label={props.label} type="text" {...props} className="form-control" {...field} />
    </div>
);

export default InputComponent;