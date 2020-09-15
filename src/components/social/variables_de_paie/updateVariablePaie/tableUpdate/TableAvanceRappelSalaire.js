import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import ModifyAvanceRappelSalaire from "../children/ModifyAvanceRappelSalaire"
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
    }
};

export default class TableAvanceRappelSalaire extends React.Component {

    constructor(props) {
        super(props);
        this.state={
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
        AxiosCenter.deleteAvanceRappelSalaire(this.props.avanceRappelSalaireList[this.state.index].id).then(() => {
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
        console.log(this.props.avanceRappelSalaireList[this.state.index]);
        return (
            <div>                
                <MDBTable>
                    <MDBTableHead color="default-color">
                    <tr>
                        <th className="font-weight-bold">Rappels/Avances sur Salaires</th>         
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
                            <td  colSpan="5">Pas d'Avance/Rappel sur Salaire ce mois</td>
                        </tr>     
                    </MDBTableBody> 
                )}
            </MDBTable>
            {/** MODALE DELETE */}
            <MDBModal isOpen={this.state.modaleDelete} backdrop={false} centered size="lg">
                <MDBModalBody>
                    Etes-vous sur de vouloir supprimer cet enregistrement ?
                    <MDBBtn
                        onClick={this.toggleModaleDelete}>Annuler</MDBBtn>
                    <MDBBtn
                        onClick={this.callBackToDelete}>Confirmer</MDBBtn>
                </MDBModalBody>
            </MDBModal>
            {/** MODALE UPDATE */}
            <MDBModal isOpen={this.state.modalAvance} backdrop={false} centered size="lg">
                <MDBModalBody>
                    <ModifyAvanceRappelSalaire
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