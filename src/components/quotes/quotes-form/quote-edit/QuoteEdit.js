import React, { Component } from 'react';
import Loading from '../../../../shared/component/Loading';
import AxiosCenter from '../../../../shared/services/AxiosCenter';
import QuoteFormEdit from '../QuoteFormEdit';

export default class QuoteEdit extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
      quote: {}
    }
  }

  editQuote = (values, actions) => {
    AxiosCenter.createQuote(values)
      .then((response) => {
        this.props.history.push("/devis/accueil")
        console.log(values)
    })
    .catch((error) => {
      console.log(error);
    })
  };

  componentDidMount() {
    AxiosCenter.getQuoteById(this.props.match.params.id)
      .then((response) => {
        const quote = response.data;
        this.setState({ quote: quote, loaded: true });
        console.log(quote)

      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    if (!this.state.loaded) return <Loading />
    return <QuoteFormEdit title="Modification Devis" quote={this.state.quote} onSubmit={this.editQuote} /> 
  }
}