import React, { Component } from 'react';
import Style from './ClientFournisseur.module.css'
export default class DetailClientFournisseur extends Component {
  render() {
    return (

      <div className={Style.container}>

        <p>Présentation de la société:</p>
        <dl>
          <dt>Dénomination</dt>
          <dd>{this.props.client.nom}.</dd>

          <dt>SIREN</dt>
          <dd>{this.props.client.siren}.</dd>
          <dt>Email</dt>
          <dd>{this.props.client.email}.</dd>
          <dt>Téléphone</dt>
          <dd>{this.props.client.telephone}.</dd>

          <dt>Adresse</dt>
          <dd>{this.props.client.numeroRue + " "}{this.props.client.nomRue + "  "}{this.props.client.codePostal + " "}{this.props.client.ville}.</dd>
        </dl>
      </div>

    );
  }
}