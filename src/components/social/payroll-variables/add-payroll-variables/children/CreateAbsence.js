import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBFileInput, MDBInput, MDBRow} from "mdbreact";
import Loading from "../../../../../shared/component/Loading"
import {toast} from "react-toastify";
import NotificationService from "../../../../../shared/services/NotificationService";

const absenceSchema = (props) => {
    return Yup.object().shape({
        debutAbsence: Yup.date()
            .required("Date obligatoire")
            .min(props.startPeriod, "Date erronée")
            .max(props.endPeriod, "Date erronée"),
        finAbsence: Yup.date()
            .required("Date obligatoire")
            .min(props.startPeriod, "Date erronée")
            .max(props.endPeriod, "Date erronée")
            .min(Yup.ref('debutAbsence'),
                "La date de fin ne peut pas être antérieure à la date de début")
    })
};

const ComponentSelect = ({field, ...props}) => (
    <div>
        <label style={{fontSize: "0.8rem", color: "#757575", marginLeft: "-70%"}}> {props.label} </label>
        <select className="form-control browser-default custom-select"
                name={props.name}  {...props} {...field}
        >
            {props.list.map((object) => (
                <option key={object.id} value={object.id}>{object.intitule}</option>))}
        </select>
    </div>
);

const ComponentDate = ({field, ...props}) => (
    <div>
        <MDBInput
            label={props.label}
            outline
            type="date"
            min={props.startdate}
            max={props.enddate}
            {...field}
        />
    </div>

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

const notify = (type, message) => {
    const variable = "Absence"
    switch (type) {
        case "warning":
            toast.warning(
                <div className="text-center">
                    <strong>{variable} non enregistrée : une {variable} existe déjà {message} !</strong>
                </div>
            );
            break;
        case "severalPayroll":
            toast.warning(
                <div className="text-center">
                    <strong>{variable} non enregistrée : plusieurs autres variables de paie existent entre le {message} !</strong>
                </div>
            );
            break;
        case "warningOther":
            toast.warning(
                <div className="text-center">
                    <strong>{variable} non enregistrée : une Autre Variable existe entre le {message} !</strong>
                </div>
            );
            break;
        case "warningOvertime":
            toast.warning(
                <div className="text-center">
                    <strong>{variable} non enregistrée : une Heure Supplémentaire existe entre le {message} !</strong>
                </div>
            );
            break;
        case "warningExpenseReport":
            toast.warning(
                <div className="text-center">
                    <strong>{variable} non enregistrée : une Note de Frais existe entre le {message} !</strong>
                </div>
            );            
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistrée {message} !</strong>
                </div>
            );
            break;
    }
};

