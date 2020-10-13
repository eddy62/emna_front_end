import React from "react";
import DepenseElement from "../detail-depense/DepenseElement";
import Table from "react-bootstrap/Table";
import Axios from "../../../../shared/services/AxiosCenter";
import UserService from "../../../../shared/services/UserService";

class ListeDepenses extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      depenses : []
    }
  }

  removeDepense = (id) => {
    console.log("deleted : " + id)
  }

  componentDidMount(){
    Axios.getDepenseBySociete(UserService.getSocietyId()).then((res) => {
      const depenses = res.data;
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
