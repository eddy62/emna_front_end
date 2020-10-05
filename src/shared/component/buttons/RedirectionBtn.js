import React from "react";
import {MDBBtn, MDBIcon} from 'mdbreact';

/**
 * Composant permettant de créer un bouton qui redirige en fonction d'un url
 *
 * @param {string}txt : le message à afficher
 * @param {string}to  : l'url de redirection
 *  etc...
 * @example <RedirectionBtn color="default-color" to="/ma/route/id" txt="Retour"/>
 * @author De Ruyck Robin
 *
 */

const RedirectionBtn =
    ({
         active,
         color,
         disabled,
         flat,
         floating,
         gradient,
         icon,
         iconR,
         outline,
         rounded,
         onClick,
         size,
         to,
         txt
     }) => {

        return (
                <MDBBtn
                    color={color}
                    href={to}
                    gradient={gradient}
                    rounded={rounded}
                    outline={outline}
                    floating={floating}
                    size={size}
                    flat={flat}
                    active={active}
                    disabled={disabled}
                    onClick={onClick}
                >
                    {icon && !iconR && <MDBIcon icon={icon}/>}
                    {txt ? ` ${txt} ` : ""}
                    {icon && iconR && <MDBIcon icon={icon}/>}
                </MDBBtn>
        );
    }

export default RedirectionBtn;
