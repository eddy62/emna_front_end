import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import ModifyPaydayAdvanceReminder from "../children/ModifyPaydayAdvanceReminder"
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const notify = (type, nom) => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Avance/Rappel sur salaire Supprimé(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Avance/Rappel sur salaire NON Supprimé(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Avance/Rappel sur salaire NON Supprimé(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

export default class TablePaydayAdvanceReminder extends React.Component {

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
        AxiosCenter.deletePaydayAdvanceOrReminder(this.props.avanceRappelSalaireList[this.state.index].id).then(() => {
            this.toggleModaleDelete();
            this.props.reloadParentAfterUpdate();
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
                                    {avrap.etatVariablePaieId === 1 ? (
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
                                <td colSpan="5">Pas d'Avance/Rappel sur Salaire ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}
                </MDBTable>
                {/** MODALE DELETE */}
                <MDBModal isOpen={this.state.modaleDelete} backdrop={false} centered size="sm">
                    <MDBModalBody>
                        <p>Supprimer l'Avance/Rappel sur Salaire ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                            onClick={this.callBackToDelete}>SUPPRIMER</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                            onClick={this.toggleModaleDelete}>ANNULER</MDBBtn>                        
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalAvance} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <ModifyPaydayAdvanceReminder
                            avanceRappelSalaire={this.props.avanceRappelSalaireList[this.state.index]}
                            index={this.state.index}
                            toggleAvance={this.toggleModal}
                            reloadParentAfterUpdate={reloadParent}
                        />
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}