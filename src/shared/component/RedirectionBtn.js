import React from "react";
import {MDBBtn, MDBContainer} from 'mdbreact';
import {Link} from "react-router-dom";

/**
 * Composant permettant de créer un bouton qui redirige en fonction d'une url
 * 
 * 
 * @param {string}color     : la couleur du bouton bouton
 * @param {string}msg       : le message à afficher
 * @param {string}route     : l'url de redireection 
 * @example <RedirectionBtn color="default-color" route="/ma/route/id" msg="retour"/> 
 * @author De Ruyck Robin
 * 
 */
const RedirectionBtn = (props) => {
  return (
            <MDBContainer>
            <Link to={ props.route }>
                <MDBBtn color={props.color} {...props.rest}>
                    {props.msg}
                </MDBBtn>
            </Link>
        </MDBContainer>
  );
};

export default RedirectionBtn;
