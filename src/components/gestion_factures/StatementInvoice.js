import React, {Component} from 'react';

const StatementInvoice = ({facture, isCheckBoxVisible, addOrRemoveSelectedFacture}) => {
    return (
      <tr>
        <td>{facture.numfact}</td>
        <td>{facture.date}</td>
        <td>{facture.prixTTC}€</td>
        <td>{
            isCheckBoxVisible &&
            <div className="custom-control custom-checkbox">
                <input onClick={
                    (event) => {
                        // this.props.addOrRemoveSelectedFacture(this.props.facture, event.currentTarget.checked)
                        addOrRemoveSelectedFacture(facture, event)
                    }
                }
                    type="checkbox" className="custom-control-input" id={facture.id}/>
                <label className="custom-control-label" htmlFor={facture.id}/>
            </div>
            }
        </td>
      </tr>
    );
}

export default StatementInvoice;