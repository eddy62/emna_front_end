import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead/**, MDBCardTitle, MDBContainer, MDBListGroup, MDBRow, MDBListGroupItem */} from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import ModifyOtherPayrollVariable from "../children/ModifyOtherPayrollVariable";

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Autre Variable de Paie Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Autre Variable de Paie NON Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Autre Variable de Paie NON Supprimée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

class TableOtherPayrollVariable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalUpdateOther: false,
            modalDeleteOther: false,
            //modaleDetails: false,
            index: null,
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

    /*toggleModalDocument = (key) => {
        this.setState({
            index: key,
            modaleDetails: !this.state.modaleDetails,
        });
    }*/

    callBackToDeleteOther = () => {
        AxiosCenter.deleteOtherPayrollVariable(this.props.autresVariablesList[this.state.index].id).then(() => {
            this.toggleModalDeleteOther();
            this.props.reloadParentAfterUpdate();
            notify('success');
        }).catch((error) => {
            console.log(error);
            notify('error');
        });
    }

    /*getPdf = (pdfName) => {
        AxiosCenter.getPdfFileByPath(pdfName)
        .then((response) => {
            this.setState({ modaleDetails: !this.state.modaleDetails });
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [response.data], 
                {type: 'application/pdf'});
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);
        })        
    }*/

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
                                    <td>{other.date}</td>
                                    <td>{other.montant} €</td>
                                    <td>{other.justificatif}</td> {/**lighe à supprimer lorsque le reste du code est décommenté */}
                                    {/*other.documentDTOList.length ? (
                                        <td>
                                            <MDBBtn color="teal accent-3" rounded size="sm"
                                                    onClick={() => this.toggleModalDocument(index)}>VOIR</MDBBtn>
                                        </td>
                                    ) : (
                                        <td>Pas de justificatif</td>
                                    )*/}
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
                        />
                    </MDBModalBody>
                </MDBModal>
                {/** MODALE DOCUMENT PDF */}
                {/*<MDBModal isOpen={this.state.modaleDetails} backdrop={false} centered size="lg">
                    <MDBCardHeader color={"teal accent-4"} >
                        <MDBCardTitle tag="h4">Documents justificatifs</MDBCardTitle>
                    </MDBCardHeader>
                    <MDBModalBody> 
                        <MDBContainer>                            
                            <MDBListGroup>
                                {this.props.autresVariablesList.map((aVList) => (
                                    aVList.documentDTOList.map((doc, index) => (
                                        <MDBListGroupItem key={index} style={{cursor:'pointer'}} hover onClick={() => this.getPdf(doc.nom)}>{doc.nom}</MDBListGroupItem>
                                    ))                                    
                                ))}
                            </MDBListGroup>
                            <MDBRow center>
                                <MDBBtn color="teal accent-3" className="mt-3" rounded size="sm" onClick={() => this.toggleModalDocument(this.state.index)}>
                                    Annuler
                                </MDBBtn>
                            </MDBRow>
                        </MDBContainer>                     
                    </MDBModalBody>
                                    </MDBModal>*/}
            </div>
        );
    }
}

export default TableOtherPayrollVariable;
