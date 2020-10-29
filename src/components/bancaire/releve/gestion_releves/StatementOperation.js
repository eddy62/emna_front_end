import React, {Component} from 'react';
import {MDBBtn} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import {withRouter} from "react-router-dom";


class StatementOperation extends Component {

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

    goToList = (id) => {
        this.props.history.push(`/detailsoperation/${id}`);
    }


    render() {
        return (
            <tr onClick={this.props.onClick}>
                <td>{this.props.operation.id}</td>
                <td>{this.props.operation.date}</td>
                <td>{this.props.operation.description}</td>
                <td>{this.props.operation.solde}</td>
                <td>{this.props.operation.type}</td>
                {this.props.operation.rapproche &&
                <td>
                    <MDBBtn onClick={() => this.goToList(this.props.operation.id)}
                            color=" teal lighten-2" rounded size="sm">
                        <span>detail</span>
                    </MDBBtn>
                </td>}
                {(UserService.isAdmin() || UserService.isAccountant()) &&
                <td>
                    {
                        this.props.isCheckBoxVisible && this.props.operation.rapproche === false &&
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

export default withRouter(StatementOperation)
