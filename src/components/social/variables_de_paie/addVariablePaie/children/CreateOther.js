import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
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
                    <strong>Autre Variable de Paie Enregistrée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Autre Variable de Paie NON Enregistrée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
    }
}

class CreateOther extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startPeriod: "",
            endPeriod: ""
        };
    }

    submit = (values, actions) => {
        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;
        AxiosCenter.createOther(values)
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
        return (
            this.updatePeriod(),
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
                                            </MDBCol>
                                            <MDBCol md="4">
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
                                        <MDBRow between around className="mt-3">
                                            <MDBCol md="4">
                                                {/* upload justificatif */}
                                                <Field
                                                    name="justificatif"
                                                    component={ComponentUpload}
                                                />
                                                <ErrorMessage name="justificatif" component={ComponentError}/>
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

export default CreateOther;