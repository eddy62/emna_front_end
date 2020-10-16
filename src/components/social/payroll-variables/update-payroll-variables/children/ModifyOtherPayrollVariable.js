import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow, MDBListGroup, MDBListGroupItem, MDBIcon, MDBFileInput} from "mdbreact";
import {toast} from "react-toastify";

const otherSchema = (props) => {
    return Yup.object().shape({
        description: Yup.string().required("Description obligatoire"),
        date: Yup.date().required("Date obligatoire")
            .min(props.startPeriod, "Date erronée")
            .max(props.endPeriod, "Date erronée"),
        montant: Yup.number().required("Montant obligatoire")
            .min("0.01", "Ne peut pas être un montant nul ou négatif")
    })
};

const ComponentTextArea = ({field, ...props}) => (
    <MDBInput
        type="textarea"
        label={props.label}
        rows="5"
        {...props}
        {...field}
    />
);

const ComponentDate = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        outline
        type="date"
        min={props.startdate}
        max={props.enddate}
        {...props}
        {...field}
    />
);

const ComponentNumber = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        min="0.01"
        step="0.01"
        outline
        type="number"
        valueDefault="0"
        {...props}
        {...field}
    />
);

const ComponentError = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComponentUploadFiles = ({field, ...props}) => (
    <div>
        <MDBFileInput
            btnTitle="Télécharger"
            textFieldTitle="Ajouter justificatif(s)"
            multiple
            btnColor="teal accent-3"
            getValue={props.fileInputHandler}
        />
    </div>
);

const notify = (type, date) => {
    const variable = "Autre Variable de Paie";
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>{variable} Modifiée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "warning":
            toast.warning(
                <div className="text-center">
                    <strong>{variable} NON modifiée : Le salarié était absent pendant cette date {date} &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Modifiée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Modifiée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
    }
}

