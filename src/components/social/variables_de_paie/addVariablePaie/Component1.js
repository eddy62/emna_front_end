import React from "react";

export default class Component1 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
    return <div>{ this.props.idNameEmploye}, {this.props.yearSelected}, {this.props.monthSelected }</div>
    }
}