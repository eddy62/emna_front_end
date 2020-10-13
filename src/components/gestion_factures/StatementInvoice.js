import React, {} from 'react';
import {MDBInput} from "mdbreact";

const StatementInvoice = ({facture, isCheckBoxVisible, addOrRemoveSelectedFacture}) => {
    return (
      <tr>
        <td>{facture.numfact}</td>
        <td>{facture.date}</td>
        <td>{facture.prixTTC}€</td>
        <td>{
            isCheckBoxVisible &&
            <div>
                <MDBInput onChange={
                    (event) => {
                        // this.props.addOrRemoveSelectedFacture(this.props.facture, event.currentTarget.checked)
                        addOrRemoveSelectedFacture(facture, event)
                    }
                }
                    type="checkbox" id={facture.id}
                    label=" "/>
            </div>
            }
        </td>
      </tr>
    );
}

export default StatementInvoice;