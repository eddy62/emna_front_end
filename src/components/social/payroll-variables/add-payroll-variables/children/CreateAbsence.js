import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBFileInput, MDBInput, MDBRow} from "mdbreact";
import Loading from "../../../../../shared/component/Loading"
import {toast} from "react-toastify";

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

const notify = type => {
    const variable = "Absence"
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>{variable} Enregistrée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistrée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "formatError":
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistrée &nbsp;&nbsp;!
                        <br/>Format de fichier invalide &nbsp;&nbsp;!
                        <br/>Seuls les formats PDF, PNG, JPEG et JPG sont acceptés.</strong>
                </div>
            );
            break;
        case "fileError":
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistrée &nbsp;&nbsp;!
                        <br/>Un problème est survenu à cause du fichier.</strong>
                </div>
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistrée &nbsp;&nbsp;!</strong>
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
            startPeriod: "",
            endPeriod: "",
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

    submit = (values, actions) => {
        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;
        if (!this.checkFormat()) {
            AxiosCenter.createAbsence(values)
                .then(async (response) => {
                    const errorDetected = await this.uploadFiles(response.data.id);
                    if (errorDetected) {
                        /* TODO Une fois deleteFile OK, supprimer en cascade toutes les entités + files
                            (en cas d'envoi de multiples document en 1 variable) */
                        AxiosCenter.deleteAbsence(response.data.id).catch((error) => {
                            console.log(error);
                        })
                        notify("fileError");
                        this.props.handleReset("Absence");
                    } else {
                        actions.setSubmitting(true);
                        notify("success");
                        this.props.handleReset("Absence");
                    }
                }).catch((error) => {
                console.log(error);
                notify("error");
                this.props.handleReset("Absence");
            });
        } else {
            notify("formatError");
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

    updatePeriod() {
        this.state.startPeriod = new Date(new Date()
            .setFullYear(
                this.props.yearSelected,
                this.props.monthSelected - 1,
                1
            )).toISOString().slice(0, 10);
        this.state.endPeriod = new Date(new Date()
            .setFullYear(
                this.props.yearSelected,
                this.props.monthSelected,
                0
            )).toISOString().slice(0, 10);
    }


    render() {
        if (!this.state.loaded) return <Loading/>
        else return (
            this.updatePeriod(),
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