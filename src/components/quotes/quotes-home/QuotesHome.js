import React, {Component} from 'react';
import Axios from '../../../shared/services/AxiosCenter';
import Loading from '../../../shared/component/Loading';
import UserService from '../../../shared/services/UserService';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardTitle,
    MDBContainer,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import QuotationElement from './quotation-element/QuotationElement';
import RedirectionBtn from '../../../shared/component/buttons/RedirectionBtn';

export default class QuotesHome extends Component {

  constructor() {
    super();
    this.state = {
      quotes: [{}],
      societyId: UserService.getSocietyId(),
      loaded: false,
    };
  }

  delete = (quote) => {
    const quoteCopy = this.state.quotes.slice()
    const index = quoteCopy.findIndex(q => {
      return quote.id === q.id
    })
    quoteCopy.splice(index, 1)
    console.log(quoteCopy)
    this.setState({
      quotes:quoteCopy
    })
  }

  componentDidMount() {
    Axios.getAllQuotesBySociety(this.state.societyId).then((res) => {
      const quotes = res.data;
      this.setState({ quotes, loaded: true });
    })
      .catch((err) => console.log(err));
  }
    reload() {
    
    Axios.getAllQuotesBySociety(this.state.societyId).then((res) => {
      const quotes = res.data;
      this.setState({quotes, loaded: true});
    })
    .catch((err) => console.log(err));
  }

  render() {
    if (!this.state.loaded) return <Loading />
    return (
      <MDBContainer>
        <MDBCardHeader color="default-color">
          <MDBCardTitle>Gestion des Devis</MDBCardTitle>
          <br />
        </MDBCardHeader>
        <hr />
        <MDBCardTitle tag="h3">Devis en cours</MDBCardTitle>
        <hr />
        <MDBCard>
          <MDBCardBody>
            <MDBTable striped>
              <MDBTableHead>
                <tr>
                  <th scope="col">Numéro</th>
                  <th scope="col">Date</th>
                  <th scope="col">Montant</th>
                  <th scope="col">Client</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.state.quotes.map((quote, index) => (
                  <QuotationElement delete={(quote) => this.delete(quote)} key={quote.id} quote={quote} societyId={this.state.societyId}  />
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
        <br />
        <div className="row d-flex justify-content-center ">
          <RedirectionBtn color="default-color" to="/menu/comptabilite" txt="retour" size="sm" />
          <RedirectionBtn color="default-color" to="/devis/créer" txt="Créer un devis" size="sm" />
        </div>
      </MDBContainer>
    );
  }
}