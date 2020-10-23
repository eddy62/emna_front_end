import React, {Component} from 'react';
import RedirectionBtn from '../../../../shared/component/buttons/RedirectionBtn';

export default class QuotationElement extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.quote.numDevis}</td>
        <td>{this.props.quote.dateCreation}</td>
        <td>{this.props.quote.prixTTC} € TTC</td>
        <td>{this.props.quote.clientFournisseurNom}</td>
        <td>
            <RedirectionBtn color="default-color"
                            to={"/devis/details/" + this.props.quote.id}
                            txt="Details"
                            size="sm"
            />
        </td>
        <td>  
          <RedirectionBtn color="default-color" to={"/devis/modifier/" + this.props.quote.id} txt="Modifier" size="sm"/>
          <RedirectionBtn color="default-color" to="/devis/accueil" txt="Télécharger" size="sm"/>
          <RedirectionBtn color="default-color" to="/devis/accueil" txt="Supprimer" size="sm"/>
        </td>
      </tr>
    );
  }
}