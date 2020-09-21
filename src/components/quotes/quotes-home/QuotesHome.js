import React, { Component } from 'react';
import Axios from '../../../shared/services/AxiosCenter';
import Loading from '../../../shared/component/Loading';
import UserService from '../../../shared/services/UserService';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import QuotationElement from './quotation-element/QuotationElement';

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
          <MDBCardTitle>
            Accueil Devis
          </MDBCardTitle>
          <br />
        </MDBCardHeader>         
        <hr />  
          <MDBCard>
            <MDBCardBody> 
              <MDBCardTitle>
                Devis en cours
              </MDBCardTitle>            
              <MDBTable striped>
                <MDBTableHead>
                  <tr>
                    <th scope="col">Numéro</th>
                    <th scope="col">Date</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Fournisseur</th>
                    <th scope="col">État</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {this.state.quotes.map((quote, index) => (
                    <QuotationElement key={quote.id} quote={quote} />
                  ))}
                </MDBTableBody>
              </MDBTable>   
              <MDBBtn color="teal lighten-2" rounded size="sm" onClick={() => {
                this.props.history.push (
                  "/menu/comptabilite/"
                )
              }}>
                Retour
              </MDBBtn>    
            </MDBCardBody>
          </MDBCard>        
        <br />   
      </MDBContainer>       
    );
  }
}