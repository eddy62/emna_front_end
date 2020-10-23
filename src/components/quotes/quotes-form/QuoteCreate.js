import React, {Component} from 'react';
import AxiosCenter from '../../../shared/services/AxiosCenter';
import QuoteForm from './QuoteForm';

export default class QuoteCreate extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false
    }
  }

  createQuote = (values, actions) => {
    AxiosCenter.createQuote(values)
      .then((response) => {
        this.props.history.push("/devis/accueil")
    })
    .catch((error) => {
      console.log(error);
    })
  };

  render() {
    return <QuoteForm title="Creation Devis" quote={{}} onSubmit={this.createQuote} /> 
  }
}