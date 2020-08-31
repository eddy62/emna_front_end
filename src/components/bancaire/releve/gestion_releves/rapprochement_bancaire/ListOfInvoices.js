import React from 'react';
import { MDBTable, MDBCardTitle } from 'mdbreact';
import ListeFactures from '../../../../gestion_factures/listeFactures';

export default () => {

    return (
      <div>
        <MDBCardTitle className="card-title text-center py-2">
          Liste des factures
        </MDBCardTitle>         
        <MDBTable striped scrollY maxHeight="500px" >
          <ListeFactures />
        </MDBTable>
      </div>
    );
}