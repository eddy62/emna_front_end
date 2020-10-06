import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import RedirectionBtn from '../../../../shared/component/RedirectionBtn';

export default class QuotationElement extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.quote.numDevis}</td>
        <td>{this.props.quote.dateCreation}</td>
        <td>{this.props.quote.prixTTC} € TTC</td>
        <td>{this.props.quote.clientFournisseurNom}</td>
        <td>
          <Link to={"#"}>
            <em>voir le détail</em>
          </Link>
        </td>
        <td>  
          <RedirectionBtn color="default-color" route="/devis/accueil" msg="Modifier"/>
          <RedirectionBtn color="default-color" route="/devis/accueil" msg="Télécharger"/>
          <RedirectionBtn color="default-color" route="/devis/accueil" msg="Supprimer"/>
        </td>     
      </tr>
    );
  }
}