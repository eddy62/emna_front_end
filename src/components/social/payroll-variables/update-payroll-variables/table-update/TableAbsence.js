import React from "react";
import {MDBBtn, MDBRow, MDBListGroupItem, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead, MDBContainer, MDBListGroup, MDBCardHeader, MDBCardTitle} from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import ModifyAbsence from "../children/ModifyAbsence";
import NotificationService from "../../../../../shared/services/NotificationService";

class TableAbsence extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalUpdateAbsence: false,
            modalDeleteAbsence: false,
            modaleDetails: false,
            index: null,
            idAbsenceSelected: null
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

    toggleModalDocument = (key, id) => {
        this.setState({
            index: key,
            modaleDetails: !this.state.modaleDetails,
            idAbsenceSelected: id,
        });
    }
    deleteAbsence = (id) => {
        const entityName = "Absence";
        AxiosCenter.deleteAbsence(id).then(() => {
            this.toggleModalDeleteAbsence();
            this.props.reloadParentAfterUpdate();
            NotificationService.successDeletion(entityName);
        }).catch((error) => {
            console.log(error);
            NotificationService.failedDeletion(entityName);
        });
    }

    callBackToDeleteAbsence = () => {
        if(this.props.absenceList[this.state.index].wrapperDocumentList.length) {
            this.props.absenceList[this.state.index].wrapperDocumentList.map((docs, index) => (
                index === this.props.absenceList[this.state.index].wrapperDocumentList.length -1 ? (
                    AxiosCenter.deleteDocumentWithFile(docs.id, docs.nom).then(() => {
                        this.deleteAbsence(this.props.absenceList[this.state.index].id)
                    })
                ) : (
                    AxiosCenter.deleteDocumentWithFile(docs.id, docs.nom)
                )
            ))
        }
        else {
            this.deleteAbsence(this.props.absenceList[this.state.index].id)
        }
    }

    getPdf = (id, pdfName) => {
        AxiosCenter.getPdfFileById(id)
        .then((response) => {
            console.log(response)
            const url = pdfName.split(".");
            const ext = url[2];
            this.setState({ modaleDetails: !this.state.modaleDetails });
            
            if(ext === "pdf") {
                const file = new Blob(
                    [response.data],
                    {type: 'application/pdf'});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    window.open(fileURL);
            }
            else if(ext === "png") {
                const file = new Blob(
                    [response.data], 
                    {type: 'image/png'});
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);
            }
            else {
                const file = new Blob(
                    [response.data], 
                    {type: 'image/jpeg'});
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);
            }
        })        
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
                                    <td>{this.props.dateFormat(abs.debutAbsence)}</td>
                                    <td>{this.props.dateFormat(abs.finAbsence)}</td>
                                    {abs.wrapperDocumentList.length ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalDocument(index, abs.id)}>VOIR</MDBBtn>
                                        </td>
                                    ) : (
                                        <td>Pas de justificatif</td>
                                    )}
                                    {abs.etatVariablePaieId === 1 ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalUpdateAbsence(index)}>MODIFIER</MDBBtn>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalDeleteAbsence(index)}>SUPPRIMER</MDBBtn>
                                        </td>
                                    ) : (
                                        abs.etatVariablePaieId === 2 ? (
                                            <td>Confirmé</td>
                                        ) : (
                                            <td>Validé</td>
                                        )
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
                            yearSelected={this.props.yearSelected}
                            monthSelected={this.props.monthSelected}
                            dateFormat={this.props.dateFormat}
                        />
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE DOCUMENT PDF */}
                <MDBModal isOpen={this.state.modaleDetails} backdrop={false} centered size="lg">
                    <MDBCardHeader color={"teal accent-4"} >
                        <MDBCardTitle tag="h4">Documents justificatifs</MDBCardTitle>
                    </MDBCardHeader>
                    <MDBModalBody> 
                        <MDBContainer>                            
                            <MDBListGroup>
                                {this.props.absenceList.map((abs) => (
                                    abs.id === this.state.idAbsenceSelected ? (
                                        console.log(abs.wrapperDocumentList),
                                        abs.wrapperDocumentList.map((doc, index) => (
                                            <MDBListGroupItem key={index} style={{cursor:'pointer'}} hover onClick={() => this.getPdf(doc.id, doc.cheminFichier)}>{doc.nom}</MDBListGroupItem>
                                        ))   
                                    ) : (
                                        null
                                    )
                                                                     
                                ))}
                            </MDBListGroup>
                            <MDBRow center>
                                <MDBBtn color="teal accent-3" className="mt-3" rounded size="sm" onClick={() => this.toggleModalDocument(this.state.index)}>
                                    Annuler
                                </MDBBtn>
                            </MDBRow>
                        </MDBContainer>                     
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

export default TableAbsence;
