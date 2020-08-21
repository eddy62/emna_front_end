import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class FactureElement extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.facture.id}</td>
        <td>{this.props.facture.numfact}</td>
        <td>{this.props.facture.clientFournisseurId}</td>
        <td>{this.props.facture.date}</td>
        <td>{this.props.facture.dateEcheance}</td>
        <td>{this.props.facture.prixttc}</td>
        <td>{this.props.facture.etatFactureId}</td>
        <button className="btn-secondary btn-sm">
          <Link
            to={{
              pathname: "/detailfacture",
              state: {
                facture: this.props.facture,
              },
            }}
          >
            Détails
          </Link>
        </button>
        <button
          href="/modifierfacture"
          className="btn-info btn-sm"
          facture={this.props.facture}
        >
          Modifier
        </button>
        <button
          href="/modifierfacture"
          className="btn-danger btn-sm"
          facture={this.props.facture}
          onClick={() => {
            //Axios.deleteFacture(this.props.facture.id);
            this.props.remove(this.props.facture.id);
          }}
        >
          Supprimer
        </button>
      </tr>
    );
  }
}

export default FactureElement;