class ModifyOtherPayrollVariable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            docToDelete: [],
            startPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            endPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
            fileList: [],
            autresVariablesDePaie: this.props.other
        };
    }

    submit = (values, actions) => {
        if(this.state.docToDelete.length) {
            this.removeFile();
        }
        if(this.state.fileList.length) {
            this.uploadFiles(values.id);
            console.log(values.id);
        }
        AxiosCenter.modifyOtherPayrollVariable(values)
            .then((response) => {
                const statut = response.status;
                const dateOther = this.props.dateFormat(response.data.date);
                switch(statut) {
                    case 201:
                        this.props.toggleModalUpdateOther(this.props.index);
                        this.props.reloadParentAfterUpdate();
                        notify("success", "");
                    break;
                    case 208:
                        notify("warning", dateOther);
                    break;
                    default:
                        notify("warning", "");
                        break;
                };
            }).catch((error) => {
            console.log(error);
            notify("error", "");
        });
        actions.setSubmitting(true);
    }

    getIdFileToDelete(idDoc, fileName) {
        this.state.docToDelete.push([idDoc, fileName]);
        const docArray = [];
        const autresVariablesDePaieTemp = this.state.autresVariablesDePaie;
        this.state.autresVariablesDePaie.wrapperDocumentList.forEach(document => {
            if(document.id !== idDoc) {
                docArray.push(document);
            }
        })
        autresVariablesDePaieTemp.wrapperDocumentList = docArray;
        this.setState({ autresVariablesDePaie: autresVariablesDePaieTemp});
        this.props.reloadParentAfterUpdate();
    }

    removeFile() {
        this.state.docToDelete.map((doc) => (
            AxiosCenter.deleteDocumentWithFile(doc[0], doc[1])
            .then((response) => {
                console.log(response);
            })
        ))
        this.props.reloadParentAfterUpdate();
    }

    checkFormat = () => {
        const acceptedFormats = ["application/pdf", "image/png", "image/jpg", "image/jpeg"]
        let wrongFormat = false;
        Array.from(this.state.fileList).forEach(file => {
            if (acceptedFormats.indexOf(file.type) === -1)
                wrongFormat = true;
        })
        return wrongFormat;
    }

    uploadFiles = (autresVariableId) => {
        let errorDetected = false;
        let nbFiles = 0;
        for (const file of this.state.fileList) {
            nbFiles++;
            errorDetected = this.uploadFile(file, autresVariableId, nbFiles);
        }
        return errorDetected;
    }

    uploadFile = (file, autresVariableId, fileNumber) => {
        let errorDetected = false;
        let formData = new FormData();
        formData.append("file", file);
        formData.append("absenceId", "-1");
        formData.append("noteDeFraisId", "-1");
        formData.append("autresVariableId", autresVariableId);
        formData.append("fileNumber", fileNumber);
        formData.append("timestamp", Date.now());
        AxiosCenter.uploadFile(formData)
            .catch((error) => {
                errorDetected = true;
                console.log(error);
            });
        return errorDetected;
    }

    fileInputHandler = (files) => {
        this.setState({
            fileList: files
        })
    }


    render() {
        return (
            <MDBContainer>
                <div>
                    <MDBCardHeader color={"teal accent-4"}>
                        <MDBCardTitle tag="h4">Autres</MDBCardTitle>
                    </MDBCardHeader>
                </div>
                <div className="d-flex justify-content-center">
                    <Formik initialValues={{
                        id: this.props.other.id,
                        date: this.props.other.date,
                        description: this.props.other.description,
                        montant: this.props.other.montant,
                        justificatif: this.props.other.justificatif,
                        etatVariablePaieId: this.props.other.etatVariablePaieId,
                        employeId: this.props.other.employeId,
                        mois: this.props.other.mois,
                        annee: this.props.other.annee
                    }}
                            onSubmit={this.submit}
                            validationSchema={otherSchema(this.state)}
                    >
                        {({
                                handleSubmit
                            }) => (
                            <Form onSubmit={handleSubmit}
                                    className="w-100"
                            >
                                <MDBCardBody style={{marginTop: "-3%", marginBottom: "-3%"}}>
                                    <MDBRow between around>
                                        <MDBCol md="4">
                                            {/* description */}
                                            <Field
                                                name="description"
                                                label="Description* :"
                                                component={ComponentTextArea}
                                            />
                                            <ErrorMessage name="description" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            {/* date */}
                                            <Field
                                                name="date"
                                                label="Date* :"
                                                startdate={this.state.startPeriod}
                                                enddate={this.state.endPeriod}
                                                component={ComponentDate}
                                            />
                                            <ErrorMessage name="date" component={ComponentError}/>
                                            {/* montant */}
                                            <Field
                                                name="montant"
                                                label="Montant*"
                                                component={ComponentNumber}
                                            />
                                            <ErrorMessage name="montant" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow between around style={{marginTop: "-5%"}}>
                                        {/* upload */}
                                        <Field
                                            fileInputHandler={this.fileInputHandler}
                                            component={ComponentUploadFiles}
                                        />
                                    </MDBRow>
                                    <MDBRow center style={{marginTop: "5%"}}>
                                            <MDBListGroup style={{width: "80%"}}>
                                                {this.state.autresVariablesDePaie.wrapperDocumentList.map((doc, index) => (
                                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center" key={doc.id} >
                                                        {doc.nom}<MDBIcon onClick={() => this.getIdFileToDelete(doc.id, doc.nom, index)} icon="times" size="lg" className="red-text pr-3" style={{cursor:'pointer'}} />
                                                    </MDBListGroupItem>
                                                ))}
                                            </MDBListGroup>
                                        </MDBRow>
                                    <MDBRow center>
                                        <MDBBtn
                                            color="teal accent-3"
                                            rounded
                                            size="sm"
                                            type="submit"
                                        >
                                            Enregistrer
                                        </MDBBtn>
                                        <MDBBtn
                                            color="teal accent-3"
                                            rounded
                                            size="sm"
                                            onClick={() => this.props.toggleModalUpdateOther(this.props.index)}
                                        >
                                            Annuler
                                        </MDBBtn>
                                    </MDBRow>
                                </MDBCardBody>
                            </Form>
                        )}
                    </Formik>
                </div>
            </MDBContainer>
        )
    }
}

export default ModifyOtherPayrollVariable;