import React, { Component } from 'react';
import Axios from '../../../shared/services/AxiosCenter';
import Loading from '../../../shared/component/Loading';
import UserService from '../../../shared/services/UserService';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import QuotationElement from './quotation-element/QuotationElement';
import RedirectionBtn from '../../../shared/component/RedirectionBtn';

export default class QuotesHome extends Component {

  constructor() {
    super();
    this.state = { 
      quotes: {},
      societyId: UserService.getSocietyId(),
      loaded: false,
    };
  }

  componentDidMount() {
    Axios.getQuotesBySociety(this.state.societyId).then((res) => {
      const quotes = res.data;
      this.setState({quotes, loaded: true});
      console.log(quotes)
    })
    .catch((err) => console.log(err));
  }

  render() {
    if (!this.state.loaded) return <Loading />
    return (
      <MDBContainer>   
        <MDBCardHeader color="default-color">
          <MDBCardTitle>Accueil Devis</MDBCardTitle>
          <br />
        </MDBCardHeader>         
        <hr />  
        <MDBCardTitle tag="h3">Devis en cours</MDBCardTitle> 
        <hr />
        <MDBCard>
          <MDBCardBody>            
            <MDBTable>
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
                  <QuotationElement key={quote.id} quote={quote} />
                ))}
              </MDBTableBody>
            </MDBTable>  
            
          </MDBCardBody>
        </MDBCard>        
        <br />  
        <div className="row d-flex justify-content-center ">
              <RedirectionBtn color="default-color" route="/menu/comptabilite" msg="retour"/>
              <RedirectionBtn color="default-color" route="/devis/créer" msg="Créer un devis"/>
        </div> 
      </MDBContainer>       
    );
  }
}