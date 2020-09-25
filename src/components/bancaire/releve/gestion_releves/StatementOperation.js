import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {MDBBtn} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import AxiosCenter from "../../../../shared/services/AxiosCenter";

export default class StatementOperation extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.operation.id}</td>
                <td>{this.props.operation.date}</td>
                <td>{this.props.operation.description}</td>
                <td>{this.props.operation.solde}</td>
                <td>{this.props.operation.type}</td>
                {(UserService.isAdmin() || UserService.isAccountant()) &&
                <td>{
                    this.props.isCheckBoxVisible &&

                    <MDBBtn onClick={
                        () => {
                            if (this.props.selectedFactures.length == 0) return

                            let somme = 0
                            this.props.selectedFactures.map(facture => somme += facture.prixTTC);
                            if (somme == this.props.operation.solde) {
                                console.log(somme)
                                console.log(this.props.selectedFactures)
                                this.props.selectedFactures.map(facture =>
                                    AxiosCenter.mergeOperationToInvoices(this.props.operation.id, facture.id));
                                AxiosCenter.updateRapprochementOperation(this.props.operation.id);
                                this.props.bankRefreshComponentDidMount();


                            }
                        }
                    }
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
