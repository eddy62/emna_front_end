import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBCardHeader, MDBTableHead, MDBCardTitle, MDBContainer, MDBListGroup, MDBRow, MDBListGroupItem } from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import ModifyOtherPayrollVariable from "../children/ModifyOtherPayrollVariable";
import NotificationService from "../../../../../shared/services/NotificationService";

class TableOtherPayrollVariable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalUpdateOther: false,
            modalDeleteOther: false,
            modaleDetails: false,
            index: null,
            idOtherPayrollVariableSelected: null,
        }
    }

    toggleModalUpdateOther = (key) => {
        this.setState({
            index: key,
            modalUpdateOther: !this.state.modalUpdateOther,
        });
    }

    toggleModalDeleteOther = (key) => {
        this.setState({
            index: key,
            modalDeleteOther: !this.state.modalDeleteOther,
        });
    }

    toggleModalDocument = (key, id) => {
        this.setState({
            index: key,
            modaleDetails: !this.state.modaleDetails,
            idOtherPayrollVariableSelected: id
        });
    }

    deleteOther = (id) => {
        const entityName = "Autre Variable de Paie";
        AxiosCenter.deleteOtherPayrollVariable(id).then(() => {
            this.toggleModalDeleteOther();
            this.props.reloadParentAfterUpdate();
            NotificationService.successDeletion(entityName);
        }).catch((error) => {
            console.log(error);
            NotificationService.failedDeletion(entityName);
        });
    }

    callBackToDeleteOther = () => {
        if(this.props.autresVariablesList[this.state.index].wrapperDocumentList.length) {
            this.props.autresVariablesList[this.state.index].wrapperDocumentList.map((docs, index) => (
                index === this.props.autresVariablesList[this.state.index].wrapperDocumentList.length -1 ? (
                    AxiosCenter.deleteDocumentWithFile(docs.id, docs.nom).then(() => {
                        this.deleteOther(this.props.autresVariablesList[this.state.index].id)
                    })
                ) : (
                    AxiosCenter.deleteDocumentWithFile(docs.id, docs.nom)
                )
            ))
        }
        else {
            this.deleteOther(this.props.autresVariablesList[this.state.index].id)
        }
    }

    getPdf = (id, pdfName) => {
        AxiosCenter.getPdfFileById(id)
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
            
            //Create a Blob from the PDF Stream
            /*switch(ext) {
                case "pdf":
                    const file = new Blob(
                        [response.data],
                        {type: 'application/pdf'});
                        //Build a URL from the file
                        const fileURL = URL.createObjectURL(file);
                        //Open the URL on new Window
                        window.open(fileURL);
                    break;
                case "png":
                    const file = new Blob(
                        [response.data], 
                        {type: 'image/png'});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    window.open(fileURL);
                break;
                case "jpg":
                    const file = new Blob(
                        [response.data], 
                        {type: 'image/jpeg'});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    window.open(fileURL);
                break;
            }     */       
        })        
    }

    render() {
        return (
            <div>
                <MDBTable>
                    <MDBTableHead color="default-color">
                        <tr>
                            <th className="font-weight-bold">Autres</th>
                            <th>Date</th>
                            <th>Montant</th>
                            <th>Justificatif(s)</th>
                            <th className="w-25"></th>
                        </tr>
                    </MDBTableHead>
                    {this.props.autresVariablesList.length ? (
                        <MDBTableBody>
                            {this.props.autresVariablesList.map((other, index) => (
                                <tr key={index}>
                                    <td>{other.description}</td>
                                    <td>{this.props.dateFormat(other.date)}</td>
                                    <td>{other.montant} €</td>
                                    {other.wrapperDocumentList.length ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalDocument(index, other.id)}>VOIR</MDBBtn>
                                        </td>
                                    ) : (
                                        <td>Pas de justificatif</td>
                                    )}
                                    {other.etatVariablePaieId === 1 ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalUpdateOther(index)}>MODIFIER</MDBBtn>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalDeleteOther(index)}>SUPPRIMER</MDBBtn>
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
                                <td colSpan="5">Pas de Variable de Paie Autre ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}
                </MDBTable>
                {/** MODALE DELETE */}
                <MDBModal isOpen={this.state.modalDeleteOther} backdrop={false} centered size="sm">
                    <MDBModalBody>
                        <p>Supprimer la Variable de Paie Autre ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                                onClick={this.callBackToDeleteOther}>SUPPRIMER</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                                onClick={this.toggleModalDeleteOther}>ANNULER</MDBBtn>
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalUpdateOther} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <ModifyOtherPayrollVariable
                            other={this.props.autresVariablesList[this.state.index]}
                            index={this.state.index}
                            toggleModalUpdateOther={this.toggleModalUpdateOther}
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
                                {this.props.autresVariablesList.map((aVList) => (
                                    aVList.id === this.state.idOtherPayrollVariableSelected ? (
                                        aVList.wrapperDocumentList.map((doc, index) => (
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

export default TableOtherPayrollVariable;
