import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Absence Rejetée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Absence NON rejetée &nbsp;&nbsp;!</strong>
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

class TableAbsenceAccountant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalRejectAbsence: false,
            index: null,
        }
    }


    toggleModalRejectAbsence = (key) => {
        this.setState({
            index: key,
            modalRejectAbsence: !this.state.modalRejectAbsence,
        });
    }


      callBackToRejectAbsence = () => {
          this.props.absenceList[this.state.index].etatVariablePaieId = 1;
          console.log(this.props.absenceList[this.state.index].etatVariablePaieId)
          AxiosCenter.modifyAbsence(this.props.absenceList[this.state.index]).then(() => {
            this.toggleModalRejectAbsence();
            notify('success');
            this.reloadParentAfterUpdate();
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
                                    {abs.etatVariablePaieId === 2 ? (
                                        <td>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalRejectAbsence(index)}>REJETER</MDBBtn>
                                        </td>
                                    ) : abs.etatVariablePaieId === 1 ?(
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
                                <td colSpan="5">Pas d'Absence ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}
                </MDBTable>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalRejectAbsence} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <p>Rejeter l'Absence ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                                onClick={this.callBackToRejectAbsence}>Rejeter</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                                onClick={this.toggleModalRejectAbsence}>Annuler</MDBBtn>                        
 
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

export default TableAbsenceAccountant;