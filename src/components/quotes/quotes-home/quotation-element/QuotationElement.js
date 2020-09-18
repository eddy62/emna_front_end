import { MDBBtn} from 'mdbreact';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class QuotationElement extends Component {
  render() {
    return (
      <tr className="alert alert-success" role="alert">
        <td>{this.props.quote.numDevis}</td>
        <td>{this.props.quote.dateCreation}</td>
        <td>{this.props.quote.prixTTC} € TTC</td>
        <td>{this.props.quote.clientFournisseurId}</td>
        <td>{this.props.quote.etatDevisId}</td>  
        <td>
          <Link to={"#"}>
            <em>voir le détail</em>
          </Link>
        </td>
        <td>
          <MDBBtn color="default-color" size="sm">
            Modifier
          </MDBBtn>   
          <MDBBtn color="default-color" size="sm">
            Télécharger
          </MDBBtn>  
          <MDBBtn color="default-color" size="sm">
            Supprimer
          </MDBBtn>   
        </td>     
      </tr>
    );
  }
}