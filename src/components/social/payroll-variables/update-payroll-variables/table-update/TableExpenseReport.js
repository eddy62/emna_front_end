import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead, MDBCardHeader, MDBCardTitle, MDBContainer, MDBListGroup, MDBRow, MDBListGroupItem} from "mdbreact";
import ModifyExpenseReport from "../children/ModifyExpenseReport";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";
import NotificationService from "../../../../../shared/services/NotificationService";

export default class TableExpenseReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalAvance: false,
            index: null,
            modaleDelete: false,            
            modaleDetails: false,
            idExpenseReportSelected: null,
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

    toggleModalDocument = (key, id) => {
        this.setState({
            index: key,
            modaleDetails: !this.state.modaleDetails,
            idExpenseReportSelected: id,
        });
    }

    deleteExpenseReport = (id) => {
        const entityName = "Note de Frais";
        AxiosCenter.deleteExpenseReport(id).then(() => {
            this.toggleModaleDelete();
            this.props.reloadParentAfterUpdate();
            NotificationService.successDeletion(entityName)
        }).catch((error) => {
            console.log(error);
            NotificationService.failedDeletion(entityName);
        });
    }

    callBackToDelete = () => {
        if(this.props.noteDeFraisList[this.state.index].wrapperDocumentList.length) {
            this.props.noteDeFraisList[this.state.index].wrapperDocumentList.map((docs, index) => (
                index === this.props.noteDeFraisList[this.state.index].wrapperDocumentList.length -1 ? (
                    AxiosCenter.deleteDocumentWithFile(docs.id, docs.nom).then(() => {
                        this.deleteExpenseReport(this.props.noteDeFraisList[this.state.index].id)
                    })
                ) : (
                    AxiosCenter.deleteDocumentWithFile(docs.id, docs.nom)
                )
            ))
        }
        else {
            this.deleteExpenseReport(this.props.noteDeFraisList[this.state.index].id)
        }
    }

    getPdf = (pdfName) => {
        AxiosCenter.getPdfFileByPath(pdfName)
        .then((response) => {
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
                                    <td>{this.props.dateFormat(frais.date)}</td>
                                    <td>{frais.montant} €</td>
                                    {frais.wrapperDocumentList.length ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalDocument(index, frais.id)}>VOIR</MDBBtn>
                                        </td>
                                    ) : (
                                        <td>Pas de justificatif</td>
                                    )}
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
                                {this.props.noteDeFraisList.map((nFList) => (
                                    nFList.id === this.state.idExpenseReportSelected ? (
                                        nFList.wrapperDocumentList.map((doc, index) => (
                                            <MDBListGroupItem key={index} style={{cursor:'pointer'}} hover onClick={() => this.getPdf(doc.cheminFichier)}>{doc.nom}</MDBListGroupItem>                                      
                                        ))) : (
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
