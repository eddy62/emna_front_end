import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) Rejetée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) NON Rejetée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) NON Rejetée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

export default class TableOvertimeAccountant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalRejectOvertime: false,
            index: null,
        }
    }

    toggleModalRejectOvertime = (key) => {
        this.setState({
            index: key,
            modalRejectOvertime: !this.state.modalRejectOvertime,
        });
    }


    callBackToRejectOvertime = () => {
        this.props.heureSupList[this.state.index].etatVariablePaieId = 1;
        console.log(this.props.heureSupList[this.state.index].etatVariablePaieId)
        AxiosCenter.modifyOvertime(this.props.heureSupList[this.state.index]).then(() => {
            this.toggleModalRejectOvertime();
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
                            <th className="font-weight-bold">Heures Supplémentaires</th>
                            <th>Date</th>
                            <th className="w-25"></th>
                        </tr>
                    </MDBTableHead>
                    {this.props.heureSupList.length ? (
                        <MDBTableBody>
                            {this.props.heureSupList.map((hsupp, index) => (
                                <tr key={index}>
                                    <td>{hsupp.nombreHeure} heure(s)</td>
                                    <td>{hsupp.date}</td>
                                    {hsupp.etatVariablePaieId === 2 ? (
                                        <td>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalRejectOvertime(index)}>REJETER</MDBBtn>
                                        </td>
                                    ) : hsupp.etatVariablePaieId === 1 ?(
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
                                    <td colSpan="3">Pas d'Heure Supplémentaire ce mois</td>
                                </tr>
                            </MDBTableBody>
                        )}
                </MDBTable>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalRejectOvertime} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <p>Rejeter l'/les Heure(s) Supplémentaire(s) ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                                onClick={this.callBackToRejectOvertime}>Rejeter</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                                onClick={this.toggleModalRejectOvertime}>Annuler</MDBBtn>

                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}
