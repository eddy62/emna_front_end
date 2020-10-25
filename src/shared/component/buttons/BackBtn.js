import RedirectionBtn from "./RedirectionBtn";
import React from "react";

/**
 * Composant permettant de créer un bouton qui redirige en fonction d'un url
 *
 * @example <BackBtn history={this.props.history}/>
 * @author De Ruyck Robin
 *
 */

const BackBtn = ({history, size}) => {
    return (
        <RedirectionBtn
            color="teal"
            icon="arrow-left"
            txt="Retour"
            rounded
            size= {size}
            onClick={history.goBack}
        />
    )
}

export default BackBtn
