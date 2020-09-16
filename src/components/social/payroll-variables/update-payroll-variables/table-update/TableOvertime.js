import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import ModifyOvertime from "../children/ModifyOvertime";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) Supprimée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) NON Supprimée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) NON Supprimée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

export default class TableOvertime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalAvance: false,
            index: null,
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
        AxiosCenter.deleteOvertime(this.props.heureSupList[this.state.index].id).then(() => {
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
                                    {hsupp.etatVariablePaieId === 1 ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                onClick={() =>this.toggleModal(index)}>MODIFIER</MDBBtn>
                                            <MDBBtn color="danger" rounded size="sm"
                                                onClick={() =>this.toggleModaleDelete(index)}>SUPPRIMER</MDBBtn>                                            
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
                                    <td colSpan="3">Pas d'Heure Supplémentaire ce mois</td>
                                </tr>
                            </MDBTableBody>
                        )}
                </MDBTable>
                {/** MODALE DELETE */}
                <MDBModal isOpen={this.state.modaleDelete} backdrop={false} centered size="sm">
                    <MDBModalBody>
                        <p>Supprimer l'/les Heure(s) Supplémentaire(s) ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                            onClick={this.callBackToDelete}>SUPPRIMER</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                            onClick={this.toggleModaleDelete}>ANNULER</MDBBtn>
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalAvance} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <ModifyOvertime
                            heureSupplementaire={this.props.heureSupList[this.state.index]}  
                            index={this.state.index}                          
                            toggleAvance={this.toggleModal}
                            reloadParentAfterUpdate={this.props.reloadParentAfterUpdate}
                        />
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}
