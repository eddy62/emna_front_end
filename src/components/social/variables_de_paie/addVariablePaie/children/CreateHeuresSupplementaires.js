import React from "react";
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
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

const heuresSupSchema = (props) => {
    return Yup.object().shape({
        date: Yup.date().required("Date Obligatoire*")
            .min(props.debutPeriode, "Date erronée")
            .max(props.finPeriode, "Date erronée"),
        nombreHeure: Yup.number().required("Heures obligatoires*")
            .min(1, "1 heure minimum"),
        //justificatif: ?
    })
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
        min="1"
        outline
        type="number"
        valueDefault="1"
        {...props}
        {...field}
    />
);

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

class CreateHeuresSupplementaires extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            debutPeriode: '',
            finPeriode: '',
        }
    };

    componentDidMount() {
        this.setState({
            loaded: true
        });
    }

    submit = (values, actions) => {
        values.annee = this.props.yearSelected
        values.mois = this.props.monthSelected
        values.employeId = this.props.idEmploye

        AxiosCenter.createHeureSupplementaire(values)
            .then((response) => {
                const heureSup = response.data;
                console.log(heureSup);
                notify('success');
                actions.resetForm();
            }).catch((error) => {
            console.log(error);
            notify('error');
        });
        actions.setSubmitting(true);
    };

    updatePeriod() {
        this.state.debutPeriode = new Date(new Date()
            .setFullYear(
                this.props.yearSelected,
                this.props.monthSelected -1,
                1
            )).toISOString().slice(0,10);
            this.state.finPeriode = new Date(new Date()
            .setFullYear(
                this.props.yearSelected,
                this.props.monthSelected ,
                0
            )).toISOString().slice(0,10)
    }
    
    render() {
        const title = "Heures Supplémentaires"
        if (!this.state.loaded) return <Loading/>
        else return (
            this.updatePeriod(),
            <div className="App">
                <div className="titre">
                    <MDBContainer>
                        {/* Formulaire */}
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{
                                annee: "",
                                date: "",
                                employeId: "",
                                etatVariablePaieId: 1,
                                id: null,
                                justificatif: "",
                                mois: "",
                                nombreHeure: 1,
                            }}
                            validationSchema={heuresSupSchema(this.state)}
                        >
                            {({
                                  handleSubmit,
                                  resetForm
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody style={{marginTop:"-3%", marginBottom:"-3%"}}>
                                        <MDBRow between around>
                                            {/* ligne 1 */}
                                            <MDBCol md="4">
                                                <Field
                                                    name="date"
                                                    label="Date* :"
                                                    debutdate={this.state.debutPeriode}
                                                    findate={this.state.finPeriode}
                                                    component={ComposantDate}
                                                />
                                                <ErrorMessage
                                                    name="date"
                                                    component={ComposantErreur}
                                                />
                                            </MDBCol>
                                            <MDBCol md="4" className="mb-1">
                                                <Field
                                                    name="nombreHeure"
                                                    label="Heure(s) sup."
                                                    component={ComposantNumber}
                                                />
                                                <ErrorMessage
                                                    name="nombreHeure"
                                                    component={ComposantErreur}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow center>
                                            {/* ligne2 */}
                                            <MDBBtn
                                                color="teal accent-3"
                                                rounded
                                                size="sm"
                                                type="submit"
                                            >Enregistrer
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

export default CreateHeuresSupplementaires;