class CreateAbsence extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            absenceTypesList: [],
            loaded: false,
            startPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            endPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
            fileList: []
        };
    }

    componentDidMount() {
        AxiosCenter.getAllAbsenceTypes()
            .then((response) => {
                this.setState({
                    absenceTypesList: response.data,
                    loaded: true
                })
            }).catch((error) => {
            console.log(error);
        });
    }

    formatDate(date) {
        const bothDateSplit = date.split('/');
        const firstDate = bothDateSplit[0];
        const secondDate = bothDateSplit[1];
        const firstDateSplit = firstDate.split('-')
        const secondDateSplit = secondDate.split('-')
        const yearFirstDate = firstDateSplit[0];
        const monthFirstDate = firstDateSplit[1];
        const dayFirstDate = firstDateSplit[2];
        const yearSecondDate = secondDateSplit[0];
        const monthSecondDate = secondDateSplit[1];
        const daySecondDate = secondDateSplit[2];
        return dayFirstDate+"/"+monthFirstDate+"/"+yearFirstDate+" et le "+daySecondDate+"/"+monthSecondDate+"/"+yearSecondDate;
    }

    submit = (values, actions) => {
        const entityName = "Absence";

        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;

        if (!this.checkFormat()) {
            AxiosCenter.createAbsence(values)
                .then(async (response) => {
                    console.log(response);
                    const statut = response.status;
                    const message = " du " + this.props.dateFormat(response.data.debutAbsence) + " au " + this.props.dateFormat(response.data.finAbsence);
                    const errorDetected = await this.uploadFiles(response.data.id);
                    if (errorDetected) {
                        /* TODO Une fois deleteFile OK, supprimer en cascade toutes les entités + files
                            (en cas d'envoi de multiples document en 1 variable) */
                        AxiosCenter.deleteAbsence(response.data.id).catch((error) => {
                            console.log(error);
                        })
                        NotificationService.uploadFileError(entityName);
                        this.props.handleReset("Absence");
                    } else {
                        switch(statut) {
                            case 201:
                                NotificationService.successRegistration(entityName);
                                actions.setSubmitting(true);
                                this.props.handleReset("Absence");
                            break;
                            case 208:
                                notify("warning", message);
                            break;
                            default:
                                NotificationService.failedRegistration(entityName);
                                break;
                        }
                    }
                }).catch((error) => {
                    const dateFormat = error.response.data.entityName;
                    console.log(error.response.data.errorKey);
                    switch(error.response.data.errorKey) {
                        case "Autre Variable":
                            notify("warningOther", this.formatDate(dateFormat));
                        break;
                        case "Heure Supplementaire":
                            notify("warningOvertime", this.formatDate(dateFormat));
                        break;
                        case "Note de Frais":
                            notify("warningExpenseReport", this.formatDate(dateFormat));
                        break;         
                        case "Plusieurs":
                            notify("severalPayroll", this.formatDate(dateFormat));
                        break;               
                        default:
                            NotificationService.failedRegistration(entityName);
                            break;
                    }
                /*console.log(error);
                notify("error", "");
                this.props.handleReset("Absence");*/
            });
        } else {
            NotificationService.wrongFileFormatError(entityName);
            this.props.handleReset("Absence");
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

    uploadFiles = async (absenceId) => {
        let errorDetected = false;
        let nbFiles = 0;
        for await (const file of this.state.fileList) {
            nbFiles++;
            errorDetected = await this.uploadFile(file, absenceId, nbFiles);
        }
        return errorDetected;
    }

    uploadFile = async (file, absenceId, fileNumber) => {
        let errorDetected = false;
        let formData = new FormData();
        formData.append("file", file);
        formData.append("absenceId", absenceId);
        formData.append("noteDeFraisId", "-1");
        formData.append("autresVariableId", "-1");
        formData.append("fileNumber", fileNumber);
        formData.append("timestamp", Date.now());
        await AxiosCenter.uploadFile(formData)
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
        if (!this.state.loaded) return <Loading/>
        else return (
            <MDBContainer>
                <div className="d-flex justify-content-center">
                    <Formik initialValues={{
                        id: null,
                        debutAbsence: "",
                        finAbsence: "",
                        justificatif: "",
                        typeAbsenceId: 1,
                        etatVariablePaieId: 1,
                        employeId: "",
                        mois: "",
                        annee: ""
                    }}
                            onSubmit={this.submit}
                            validationSchema={absenceSchema(this.state)}
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
                                            {/* date debut absence */}
                                            <Field
                                                name="debutAbsence"
                                                label="Du* :" className="mt-1"
                                                startdate={this.state.startPeriod}
                                                enddate={this.state.endPeriod}
                                                component={ComponentDate}
                                            />
                                            <ErrorMessage name="debutAbsence" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            {/* date fin absence */}
                                            <Field
                                                name="finAbsence"
                                                label="Au* :"
                                                startdate={this.state.startPeriod}
                                                enddate={this.state.endPeriod}
                                                component={ComponentDate}
                                            />
                                            <ErrorMessage name="finAbsence" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    <br/>
                                    <MDBRow between around style={{marginTop: "-5%"}}>
                                        {/* upload */}
                                        <Field
                                            fileInputHandler={this.fileInputHandler}
                                            component={ComponentUploadFiles}
                                        />
                                        {/* select type absence */}
                                        <Field
                                            name="typeAbsenceId"
                                            label="Type :"
                                            list={this.state.absenceTypesList}
                                            component={ComponentSelect}
                                        />
                                        <ErrorMessage name="typeAbsenceId" component={ComponentError}/>
                                    </MDBRow>
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
                                                onClick={() => {this.props.handleReset("Absence")}}
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

export default CreateAbsence;