import React from "react";
import DepenseElement from "./depenseElement";
import Table from "react-bootstrap/Table";
import Axios from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";

class ListeDepenses extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      depenses : []
    }
  }

  removeDepense= (id) => {
    let depenses = this.state.depenses.slice();
    const index = depenses.findIndex(function(facture){
      return facture.id === id
    });
    depenses.splice(index,1);
    Axios.deleteFacture(id);
    this.setState({depenses:depenses});
  }

  componentDidMount(){
    Axios.getDepenseBySociete(UserService.getSocietyId()).then((res) => {
      const depenses = res.data;
      console.log("data: " , res.data)
      this.setState({depenses});
    });
  }

  render() {
    return (
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Num. Depense</th>
              <th>Fournisseur</th>
              <th>Date</th>
              <th>Total</th>
              <th>Etat Depense</th>
            </tr>
          </thead>

          <tbody>
            {this.state.depenses.map((depense, index) => (
              <DepenseElement depense={depense} remove={this.removeDepense} key={depense.id} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ListeDepenses;
