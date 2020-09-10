import React from "react";
import {BrowserRouter as Link} from "react-router-dom";

class DepenseElement extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.depense.numfact}</td>
        <td>{this.props.depense.nomClient}</td>
        <td>{this.props.depense.date}</td>
        <td>{this.props.depense.prixTTC} €</td>
        <td>{this.props.depense.etatFacture}</td>
        <button className="btn-secondary btn-sm">
          <Link
            to={{
              pathname: "/detaildepense",
              state: {
                depense: this.props.depense,
              },
            }}
          >
            Détails
          </Link>
        </button>
        <button
          href="/modifierdepense"
          className="btn-info btn-sm"
        >
          Modifier
        </button>
        <button
          href="/modifierdepense"
          className="btn-danger btn-sm"
          depense={this.props.depense}
          onClick={() => {
            this.props.remove(this.props.depense.id);
          }}
        >
          Supprimer
        </button>
      </tr>
    );
  }
}

export default DepenseElement;
