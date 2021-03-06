import RedirectionBtn from "./RedirectionBtn";
import React from "react";

/**
 * Composant permettant de créer un bouton qui redirige en fonction d'un url
 *
 * @example <BackBtn history={this.props.history}/>
 * @author De Ruyck Robin
 *
 */

const BackBtn = ({history, to, size}) => {
    return (
        <RedirectionBtn
            color="teal lighten-2"
            icon="arrow-left"
            txt="Retour"
            rounded
            size= {size}
            onClick={(history) ? history.goBack : ""}
            to={to}
        />
    )
}

export default BackBtn
