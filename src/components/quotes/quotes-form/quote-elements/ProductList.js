import React, { Component } from 'react';

export default class ProductList extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.productLine.reference}</td>
        <td>{this.props.productLine.nom}</td>
        <td>{this.props.productLine.tva} %</td>
        <td>{this.props.productLine.prix}</td>
      </tr>
    );
  }
}