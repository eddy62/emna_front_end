import React, { Component } from 'react';

export default class StatementInvoice extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.facture.numfact}</td>
        <td>{this.props.facture.date}</td>
        <td>{this.props.facture.prixTTC}€</td>
      </tr>
    );
  }
}
