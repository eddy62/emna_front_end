import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBRow, MDBCol, MDBCardHeader, MDBCardTitle, MDBBtn } from 'mdbreact';
import { Link } from "react-router-dom";

import ListOfInvoices from './ListOfInvoices';
import ListOfOperations from './ListOfOperations';

class BankReconciliation extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBCardHeader color="default-color">
          <MDBCardTitle>Rapprochement bancaire</MDBCardTitle>
          <br />
        </MDBCardHeader>
        <MDBRow className='py-5'>
          <MDBCol>
            <MDBCard >
              <ListOfOperations />
            </MDBCard>  
          </MDBCol>   
          <MDBCol>
            <MDBCard>
              <ListOfInvoices />  
            </MDBCard>  
          </MDBCol> 
        </MDBRow>
        <Link to={"/menurelevenon"} className='d-flex justify-content-center'>
          <MDBBtn color=" teal lighten-2" rounded size="sm">
            <span id="color-button">Retour</span>
          </MDBBtn>
        </Link>
      </MDBContainer>
    );
  }
}

export default BankReconciliation;