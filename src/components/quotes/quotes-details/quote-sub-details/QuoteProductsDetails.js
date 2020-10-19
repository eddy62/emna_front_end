import React from "react";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";

const QuoteProductsDetails = ({quote}) => {
    const products = quote.ligneProduitDTOList
    return (
        <MDBTable borderless hover small responsive>
            <MDBTableHead>
                <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Remise</th>
                    <th>Total</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {
                    <tr>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td>{"Devis total : " + quote.prixTTC}</td>
                    </tr>
                }

            </MDBTableBody>
        </MDBTable>
    )
}

export default QuoteProductsDetails;