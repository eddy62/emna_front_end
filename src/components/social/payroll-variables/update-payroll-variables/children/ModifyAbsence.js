import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow, MDBListGroup, MDBListGroupItem, MDBIcon, MDBFileInput} from "mdbreact";
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
            textFieldTitle="Ajouter justificatif(s)"
            multiple
            btnColor="teal accent-3"
            getValue={props.fileInputHandler}
        />
    </div>
);

const notify = (type, message) => {
    const variable = "Absence"
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
                    <strong>{variable} non Modifiée : une {variable} existe déjà {message} &nbsp;&nbsp;!</strong>
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

class ModifyAbsence extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            absenceTypesList: [],
            loaded: false,
            startPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            endPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
            docToDelete: [],
            fileList: [],
            absence: this.props.absence,
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
            console.log(error)
        });
    }

    submit = (values, actions) => {
        if(this.state.docToDelete.length) {
            this.removeFile();
        }
        if(this.state.fileList.length) {
            this.uploadFiles(values.id);
        }
        AxiosCenter.updateAbsence(values)
            .then((response) => {
                const statut = response.status;
                const message = " du " + response.data.debutAbsence + " au " + response.data.finAbsence;
                switch(statut) {
                    case 201:
                        this.props.toggleModalUpdateAbsence(this.props.index);
                        this.props.reloadParentAfterUpdate();
                        notify("success", message);
                        actions.setSubmitting(true);
                        //this.props.handleReset("Absence");
                    break;
                    case 208:
                        notify("warning", message);
                    break;
                    default:
                        notify("warning", message);
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
        const absenceTemp = this.state.absence;
        this.state.absence.wrapperDocumentList.forEach(document => {
            if(document.id !== idDoc) {
                docArray.push(document);
            }
        })
        absenceTemp.wrapperDocumentList = docArray;
        this.setState({ absence: absenceTemp});
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

    uploadFiles = (absenceId) => {
        let errorDetected = false;
        let nbFiles = 0;
        for (const file of this.state.fileList) {
            nbFiles++;
            errorDetected = this.uploadFile(file, absenceId, nbFiles);
        }
        return errorDetected;
    }

    uploadFile = (file, absenceId, fileNumber) => {
        let errorDetected = false;
        let formData = new FormData();
        formData.append("file", file);
        formData.append("absenceId", absenceId);
        formData.append("noteDeFraisId", "-1");
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
        if (!this.state.loaded) return <Loading/>
        else return (
            <MDBContainer>
                <div>
                    <MDBCardHeader color={"teal accent-4"} >
                        <MDBCardTitle tag="h4">Absences</MDBCardTitle>
                    </MDBCardHeader>
                </div>
                <div>
                    <Formik initialValues={{
                        id: this.state.absence.id,
                        debutAbsence: this.state.absence.debutAbsence,
                        finAbsence: this.state.absence.finAbsence,
                        justificatif: this.state.absence.justificatif,
                        typeAbsenceId: this.state.absence.typeAbsenceId,
                        etatVariablePaieId: this.state.absence.etatVariablePaieId,
                        employeId: this.state.absence.employeId,
                        mois: this.state.absence.mois,
                        annee: this.state.absence.annee,
                        justificatif: "",
                    }}
                            onSubmit={this.submit}
                            validationSchema={absenceSchema(this.state)}
                    >
                        {({
                                handleSubmit
                            }) => (
                            <Form onSubmit={handleSubmit}
                                    className="w-100"
                            >
                                <MDBCardBody>
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
                                        <MDBCol md="5">
                                        <Field
                                            name="typeAbsenceId"
                                            label="Type :"
                                            list={this.state.absenceTypesList}
                                            component={ComponentSelect}
                                        />
                                        <ErrorMessage name="typeAbsenceId" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow center style={{marginTop: "5%"}}>
                                        <MDBListGroup style={{width: "80%"}}>
                                            {this.state.absence.wrapperDocumentList.map((doc, index) => (
                                                <MDBListGroupItem className="d-flex justify-content-between align-items-center" key={doc.id} >
                                                    {doc.nom}<MDBIcon onClick={() => this.getIdFileToDelete(doc.id, doc.nom, index)} icon="times" size="lg" className="red-text pr-3" style={{cursor:'pointer'}} />
                                                </MDBListGroupItem>
                                            ))}
                                        </MDBListGroup>
                                    </MDBRow>
                                    <MDBRow center>
                                        <MDBBtn color="teal accent-3" rounded size="sm" type="submit">
                                            Enregistrer
                                        </MDBBtn>
                                        <MDBBtn color="teal accent-3" rounded size="sm" onClick={() => this.props.toggleModalUpdateAbsence(this.props.index)}>
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

export default ModifyAbsence;