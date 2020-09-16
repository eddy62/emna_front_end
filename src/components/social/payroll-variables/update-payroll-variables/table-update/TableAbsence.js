import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import ModifyAbsence from "../children/ModifyAbsence";

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Absence Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Absence NON Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Absence NON Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

class TableAbsence extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalUpdateAbsence: false,
            modalDeleteAbsence: false,
            index: null,
        }
    }

    toggleModalUpdateAbsence = (key) => {
        this.setState({
            index: key,
            modalUpdateAbsence: !this.state.modalUpdateAbsence,
        });
    }

    toggleModalDeleteAbsence = (key) => {
        this.setState({
            index: key,
            modalDeleteAbsence: !this.state.modalDeleteAbsence,
        });
    }

    callBackToDeleteAbsence = () => {
        AxiosCenter.deleteAbsence(this.props.absenceList[this.state.index].id).then(() => {
            this.toggleModalDeleteAbsence();
            this.props.reloadParentAfterUpdate();
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
                            <th className="font-weight-bold">Absences</th>
                            <th>Du</th>
                            <th>Au</th>
                            <th>Justificatif(s)</th>
                            <th className="w-25"></th>
                        </tr>
                    </MDBTableHead>
                    {this.props.absenceList.length ? (
                        <MDBTableBody>
                            {this.props.absenceList.map((abs, index) => (
                                <tr key={index}>
                                    <td>{abs.intitule}</td>
                                    <td>{abs.debutAbsence}</td>
                                    <td>{abs.finAbsence}</td>
                                    <td>{abs.justificatif}</td>
                                    {abs.etatVariablePaieId === 1 ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalUpdateAbsence(index)}>MODIFIER</MDBBtn>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalDeleteAbsence(index)}>SUPPRIMER</MDBBtn>
                                        </td>
                                    ) : (
                                        <td>Confirmé</td>
                                    )}
                                </tr>
                            ))}
                        </MDBTableBody>
                    ) : (
                        <MDBTableBody>
                            <tr>
                                <td colSpan="5">Pas d'Absence ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}
                </MDBTable>
                {/** MODALE DELETE */}
                <MDBModal isOpen={this.state.modalDeleteAbsence} backdrop={false} centered size="sm">
                    <MDBModalBody>
                        <p>Supprimer l'Absence ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                            onClick={this.callBackToDeleteAbsence}>Supprimer</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                            onClick={this.toggleModalDeleteAbsence}>Annuler</MDBBtn>                        
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalUpdateAbsence} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <ModifyAbsence
                            absence={this.props.absenceList[this.state.index]}
                            index={this.state.index}
                            toggleModalUpdateAbsence={this.toggleModalUpdateAbsence}
                            reloadParentAfterUpdate={this.props.reloadParentAfterUpdate}
                        />
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

export default TableAbsence;
