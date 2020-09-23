import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const notify = (type, nom) => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Avance/Rappel sur salaire Rejeté(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Avance/Rappel sur salaire NON Rejeté(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Avance/Rappel sur salaire NON Rejeté(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

export default class TablePaydayAdvanceReminderAccountant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalRejectAdvanceReminder: false,
            index: null,
        }
    }

    toggleModalRejectAdvanceReminder = (key) => {
        this.setState({
            index: key,
            modalRejectAdvanceReminder: !this.state.modalRejectAdvanceReminder,
        });

    }



    callBackToRejectAdvanceReminder = () => {
        this.props.avanceRappelSalaireList[this.state.index].etatVariablePaieId = 1;
        console.log(this.props.avanceRappelSalaireList[this.state.index].etatVariablePaieId)
        AxiosCenter.modifyPaydayAdvanceOrReminder(this.props.avanceRappelSalaireList[this.state.index]).then(() => {
            this.toggleModalRejectAdvanceReminder();
            notify('success');
        }).catch((error) => {
            console.log(error);
            notify('error');
        });
    }

    render() {
        const reloadParent = this.props.reloadParentAfterUpdate;
        return (
            <div>
                <MDBTable>
                    <MDBTableHead color="default-color">
                        <tr>
                            <th className="font-weight-bold">Rappels/Avances sur Salaire</th>
                            <th>Du</th>
                            <th>Au</th>
                            <th>Montant</th>
                            <th className="w-25"></th>
                        </tr>
                    </MDBTableHead>
                    {this.props.avanceRappelSalaireList.length ? (
                        <MDBTableBody>
                            {this.props.avanceRappelSalaireList.map((avrap, index) => (
                                <tr key={index}>
                                    <td>{avrap.type}</td>
                                    <td>{avrap.debutPeriode}</td>
                                    <td>{avrap.finPeriode}</td>
                                    <td>{avrap.montant} €</td>
                                    {avrap.etatVariablePaieId === 2 ? (
                                        <td>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalRejectAdvanceReminder(index)}>REJETER</MDBBtn>
                                        </td>
                                    ) : avrap.etatVariablePaieId === 1 ?(
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
                                <td colSpan="5">Pas d'Avance/Rappel sur Salaire ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}
                </MDBTable>

                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalRejectAdvanceReminder} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <p>Rejeter l'Avance/Rappel sur Salaire ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                                onClick={this.callBackToRejectAdvanceReminder}>Rejeter</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                                onClick={this.toggleModalRejectAdvanceReminder}>Annuler</MDBBtn>

                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}
