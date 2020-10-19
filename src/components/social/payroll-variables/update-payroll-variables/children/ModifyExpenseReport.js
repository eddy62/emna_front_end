import React from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from "yup";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow, MDBCardHeader, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBIcon, MDBFileInput} from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";

const noteDeFraisSchema = (props) => {
    return Yup.object().shape({
        date: Yup.date().required("Date obligatoire*")
            .min(props.startPeriod, "Date erronée")
            .max(props.endPeriod, "Date erronée"),
        montant: Yup.number().required("Montant obligatoire*")
            .min("0.01", "Ne peut être un montant nul ou négatif"),
        designation: Yup.string().required("Désignation obligatoire*")
    })
};

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

const ComponentDesignation = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        outline
        type="text"
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
    const variable = "Note de Frais"
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>{variable} modifiée &nbsp;&nbsp;!</strong>
                </div>,
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
                    <strong>{variable} NON modifiée  &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON modifiée  &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

class ModifyExpenseReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            endPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
            docToDelete: [],
            fileList: [],
            noteDeFrais: this.props.noteDeFrais
        };
    }

    componentWillUnmount() {
        this.props.reloadParentAfterUpdate();
    }

    submit = (values, actions) => {
        if(this.state.docToDelete.length) {
            this.removeFile();
        }
        if(this.state.fileList.length) {
            this.uploadFiles(values.id);
            console.log(values.id);
        }
        AxiosCenter.updateExpenseReport(values)
            .then((response) => {
                const statut = response.status;
                console.log(response.data.date);
                const dateExpRept = this.props.dateFormat(response.data.date);
                switch(statut) {
                    case 201:
                        this.props.toggleNoteDeFrais(this.props.index);
                        this.props.reloadParentAfterUpdate();
                        notify("success", "");
                        /*actions.setSubmitting(true);
                        this.props.handleReset("ExpenseReport");*/
                    break;
                    case 208:
                        notify("warning", dateExpRept);
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
    };

    getIdFileToDelete(idDoc, fileName) {
        this.state.docToDelete.push([idDoc, fileName]);
        const docArray = [];
        const noteDeFraisTemp = this.state.noteDeFrais;
        this.state.noteDeFrais.wrapperDocumentList.forEach(document => {
            if(document.id !== idDoc) {
                docArray.push(document);
            }
        })
        noteDeFraisTemp.wrapperDocumentList = docArray;
        this.setState({ noteDeFrais: noteDeFraisTemp});
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

    uploadFiles = (noteDeFraisId) => {
        let errorDetected = false;
        let nbFiles = 0;
        for (const file of this.state.fileList) {
            nbFiles++;
            errorDetected = this.uploadFile(file, noteDeFraisId, nbFiles);
        }
        return errorDetected;
    }

    uploadFile = (file, noteDeFraisId, fileNumber) => {
        let errorDetected = false;
        let formData = new FormData();
        formData.append("file", file);
        formData.append("absenceId", "-1");
        formData.append("noteDeFraisId", noteDeFraisId );
        formData.append("autresVariableId", "-1");
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
                <div>
                    <MDBContainer>
                        <div>
                            <MDBCardHeader color={"teal accent-4"} >
                                <MDBCardTitle tag="h4">Notes de Frais</MDBCardTitle>
                            </MDBCardHeader>
                        </div>
                        {/* Formulaire */}
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{
                                annee: this.props.noteDeFrais.annee,
                                date: this.props.noteDeFrais.date,
                                designation: this.props.noteDeFrais.designation,
                                employeId: this.props.noteDeFrais.employeId,
                                etatVariablePaieId: this.props.noteDeFrais.etatVariablePaieId,
                                id: this.props.noteDeFrais.id,
                                justificatif: this.props.noteDeFrais.justificatif,
                                mois: this.props.noteDeFrais.mois,
                                montant: this.props.noteDeFrais.montant,

                            }}
                            validationSchema={noteDeFraisSchema(this.state)}
                        >
                            {({
                                    handleSubmit
                                }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody>
                                        <MDBRow between around>
                                            {/* ligne 1 */}
                                            <MDBCol md="4" className="mt-3">
                                                <Field
                                                    name="date"
                                                    label="Le* :"
                                                    startdate={this.state.startPeriod}
                                                    enddate={this.state.endPeriod}
                                                    component={ComponentDate}
                                                />
                                                <ErrorMessage
                                                    name="date"
                                                    component={ComponentError}
                                                />
                                            </MDBCol>
                                            {/* ligne 2 */}
                                            <MDBCol md="4" style={{marginTop: "-1%"}}>
                                                <Field
                                                    name="montant"
                                                    label="Montant*"
                                                    component={ComponentNumber}
                                                />
                                                <ErrorMessage
                                                    name="montant"
                                                    component={ComponentError}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        {/* désignation */}
                                        <MDBRow between around style={{marginTop: "-5%"}}>
                                            {/* upload */}
                                            <Field
                                                fileInputHandler={this.fileInputHandler}
                                                component={ComponentUploadFiles}
                                            />
                                            <MDBCol md="5">
                                                <Field
                                                    name="designation"
                                                    label="Désignation*"
                                                    component={ComponentDesignation}
                                                />
                                                <ErrorMessage name="designation" component={ComponentError}/>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow center style={{marginTop: "5%"}}>
                                            <MDBListGroup style={{width: "80%"}}>
                                                {this.state.noteDeFrais.wrapperDocumentList.map((doc, index) => (
                                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center" key={doc.id} >
                                                        {doc.nom}<MDBIcon onClick={() => this.getIdFileToDelete(doc.id, doc.nom, index)} icon="times" size="lg" className="red-text pr-3" style={{cursor:'pointer'}} />
                                                    </MDBListGroupItem>
                                                ))}
                                            </MDBListGroup>
                                        </MDBRow>
                                        <MDBRow center>
                                            {/* ligne 3 */}
                                            <MDBBtn
                                                color="teal accent-3"
                                                rounded
                                                size="sm"
                                                type="submit"
                                            >Enregistrer
                                            </MDBBtn>
                                            <MDBBtn
                                                color="teal accent-3"
                                                rounded
                                                size="sm"
                                                onClick={() => this.props.toggleNoteDeFrais(this.props.index)}
                                            >Annuler
                                            </MDBBtn>
                                        </MDBRow>
                                    </MDBCardBody>
                                </Form>
                            )}
                        </Formik>
                    </MDBContainer>
                </div>
        )
    }
}

export default ModifyExpenseReport;