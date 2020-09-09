import React, {Component} from 'react';
import {MDBCardTitle} from 'mdbreact';

class ListOfOperations extends Component {
  render() {
    return (
      <div>
        <MDBCardTitle className="card-title text-center py-2">
          Liste des opérations
        </MDBCardTitle>         
      </div>
    );
  }
}

export default ListOfOperations;