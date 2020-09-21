import React from "react";
import FactureElement from "./factureElement";
import Table from "react-bootstrap/Table";
import Axios from "../../../shared/services/AxiosCenter";
import UserService from './../../../shared/services/UserService';

class ListeFactures extends React.Component {
  constructor(props){
    super();
    this.state = {
      factures : []
    }
  }

  removeFacture= (id) => {
    let factures = this.state.factures.slice();
    const index = factures.findIndex(function(facture){
      return facture.id === id
    });
    factures.splice(index,1);
    Axios.deleteInvoice(id);
    this.setState({factures:factures});
  }

  componentDidMount(){
    Axios.getInvoicesBySociety(UserService.getSocietyId()).then((res) => {
      const factures = res.data;
      this.setState({factures});
    });
  }


  render() {
    return (
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Num. Facture</th>
              <th>Client</th>
              <th>Date</th>
              <th>Total</th>
              <th>Etat Facture</th>
            </tr>
          </thead>

          <tbody>
            {this.state.factures.map((facture, index) => (
              <FactureElement facture={facture} remove={this.removeFacture} key={facture.id} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ListeFactures;
