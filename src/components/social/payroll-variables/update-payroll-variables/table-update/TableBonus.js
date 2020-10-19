import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import ModifyBonus from '../children/ModifyBonus'
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";
import NotificationService from "../../../../../shared/services/NotificationService";

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Prime Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Prime NON Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Prime NON Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};


export default class TableBonus extends React.Component {

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
        const entityName = "Prime";
        AxiosCenter.deleteBonus(this.props.primeList[this.state.index].id).then(() => {
            this.toggleModaleDelete();
            this.props.reloadParentAfterUpdate();
            NotificationService.successDeletion(entityName);
        }).catch((error) => {
            console.log(error);
            NotificationService.failedDeletion(entityName);
        });
    }

    render() {
        return (
            <div>
                <MDBTable>
                    <MDBTableHead color="default-color">
                        <tr>
                            <th className="font-weight-bold">Primes</th>
                            <th>Montant</th>
                            <th className="w-25"></th>
                        </tr>
                    </MDBTableHead>
                    {this.props.primeList.length ? (
                        <MDBTableBody>
                            {this.props.primeList.map((prime, index) => (
                                <tr key={index}>
                                    <td>{prime.intitule}</td>
                                    <td>{prime.montant} €</td>
                                    {prime.etatVariablePaieId === 1 ? (
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
                                <td colSpan="3">Pas de Prime ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}

                </MDBTable>
                {/** MODALE DELETE */}
                <MDBModal isOpen={this.state.modaleDelete} backdrop={false} centered size="sm">
                    <MDBModalBody>
                        <p>Supprimer la Prime ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                            onClick={this.callBackToDelete}>SUPPRIMER</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                            onClick={this.toggleModaleDelete}>ANNULER</MDBBtn>                        
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalAvance} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <ModifyBonus
                            prime={this.props.primeList[this.state.index]}
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
