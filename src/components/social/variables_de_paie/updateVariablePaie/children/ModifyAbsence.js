import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
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

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Absence Modifiée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Absence NON Modifiée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Absence NON Modifiée &nbsp;&nbsp;!</strong>
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
            startPeriod: "",
            endPeriod: "",
        };
    }

    componentDidMount() {
        AxiosCenter.getAllTypesAbsence()
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
        AxiosCenter.updateAbsence(values)
            .then(() => {
                this.props.toggleModalUpdateAbsence(this.props.index);
                this.props.reloadParentAfterUpdate();
                notify("success");
            }).catch((error) => {
            console.log(error);
            notify("error");
        });
        actions.setSubmitting(true);
    }

    updatePeriod() {
        this.state.startPeriod = new Date(new Date()
            .setFullYear(
                this.props.absence.annee,
                this.props.absence.mois - 1,
                1
            )).toISOString().slice(0, 10);
        this.state.endPeriod = new Date(new Date()
            .setFullYear(
                this.props.absence.annee,
                this.props.absence.mois,
                0
            )).toISOString().slice(0, 10);
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        else return (
            this.updatePeriod(),
                <MDBContainer>
                    <div>
                        <Formik initialValues={{
                            id: this.props.absence.id,
                            debutAbsence: this.props.absence.debutAbsence,
                            finAbsence: this.props.absence.finAbsence,
                            justificatif: this.props.absence.justificatif,
                            typeAbsenceId: this.props.absence.typeAbsenceId,
                            etatVariablePaieId: this.props.absence.etatVariablePaieId,
                            employeId: this.props.absence.employeId,
                            mois: this.props.absence.mois,
                            annee: this.props.absence.annee
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
                                        <MDBRow center style={{marginTop: "-5%"}}>
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
                                        <MDBRow center>
                                            <MDBBtn
                                                color="teal accent-3"
                                                rounded
                                                size="sm"
                                                type="submit"
                                            >Modifier
                                            </MDBBtn>
                                            <MDBBtn
                                                color="teal accent-3"
                                                rounded
                                                size="sm"
                                                onClick={() => this.props.toggleModalUpdateAbsence(this.props.index)}>
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