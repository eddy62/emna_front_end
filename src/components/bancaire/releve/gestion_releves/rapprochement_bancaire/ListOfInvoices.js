import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBCardTitle } from 'mdbreact';

class ListOfInvoices extends Component {
  render() {
    const data = {
      columns: [
        {
          label: 'ID',                
        },
        {
          label: 'Numéro',                
        },
        {
          label: 'Date',               
        }             
      ],
      rows: [
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },
        {
          'ID': 1,
          'Numfact': '54917',
          'Date': '22/07/2020',
        },              
      ]
    };
      
    return (
      <div>
        <MDBCardTitle className="card-title text-center py-2">
          Liste des factures
        </MDBCardTitle>         
        <MDBTable striped scrollY maxHeight="500px" >
          <MDBTableHead columns={data.columns} />
          <MDBTableBody rows={data.rows}/>
        </MDBTable>
      </div>
    );
  }
}

export default ListOfInvoices;