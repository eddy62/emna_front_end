import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBFileInput, MDBInput, MDBRow} from "mdbreact";
import Loading from "../../../../../shared/component/Loading";
import {toast} from "react-toastify";
import NotificationService from "../../../../../shared/services/NotificationService";

const ComponentDesignation = ({field, ...props}) => (
    <MDBInput
        outline
        type="text"
        {...props}
        {...field}
    />
);

const ComponentDate = ({field, ...props}) => (
    <div>
        <label style={{fontSize: "0.8rem", color: "#757575", marginLeft: "-80%"}}> {props.label} </label>
        <MDBInput
            outline
            type="date"
            label="Date* :"
            min={props.startdate}
            max={props.enddate}
            {...props}
            {...field}
        />
    </div>
);

const ComponentNumber = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        min="0.01"
        step="0.01"
        outline
        type="number"
        valueDefault="0.01"
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

class CreateExpenseReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            startPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            endPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
            fileList: []
        };
    }

    componentDidMount() {
        this.setState({
            loaded: true
        })
    }

    submit = (values, actions) => {
        const entityName = "Note de Frais";

        values.employeId = this.props.employeId;
        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;

        if (!this.checkFormat()) {
            AxiosCenter.createExpenseReport(values)
                .then(async (response) => {
                    const statut = response.status;
                    const dateExpenseReport = this.props.dateFormat(response.data.date);
                    const errorDetected = await this.uploadFiles(response.data.id)
                    if (errorDetected) {
                        /* TODO Une fois deleteFile OK, supprimer en cascade toutes les entités + files
                            (en cas d'envoi de multiples document en 1 variable) */
                        AxiosCenter.deleteExpenseReport(response.data.id).catch((error) => {
                            console.log(error);
                        })
                        NotificationService.uploadFileError(entityName);
                        this.props.handleReset("ExpenseReport");
                    } else {
                        switch(statut) {
                            case 201:
                                NotificationService.successRegistration(entityName);
                                actions.setSubmitting(true);
                                this.props.handleReset("ExpenseReport");
                            break;
                            case 208:
                                NotificationService.employeeWasAbsent(entityName, dateExpenseReport);
                            break;
                            default:
                                NotificationService.failedRegistration(entityName);
                                break;
                        }
                    }
                }).catch((error) => {
                console.log(error);
                NotificationService.failedRegistration(entityName)
                this.props.handleReset("ExpenseReport");
            });
        } else {
            NotificationService.wrongFileFormatError(entityName);
            this.props.handleReset("ExpenseReport");
        }
    };

    noteDeFraisSchema = Yup.object().shape({
        designation: Yup.string().required("Désignation obligatoire"),
        date: Yup.date().required("Date obligatoire"),
        montant: Yup.number().required("Montant obligatoire").min("0.01", "Montant positif"),
    });

    checkFormat = () => {
        const acceptedFormats = ["application/pdf", "image/png", "image/jpg", "image/jpeg"]
        let wrongFormat = false;
        Array.from(this.state.fileList).forEach(file => {
            if (acceptedFormats.indexOf(file.type) === -1)
                wrongFormat = true;
        })
        return wrongFormat;
    }

    uploadFiles = async (noteDeFraisId) => {
        let errorDetected = false;
        let nbFiles = 0;
        for await (const file of this.state.fileList) {
            nbFiles++;
            errorDetected = await this.uploadFile(file, noteDeFraisId, nbFiles);
        }
        return errorDetected;
    }

    uploadFile = async (file, noteDeFraisId, fileNumber) => {
        let errorDetected = false;
        let formData = new FormData();
        formData.append("file", file);
        formData.append("absenceId", "-1");
        formData.append("noteDeFraisId", noteDeFraisId);
        formData.append("autresVariableId", "-1");
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
        if (!this.state.loaded) return <Loading/>
        else return (
            <MDBContainer>
                <div>
                    <Formik initialValues={{
                        id: null,
                        designation: "",
                        date: "",
                        montant: 0,
                        justificatif: "",
                        mois: this.props.monthSelected,
                        annee: this.props.yearSelected,
                        etatVariablePaieId: 1,
                        employeId: this.props.employeId
                    }}
                            onSubmit={this.submit}
                            validationSchema={this.noteDeFraisSchema}
                    >
                        {({
                                dirty,
                                handleSubmit,
                                isSubmitting
                            }) => (
                            <Form onSubmit={handleSubmit}>
                                <MDBCardBody style={{marginTop: "-3%", marginBottom: "-3%"}}>
                                    <MDBRow between around style={{marginTop: "-5%"}}>
                                        <MDBCol md="4">
                                            {/* date note de frais */}
                                            <Field
                                                name="date"
                                                startdate={this.state.startPeriod}
                                                enddate={this.state.endPeriod}
                                                component={ComponentDate}
                                            />
                                            <ErrorMessage name="date" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol md="4" className="mt-4">
                                            {/* montant */}
                                            <Field
                                                name="montant"
                                                label="Montant*"
                                                component={ComponentNumber}
                                            />
                                            <ErrorMessage name="montant" component={ComponentError}/>
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
                                    {/* upload justificatifs */}
                                    <MDBRow around>
                                            <div>
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
                                                    onClick={() => {this.props.handleReset("ExpenseReport")}}
                                                >Réinitialiser
                                                </MDBBtn>
                                            </div>
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

export default CreateExpenseReport;
