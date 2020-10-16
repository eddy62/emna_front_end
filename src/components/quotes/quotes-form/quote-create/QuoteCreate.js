import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../../../shared/component/Loading';
import AxiosCenter from '../../../../shared/services/AxiosCenter';
import UserService from '../../../../shared/services/UserService';
import QuoteFormCreate from '../QuoteFormCreate';

export default class QuoteCreate extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
    }
  }

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

  componentDidMount() {
    AxiosCenter.getNewQuoteNumber(UserService.getSocietyId()).then((res) => {
        this.setState({ 
          number : res.data,
          loaded: true
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    if (!this.state.loaded) return <Loading />
    return <QuoteFormCreate title="Creation Devis" quote={{}} number={this.state.number} onSubmit={this.createQuote} /> 
  }
}