import React from "react";
import RedirectionBtn from "../../../shared/component/buttons/RedirectionBtn";

class DepenseElement extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.depense.numero}</td>
                <td>{this.props.depense.nomFournisseur}</td>
                <td>{this.props.depense.date}</td>
                <td>{this.props.depense.prix} €</td>
                <td>{this.props.depense.etatDepense}</td>

                <RedirectionBtn color="success"
                                size="sm" to={"/depenses/details/" + this.props.depense.id}
                                txt="Details"
                />
                <RedirectionBtn color="info"
                                size="sm"
                                to="/modifierdepense"
                                txt="Modifier"
                />
                <RedirectionBtn color="danger"
                                size="sm"
                                to={"/modifierdepense" + this.props.depense}
                                onClick={() => {this.props.remove(this.props.depense.id)}}
                                txt="Supprimer"
                />
            </tr>
        );
    }
}
export default DepenseElement;
