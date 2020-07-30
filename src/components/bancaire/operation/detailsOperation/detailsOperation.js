import React, { Component } from "react";

export default class DetailsOperation extends Component {
  render() {
    return (
      <div className="w-25 border p-4 d-flex flex-column">
        <div>
          <span>Date: {this.props.operation.date} </span>
          <br />
          <span> Libellé: {this.props.operation.description}</span>
          <br />
          <span>Type: {this.props.operation.type}</span>
          <br />
          <span>Rapprocher: {this.props.operation.rapprocher}</span>
          <br />
          <span>Solde: {this.props.operation.solde}€</span>
        </div>
      </div>
    );
  }
}
