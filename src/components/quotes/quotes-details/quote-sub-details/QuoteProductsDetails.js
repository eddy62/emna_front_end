import React from "react";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";

const QuoteProductsDetails = ({quote}) => {
    const products = quote.ligneProduits
    return (
        <MDBTable borderless hover small responsive>
            <MDBTableHead>
                <tr>
                    <th>#Ref</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Unite</th>
                    <th>Prix unitaire</th>
                    <th>Remise</th>
                    <th>Tva </th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {
                    products.map( product => (
                        <tr>
                            <th>{product.referenceProduit}</th>
                            <th>{product.nomProduit}</th>
                            <th>{product.descriptionProduit}</th>
                            <th>{product.prixProduit}</th>
                            <th>{product.uniteProduit}</th>
                            <th>{product.quantite}</th>
                            <th>{product.remise}</th>
                            <th>{product.tvaProduit}</th>
                        </tr>
                    ))
                }
                {
                    <tr>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td><strong>Total :</strong></td>
                        <td>{quote.prixTTC}</td>
                    </tr>
                }
            </MDBTableBody>
        </MDBTable>
    )
}

export default QuoteProductsDetails;