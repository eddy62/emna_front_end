import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

class FactureElement extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.facture.numfact}</td>
        <td>{this.props.facture.nomClient}</td>
        <td>{this.props.facture.date}</td>
        <td>{this.props.facture.prixTTC} €</td>
        <td>{this.props.facture.etatFacture}</td>
        <button className="btn-secondary btn-sm">
          <Link
            to={{
              pathname: "/detailfacture",
              state: {
                facture: this.props.facture,
              },
            }}
          >
            Visualiser
          </Link>
        </button>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Comptabilisé</Dropdown.Item>
            <Dropdown.Item href="#/action-2">En cours de traitement</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </tr>
    );
  }
}

export default FactureElement;
