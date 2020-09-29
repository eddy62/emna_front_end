import React, {Component} from 'react';
import {MDBBtn} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import AxiosCenter from "../../../../shared/services/AxiosCenter";

export default class StatementOperation extends Component {

    mergeProcess = () => {
        if (this.props.selectedFactures.length === 0) return

        let somme = 0
        this.props.selectedFactures.map(facture => somme += facture.prixTTC);
        if (somme === this.props.operation.solde) {
            this.props.selectedFactures.map(facture => {
                this.mergeOperation(this.props.operation.id, facture.id).then(r =>
                    this.props.bankRefreshComponentDidMount()
                )
            });
        }
    }

    async mergeOperation(operationId, factureId) {
        await AxiosCenter.mergeOperationToInvoices(operationId, factureId)
        await AxiosCenter.updateRapprochementOperation(this.props.operation.id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.operation.id}</td>
                <td>{this.props.operation.date}</td>
                <td>{this.props.operation.description}</td>
                <td>{this.props.operation.solde}</td>
                <td>{this.props.operation.type}</td>
                {(UserService.isAdmin() || UserService.isAccountant()) &&
                <td>
                    {
                        this.props.isCheckBoxVisible &&  this.props.operation.rapproche == false &&
                        <MDBBtn onClick={this.mergeProcess}
                                color=" teal lighten-2" rounded size="sm">
                            <span id={this.props.operation.id}>Valider</span>
                        </MDBBtn>
                    }
                </td>
                }
            </tr>
        );
    }
}