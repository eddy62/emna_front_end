import React from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from "yup";
import Loading from "../../../../../shared/component/Loading";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow,} from "mdbreact";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const avanceRappelSchema = (props) => {
    return Yup.object().shape({
        debutPeriode: Yup.date().required("Date Obligatoire*")
            .min(props.minDate, "Date erronée")
            .max(props.maxDate, "Date erronée"),
        finPeriode: Yup.date().required("Date Obligatoire*")
            .min(props.minDate, "Date erronée")
            .max(props.maxDate, "Date erronée")
            .min(Yup.ref('debutPeriode'), /* Doit être appelé après les props */
                "La date de fin ne peut pas être antérieure la date de début"),

        type: Yup.string().required("Type obligatoire*"),
        montant: Yup.number().required("Montant obligatoire*")
            .min("0.01", "Ne peut être un montant nul ou négatif"),
    })
};

const notify = (type, nom) => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>{nom} sur salaire Enregistré(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>{nom} sur salaire NON Enregistré(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{nom} sur salaire NON Enregistré(e) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantDate = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        outline
        type="date"
        min={props.debutdate}
        max={props.findate}
        {...props}
        {...field}
    />
);

const ComposantNumber = ({field, ...props}) => (
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

class CreatePaydayAdvanceReminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minDate: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            maxDate: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
            loaded: false,
        };
    }

    componentDidMount() {
        this.setState({
            loaded: true,
        });
    }

    submit = (values, actions) => {
        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;

        AxiosCenter.createPaydayAdvanceOrReminder(values)
            .then(() => {
                notify("success", values.type);
                actions.resetForm();
            }).catch((error) => {
            console.log(error);
            notify("error", values.type);
        });
        actions.setSubmitting(true);
    };

    render() {
        if (!this.state.loaded) return <Loading/>
        else return (
            <div className="App">
                <div className="titre">
                    <MDBContainer>
                        {/* Formulaire */}
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{
                                annee: "",
                                debutPeriode: "",
                                employeId: "",
                                etatVariablePaieId: 1,
                                finPeriode: "",
                                id: null,
                                mois: "",
                                montant: 0,
                                type: "",
                            }}
                            validationSchema={avanceRappelSchema(this.state)}
                        >
                            {({
                                    dirty,
                                    handleBlur,
                                    handleChange,
                                    handleReset,
                                    handleSubmit,
                                    values,
                                    isSubmitting
                                }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody style={{marginTop: "-5%", marginBottom: "-3%"}}>
                                        <MDBRow between around>
                                            {/* ligne 1 */}
                                            <MDBCol md="4" className="mt-3">
                                                <Field
                                                    name="debutPeriode"
                                                    label="Du* :"
                                                    debutdate={this.state.minDate}
                                                    findate={this.state.maxDate}
                                                    component={ComposantDate}
                                                />
                                                <ErrorMessage
                                                    name="debutPeriode"
                                                    component={ComposantErreur}
                                                />
                                            </MDBCol>
                                            <MDBCol md="4" className="mt-3">
                                                <Field
                                                    name="finPeriode"
                                                    label="Au* :"
                                                    debutdate={this.state.minDate}
                                                    findate={this.state.maxDate}
                                                    component={ComposantDate}
                                                />
                                                <ErrorMessage
                                                    name="finPeriode"
                                                    component={ComposantErreur}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow between around>
                                            {/* ligne 2 */}
                                            <MDBCol md="4" className="mt-3">
                                                <select
                                                    className="browser-default custom-select"
                                                    name="type"
                                                    value={values.type}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option value="" disabled>
                                                        Type*
                                                    </option>
                                                    <option value="Rappel">Rappel</option>
                                                    <option value="Avance">Avance</option>
                                                </select>
                                                <ErrorMessage
                                                    name="type"
                                                    component={ComposantErreur}
                                                />
                                            </MDBCol>
                                            <MDBCol md="4" style={{marginTop: "-1%"}}>
                                                <Field
                                                    name="montant"
                                                    label="Montant*"
                                                    component={ComposantNumber}
                                                />
                                                <ErrorMessage
                                                    name="montant"
                                                    component={ComposantErreur}
                                                />
                                            </MDBCol>
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
                                                disabled={!dirty || isSubmitting}
                                                onClick={handleReset}
                                            >Réinitialiser
                                            </MDBBtn>
                                        </MDBRow>
                                    </MDBCardBody>
                                </Form>
                            )}
                        </Formik>
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

export default CreatePaydayAdvanceReminder;