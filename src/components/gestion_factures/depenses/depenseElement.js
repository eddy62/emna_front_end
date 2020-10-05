import React from "react";
import RedirectionBtn from "../../../shared/component/RedirectionBtn";

class DepenseElement extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.depense.numero}</td>
        <td>{this.props.depense.nomFournisseur}</td>
        <td>{this.props.depense.date}</td>
        <td>{this.props.depense.prix} €</td>
        <td>{this.props.depense.etatDepense}</td>

          <RedirectionBtn color="default-color" route={"/depenses/details/" + this.props.depense.id}  msg="Details"/>

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
