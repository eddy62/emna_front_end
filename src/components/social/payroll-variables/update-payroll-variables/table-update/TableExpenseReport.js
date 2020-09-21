import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import ModifyExpenseReport from "../children/ModifyExpenseReport";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const notify = (type) => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Note de frais supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Note de frais NON supprimée  &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Note de frais NON supprimée  &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

export default class TableExpenseReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalAvance: false,
            index: null,
            modaleDelete: false,
        }
    }

    toggleModal = (key) => {
        this.setState({
            index: key,
            modalAvance: !this.state.modalAvance,
        });

    }

    toggleModaleDelete = (key) => {
        this.setState({
            index: key,
            modaleDelete: !this.state.modaleDelete,
        });
    }

    callBackToDelete = () => {
        AxiosCenter.deleteExpenseReport(this.props.noteDeFraisList[this.state.index].id).then(() => {
            this.toggleModaleDelete();
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
                                    {frais.etatVariablePaieId === 1 ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModal(index)}>MODIFIER</MDBBtn>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModaleDelete(index)}>SUPPRIMER</MDBBtn>                                            
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
                                <td colSpan="5">Pas de Note de Frais ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}
                </MDBTable>

                {/** MODALE DELETE */}
                <MDBModal isOpen={this.state.modaleDelete} backdrop={false} centered size="sm">
                    <MDBModalBody>
                        <p>Supprimer la Note de Frais ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                            onClick={this.callBackToDelete}>SUPPRIMER</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                            onClick={this.toggleModaleDelete}>ANNULER</MDBBtn>                        
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalAvance} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <ModifyExpenseReport
                            noteDeFrais={this.props.noteDeFraisList[this.state.index]}
                            index={this.state.index}
                            toggleNoteDeFrais={this.toggleModal}
                            reloadParentAfterUpdate={this.props.reloadParentAfterUpdate}
                        />
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}
