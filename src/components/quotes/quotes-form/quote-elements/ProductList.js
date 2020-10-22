import React, { Component } from 'react';

export default class ProductList extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.productLine.referenceProduit}</td>
        <td>{this.props.productLine.nomProduit}</td>
        <td>{this.props.productLine.prixProduit} €</td>
        <td>{this.props.productLine.remise} %</td>
        <td>{this.props.productLine.tvaProduit} %</td>
        <td>{this.props.productLine.quantite}</td>
      </tr>
    );
  }
}