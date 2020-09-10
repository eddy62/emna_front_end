import React, { Component } from "react";

export default class AbsenceComponent extends Component {

    render(){
        console.log(this.props.object);
        return(
            <div>
            <div>AbsenceComponent</div>
            <div>{this.props.object.intitule}</div>
            </div>
        )
    }
}