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

// TODO refactoring selon tache upload
const ComponentUpload = () => (
    <div>
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
            <label className="custom-control-label" htmlFor="defaultUnchecked">Justificatif(s)</label>
        </div>
        <MDBBtn
            disabled={true}
            color="teal accent-3"
            rounded
            size="sm"
            type="submit">
            Upload
        </MDBBtn>
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
                    <strong>Absence Enregistrée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Absence NON Enregistrée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
    }
}

class CreateAbsence extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            absenceTypesList: [],
            loaded: false,
            startPeriod: "",
            endPeriod: ""
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
        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;
        AxiosCenter.createAbsence(values)
            .then(() => {
                notify("success");
                actions.resetForm();
            }).catch((error) => {
            console.log(error);
            notify("error");
        });
        actions.setSubmitting(true);
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
                                        <MDBRow between around style={{marginTop: "-5%"}}>
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
                                            <MDBCol md="4">
                                                {/* upload justificatifs */}
                                                <Field
                                                    name="justificatifs"
                                                    component={ComponentUpload}
                                                />
                                                <ErrorMessage name="justificatifs" component={ComponentError}/>
                                            </MDBCol>
                                            <MDBCol md="4" className="mt-4">
                                                <MDBBtn
                                                    color="teal accent-3"
                                                    rounded
                                                    size="sm"
                                                    type="submit"
                                                >Enregistrer
                                                </MDBBtn>
                                            </MDBCol>
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