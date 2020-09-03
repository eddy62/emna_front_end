import React from "react";
//import "./style2.scss";
import {Formik, Form, Field, ErrorMessage, setNestedObjectValues} from 'formik';
import * as Yup from "yup";
import Loading from "../../../../../shared/component/Loading";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
} from "mdbreact";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast, ToastContainer} from "react-toastify";

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
        //justificatif: ?
    })
};

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) Enregistrée(s) &nbsp;&nbsp;!</strong>
                </div>,
                //{position: "top-right"}
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) NON Enregistrée(s) &nbsp;&nbsp;!</strong>
                </div>,
                //{position: "top-right"}
            );
            break;
    }
};

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantDate = ({field, form: {touched, errors}, ...props}) => (
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

const ComposantNumber = ({field, form: {touched, errors}, ...props}) => (
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

class CreateAvanceRappelSalaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            //yearSelected: 2020, // TODO To Delete
            //idEmploye: 1, // TODO To Delete
            //monthSelected: 9, // TODO To Delete
            employeId: this.props.employeId,
            minDate: new Date(new Date()
                .setFullYear(2020, // TODO this.props.yearSelected
                    9 - 1, // TODO this.props.monthSelected */ /* January = 0, December = 11 */
                    1))
                .toISOString().slice(0, 10), // TODO Format YYYY-MM-DD
            maxDate: new Date(new Date()
                .setFullYear(2020, // TODO this.props.yearSelected
                    9, // TODO this.props.monthSelected
                    0)) /* To get the last day of the last month */
                .toISOString().slice(0, 10),
            loaded: false,
        };
    }

    componentDidMount() {
        this.setState({
            employeId: this.props.employeId,
            loaded: true
        });
    }

    submit = (values, actions) => {
        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;
        //console.log(values);
        //console.log(this.props.employeId);
        AxiosCenter.createAvanceRappelSalaire(values)
            .then((response) => {
                const avanceRappelSalaire = response.data
                notify("success");
                actions.resetForm();
                console.log(avanceRappelSalaire)
            }).catch((error) => {
            console.log(error);
            notify('error');
        });
        actions.setSubmitting(true);
    };

    render() {
        if (!this.state.loaded) return <Loading/>;
        const title = "Avance/Rappel sur salaire"
        return (
            <div className="App">
                <div className="titre">
                    <MDBContainer>
                        {/* Formulaire */}
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{
                                annee: "",  //Props reçu du composant parent
                                debutPeriode: "",
                                employeId: "",  //Props reçu du composant parent
                                etatVariablePaieId: 1,
                                finPeriode: "",
                                id: null,
                                mois: "",   //Props reçu du composant parent
                                montant: 0,
                                type: "",
                            }}
                            validationSchema={avanceRappelSchema(this.state)}
                        >
                            {({
                                  handleBlur,
                                  handleChange,
                                  handleReset,
                                  handleSubmit,
                                  values,
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody style={{marginTop:"-5%", marginBottom:"-3%"}}>
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
                                                    <option value="RAPPEL">Rappel</option>
                                                    <option value="AVANCE">Avance</option>
                                                </select>
                                                <ErrorMessage
                                                    name="type"
                                                    component={ComposantErreur}
                                                />
                                            </MDBCol>
                                            <MDBCol md="4" style={{marginTop:"-1%"}}>
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
                                            <ToastContainer
                                                    hideProgressBar={false}
                                                    newestOnTop={true}
                                                    autoClose={2500}
                                                />
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

export default CreateAvanceRappelSalaire;