import React, { Component } from "react";

export default class NoteDeFraisComponent extends Component {

    render(){
        console.log(this.props.object);
        return(
            <div>
            <div>NoteDeFraisComponent</div>
            <div>{this.props.object.montant}</div>
            </div>
        )
    }
}