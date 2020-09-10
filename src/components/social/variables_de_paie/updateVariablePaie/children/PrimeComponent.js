import React, { Component } from "react";

export default class PrimeComponent extends Component {

    render(){
        console.log(this.props.object);
        return(
            <div>
            <div>PrimeComponent</div>
            <div>{this.props.object.montant}</div>
            </div>
        )
    }
}