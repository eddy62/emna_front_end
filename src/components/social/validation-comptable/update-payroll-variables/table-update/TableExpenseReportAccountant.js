import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
 import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const notify = (type) => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Note de frais Rejetée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Note de frais NON Rejetée  &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Note de frais NON Rejetée  &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

export default class TableExpenseReportAccountant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalExpenseReject: false,
            index: null,
        }
    }

    toggleModalRejectExpense = (key) => {
        this.setState({
            index: key,
            modalExpenseReject: !this.state.modalExpenseReject,
        });
    }

    callBackToRejectExpense = () => {
        this.props.noteDeFraisList[this.state.index].etatVariablePaieId = 1;
        console.log(this.props.noteDeFraisList[this.state.index].etatVariablePaieId)
        AxiosCenter.updateExpenseReport(this.props.noteDeFraisList[this.state.index]).then(() => {
            this.toggleModalRejectExpense();
            notify('success');
        }).catch((error) => {
            console.log(error);
            notify('error');
        });
    }

    render() {
        return (
            <div>
                <MDBTable>
                    <MDBTableHead color="default-color">
                        <tr>
                            <th className="font-weight-bold">Notes de Frais</th>
                            <th>Date</th>
                            <th>Montant</th>
                            <th>Justificatif(s)</th>
                            <th className="w-25"></th>
                        </tr>
                    </MDBTableHead>
                    {this.props.noteDeFraisList.length ? (
                        <MDBTableBody>
                            {this.props.noteDeFraisList.map((frais, index) => (
                                <tr key={index}>
                                    <td>{frais.designation}</td>
                                    <td>{frais.date}</td>
                                    <td>{frais.montant} €</td>
                                    <td>{frais.justificatif}</td>
                                    {frais.etatVariablePaieId === 2 ? (
                                        <td>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalRejectExpense(index)}>REJETER</MDBBtn>
                                        </td>
                                    ) : frais.etatVariablePaieId === 1 ?(
                                        <td>Á traiter en paye</td>
                                    ) :  (
                                        <td>Validé</td>
                                    )}
                                </tr>
                            ))}
                        </MDBTableBody>
                    ) : (
                        <MDBTableBody>
                            <tr>
                                <td colSpan="5">Pas de Note de Frais ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}
                </MDBTable>

                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalExpenseReject} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <p>Rejeter  la Note de Frais ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                                onClick={this.callBackToRejectExpense}>Rejeter</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                                onClick={this.toggleModalRejectExpense}>Annuler</MDBBtn>

                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}
