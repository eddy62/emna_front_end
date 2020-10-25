import { id } from 'date-fns/locale';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RedirectionBtn from '../../../../shared/component/buttons/RedirectionBtn';
import AxiosCenter from '../../../../shared/services/AxiosCenter';

export default class QuotationElement extends Component {
  deleteQuote = (quote) => {
    this.props.delete(quote)
    AxiosCenter.deleteQuoteById(quote.id)
      .then((response) => {
        toast.success(
          <div className="text-center">
            <strong> Le Devis a été bien Supprimé</strong>
          </div>,
          { position: "top-right" }
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          <div className="text-center">
            <strong>Erreur lors la suppression du devis !</strong>
            <br />
          </div>,
          { position: "top-right" }
        );
      });
  }
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
          <RedirectionBtn
            to={"/devis/modifier/" + this.props.quote.id}
            txt="Modifier"
            color="default-color"
            size="sm"
          />
          <RedirectionBtn color="default-color" route="/devis/accueil" txt="Télécharger" size="sm" />
          <RedirectionBtn color="default-color" onClick={() => this.deleteQuote(this.props.quote)} route="/devis/accueil" txt="Supprimer" size="sm" />
        </td>
      </tr>
    );
  }
}