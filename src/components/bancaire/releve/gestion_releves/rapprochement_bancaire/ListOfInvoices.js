import React, {Component} from 'react';
import {MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import StatementInvoice from '../../../../gestion_factures/StatementInvoice';

export default class ListOfInvoices extends Component {

    render() {
        return (
            <div>
                <MDBCardTitle className="card-title text-center py-2">
                    Liste des factures
                </MDBCardTitle>
                <MDBTable striped scrollY maxHeight="500px">
                    <MDBTableHead>
                        <tr>
                            <td><strong>Num</strong></td>
                            <td><strong>Date</strong></td>
                            <td><strong>Prix.TTC</strong></td>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.props.factures.map((facture, index) => (
                            <StatementInvoice key={facture.id}
                                              isCheckBoxVisible={this.props.isCheckBoxVisible}
                                              addOrRemoveSelectedFacture={this.props.addOrRemoveSelectedFacture}
                                              facture={facture}
                                              countInvoicesSum={this.countInvoicesSum}
                            />
                        ))}
                    </MDBTableBody>
                </MDBTable>
            </div>
        );
    }
}
