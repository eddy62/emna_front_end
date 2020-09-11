import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import ModifyHeuresSupplementaires from "../children/ModifyHeuresSupplementaires";
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
    }
};

export default class TableHeureSup extends React.Component {

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
        AxiosCenter.deleteHeureSupplementaire(this.props.heureSupList[this.state.index].id).then(() => {
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
                            <th className="font-weight-bold">Nombre d'heures supplémentaires</th>
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
                                                onClick={() =>this.toggleModal(index)}>UPDATE</MDBBtn>
                                            <MDBBtn color="danger" rounded size="sm"
                                                onClick={() =>this.toggleModaleDelete(index)}>DELETE</MDBBtn>
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
                                    <td colSpan="3">Pas d'heures supplémentaires ce mois</td>
                                </tr>
                            </MDBTableBody>
                        )}
                </MDBTable>
                {/** MODALE DELETE */}
                <MDBModal isOpen={this.state.modaleDelete} backdrop={false} size="lg">
                    <MDBModalBody>
                        Etes-vous sur de vouloir supprimer cet enregistrement ?
                        <MDBBtn
                            onClick={this.toggleModaleDelete}>Annuler</MDBBtn>
                        <MDBBtn
                            onClick={this.callBackToDelete}>Confirmer</MDBBtn>
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalAvance} toggle={this.state.toggleModal} size="lg">
                    <MDBModalBody>
                        <ModifyHeuresSupplementaires
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