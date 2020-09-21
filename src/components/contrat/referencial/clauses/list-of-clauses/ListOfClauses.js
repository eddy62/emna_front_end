import React, {Component} from 'react';
import Axios from '../../../../../shared/services/AxiosCenter'
import {MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import Loading from '../../../../../shared/component/Loading'
import AxiosCenter from '../../../../../shared/services/AxiosCenter';
import DeletionConfirmationModal from '../../../../../shared/component/DeletionConfirmationModal';

export default class ListOfClauses extends Component {

  constructor(){
    super();
    this.state = {
      clauses : {},
      loaded: false,
    }
  }

  componentDidMount(){
    Axios.getAllClausesBySocietyId(1).then((res) => {
      const clauses = res.data;
      this.setState({clauses, loaded : true});
    });
  }

  deleteConfirm = (id) => {
    this.deleteClause(id);
  };

  deleteClause = (id) => {
    AxiosCenter.deleteClause(id).then((res) => this.componentDidMount());
  }

  render(){
    if (!this.state.loaded) return <Loading/>
    return (
        <div>
          <MDBCardTitle className="card-title text-center py-2">
            Liste des clauses
          </MDBCardTitle>
          <MDBTable striped scrollY maxHeight="500px">
            <MDBTableHead>
              <tr>
                <td><strong>Num</strong></td>
                <td><strong>Reference</strong></td>
                <td><strong>Description</strong></td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
            {this.state.clauses.map((clause, index) => (    
              <tr key={index}>
                <td>{clause.id}</td>
                <td>{clause.reference}</td>
                <td>{clause.description}</td>
                <td>
                  <DeletionConfirmationModal deleteConfirm={() => {
                    this.deleteConfirm(clause.id)
                  }}/>
                </td>
              </tr>
              ))}  
            </MDBTableBody>
          </MDBTable>
        </div>
    );
  }

}
