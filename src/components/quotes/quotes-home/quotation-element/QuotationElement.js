import { id } from 'date-fns/locale';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RedirectionBtn from '../../../../shared/component/buttons/RedirectionBtn';
import ConfirmationModal from '../../../../shared/component/ConfirmationModal';
import AxiosCenter from '../../../../shared/services/AxiosCenter';
import QuoteService from '../../QuotesService';

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
      <tr class={this.props.quote.etat==="Signé"?"signe": this.props.quote.etat==="Archivé"?"archive":"non-signe"}>
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
          <RedirectionBtn 
            to={"/devis/modifier/" + this.props.quote.id} 
            txt="Modifier" 
            color="light-blue lighten-3" 
            size="sm"
          />
          <RedirectionBtn color="teal lighten" route="/devis/accueil" txt="Télécharger" size="sm"/>
          <RedirectionBtn color="red darken" onClick={() => this.deleteQuote(this.props.quote)} route="/devis/accueil" txt="Supprimer"size="sm"/>
          {this.props.quote.etat==="En attente de signature"?"":
          <ConfirmationModal 
          icon="archive"
          text= {this.props.quote.etat==="Signé"?"Voulez-vous archivez ce devis ?":"Voulez-vous désarchivez ce devis ?"}
          title={this.props.quote.etat==="Signé"?"Archiver Devis":"Désarchiver Devis"}
          action={()=>QuoteService.updateState(this.props.quote.id,this.props.quote.etat ,this.props.reload)}
          
          color ={this.props.quote.etat==="Signé"?"green darken":"red darken"}
          ronded="true" 
          size="sm" ></ConfirmationModal>}
        </td>     
      </tr>
    );
  }
}

