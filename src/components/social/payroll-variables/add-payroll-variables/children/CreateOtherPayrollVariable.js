import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBFileInput, MDBInput, MDBRow} from "mdbreact";
import {toast} from "react-toastify";
import NotificationService from "../../../../../shared/services/NotificationService";

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
            textFieldTitle="Justificatif(s)"
            multiple
            btnColor="teal accent-3"
            getValue={props.fileInputHandler}
        />
    </div>
);

class CreateOtherPayrollVariable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            endPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
            fileList: []
        };
    }

    submit = (values, actions) => {
        const entityName = "Autre Variable de Paie"

        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;

        if (!this.checkFormat()) {
            AxiosCenter.createOtherPayrollVariable(values)
                .then(async (response) => {
                    const statut = response.status;
                    const dateOtherPayroll = this.props.dateFormat(response.data.date);
                    const errorDetected = await this.uploadFiles(response.data.id)
                    if (errorDetected) {
                        /* TODO Une fois deleteFile OK, supprimer en cascade toutes les entités + files
                            (en cas d'envoi de multiples document en 1 variable) */
                        AxiosCenter.deleteOtherPayrollVariable(response.data.id).catch((error) => {
                            console.log(error);
                        })
                        NotificationService.uploadFileError(entityName);
                        this.props.handleReset("OtherPayrollVariable");
                    } else {
                        switch(statut) {
                            case 201:
                                NotificationService.successRegistration(entityName);
                                actions.setSubmitting(true);
                                this.props.handleReset("OtherPayrollVariable");
                            break;
                            case 208:
                                NotificationService.employeeWasAbsent(entityName, dateOtherPayroll);
                            break;
                            default:
                                NotificationService.failedRegistration(entityName);
                                break;
                        }
                    }
                }).catch((error) => {
                console.log(error);
                NotificationService.failedRegistration(entityName);
                this.props.handleReset("OtherPayrollVariable");
            });
        } else {
            NotificationService.wrongFileFormatError(entityName)
            this.props.handleReset("OtherPayrollVariable");
        }
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

    uploadFiles = async (autresVariableId) => {
        let errorDetected = false;
        let nbFiles = 0;
        for await (const file of this.state.fileList) {
            nbFiles++;
            errorDetected = await this.uploadFile(file, autresVariableId, nbFiles);
        }
        return errorDetected;
    }

    uploadFile = async (file, autresVariableId, fileNumber) => {
        let errorDetected = false;
        let formData = new FormData();
        formData.append("file", file);
        formData.append("absenceId", "-1");
        formData.append("noteDeFraisId", "-1");
        formData.append("autresVariableId", autresVariableId);
        formData.append("fileNumber", fileNumber);
        formData.append("timestamp", Date.now());
        await AxiosCenter.uploadFile(formData)
            .catch((error) => {
                errorDetected = true;
                console.log(error);
            })
        return errorDetected;
    }

    fileInputHandler = (value) => {
        this.setState({
            fileList: value
        })
    }

    render() {
        return (
            <MDBContainer>
                <div className="d-flex justify-content-center">
                    <Formik initialValues={{
                        id: null,
                        date: "",
                        description: "",
                        montant: 0,
                        justificatif: "",
                        etatVariablePaieId: 1,
                        employeId: "",
                        mois: "",
                        annee: ""
                    }}
                            onSubmit={this.submit}
                            validationSchema={otherSchema(this.state)}
                    >
                        {({
                                dirty,
                                handleSubmit,
                                isSubmitting
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
                                    <br/>
                                    {/* upload */}
                                    <Field
                                        fileInputHandler={this.fileInputHandler}
                                        component={ComponentUploadFiles}
                                    />
                                    <MDBRow between around className="mt-3">
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
                                                disabled={(!dirty || isSubmitting) && this.state.fileList.length === 0}
                                                onClick={() => {this.props.handleReset("OtherPayrollVariable")}}
                                            >Réinitialiser
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

export default CreateOtherPayrollVariable;