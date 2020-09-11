import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import ModifyAvanceRappelSalaire from "../children/ModifyAvanceRappelSalaire"

const componentModale = () => {
    return(
        console.log("it's work")
    )
};

export default class TableAvanceRappelSalaire extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            modalAvance: false,
            index: null,
        }
    }

    toggleModal = (key) => {
        this.setState({
            index: key,
            modalAvance: !this.state.modalAvance,
        }, () => {componentModale()});
       
    }

    render() {
        const reloadParent = this.props.reloadParentAfterUpdate;
        console.log(this.props.avanceRappelSalaireList[this.state.index]);
        return (
            <div>                
                <MDBTable>
                    <MDBTableHead color="default-color">
                    <tr>
                        <th className="font-weight-bold">Montant Rappel/Avance sur Salaire</th>
                        <th className="w-25"></th>
                    </tr>
                    </MDBTableHead>
                {this.props.avanceRappelSalaireList.length ? (
                    <MDBTableBody>
                    {this.props.avanceRappelSalaireList.map((avrap, index) => (
                        <tr key={index}>
                            <td>{avrap.montant} €</td>
                            {avrap.etatVariablePaieId === 1 ? (
                                <td>
                                    <MDBBtn color="teal accent-3" rounded size="sm"
                                        onClick={() =>this.toggleModal(index)}>UPDATE</MDBBtn>
                                    <MDBBtn color="danger" rounded size="sm">DELETE</MDBBtn>
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
                            <td  colSpan="2">Pas d'avance/rappel sur salaire ce mois</td>
                        </tr>     
                    </MDBTableBody> 
                )}
            </MDBTable>
            <MDBModal isOpen={this.state.modalAvance} toggle={this.state.toggleModal} size="lg">
                {console.log(this.props.avanceRappelSalaireList[this.state.index])}
                {console.log(this.props.reloadParentAfterUpdate)}
                {console.log("INDEX TABLE " + this.state.index)}
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