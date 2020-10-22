import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AxiosCenter from '../../../../shared/services/AxiosCenter';
import QuoteFormCreate from '../QuoteFormCreate';

export default class QuoteCreate extends Component {

  createQuote = (values, actions) => {
    AxiosCenter.createQuote(values)
      .then((response) => {
        toast.success(
          <div className="text-center">
            <strong>
              Votre devis a été créé.
            </strong>
          </div>,
          {position: "top-right"}
      );
        this.props.history.push("/devis/accueil")
        console.log(values)
    })
    .catch((error) => {
      console.log(error);
    })
  };

  render(){
    return <QuoteFormCreate title="Creation Devis" quote={{}} onSubmit={this.createQuote} /> 
  }
}