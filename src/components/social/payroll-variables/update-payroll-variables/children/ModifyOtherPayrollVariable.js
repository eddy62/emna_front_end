import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
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

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Autre Variable de Paie Modifiée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Autre Variable de Paie NON Modifiée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Autre Variable de Paie NON Modifiée &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
    }
}

class ModifyOtherPayrollVariable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startPeriod: "",
            endPeriod: ""
        };
    }

    submit = (values, actions) => {
        AxiosCenter.modifyOtherPayrollVariable(values)
            .then(() => {
                this.props.toggleModalUpdateOther(this.props.index);
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
                this.props.other.annee,
                this.props.other.mois - 1,
                1
            )).toISOString().slice(0, 10);
        this.state.endPeriod = new Date(new Date()
            .setFullYear(
                this.props.other.annee,
                this.props.other.mois,
                0
            )).toISOString().slice(0, 10);
    }

    render() {
        return (
            this.updatePeriod(),
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