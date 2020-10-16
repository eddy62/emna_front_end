import React, { Component } from 'react';

export default class ProductList extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.productLine.id}</td>
        <td>{this.props.productLine.commentaire}</td>
        <td>{this.props.productLine.quantite}</td>
        <td>{this.props.productLine.remise} %</td>
      </tr>
    );
  }
}