import React, { Component } from 'react';
export default class DetailClientFournisseur extends Component{
    render() {
        return(
        <div className="w-25 border p-4  d-flex flex-column">
          <h5> {this.props.client.nom}</h5>
          <hr className ="w-100"/>
          <span className="text-secondary">{this.props.cleint.siren}</span>
          <hr className="w-100"/>
          <span>{this.props.client.email}</span>
        </div>
        ) ;
      }
    }