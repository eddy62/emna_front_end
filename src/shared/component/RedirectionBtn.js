import React from "react";
import {MDBBtn} from 'mdbreact';
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
            <Link to={ props.route }>
                <MDBBtn size="sm" color={props.color} {...props.rest}>
                    {props.msg}
                </MDBBtn>
            </Link>
  );
};

export default RedirectionBtn;
