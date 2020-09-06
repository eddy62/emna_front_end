import React, { Component } from 'react';
import Axios from '../../../../../shared/services/AxiosCenter';
import { MDBTable, MDBCardTitle, MDBTableHead, MDBTableBody } from 'mdbreact';
import StatementInvoice from '../../../../gestion_factures/StatementInvoice';

export default class ListOfInvoices extends Component {

  constructor(props){
    super();
    this.state = {
      factures : []
    }
  }

  componentDidMount(){
    Axios.getInvoicesByStatement(1).then((res) => {
      const factures = res.data;
      this.setState({factures});
    });
  }

  render(){

    return (
      <div>
        <MDBCardTitle className="card-title text-center py-2">
          Liste des factures
        </MDBCardTitle>         
        <MDBTable striped scrollY maxHeight="500px" >
          <MDBTableHead>
            <tr>
              <td><strong>Num</strong></td>
              <td><strong>Date</strong></td>
              <td><strong>Prix.TTC</strong></td>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.state.factures.map((facture, index) => (
              <StatementInvoice key={facture.id} facture={facture} />  
            ))}
          </MDBTableBody>  
        </MDBTable>
      </div>
    );
  }
  
}