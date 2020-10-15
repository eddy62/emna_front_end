import React from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from "yup";
import Loading from "../../../../../shared/component/Loading";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow,} from "mdbreact";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const heuresSupSchema = (props) => {
    return Yup.object().shape({
        date: Yup.date().required("Date Obligatoire*")
            .min(props.debutPeriode, "Date erronée")
            .max(props.finPeriode, "Date erronée"),
        nombreHeure: Yup.number().required("Heures obligatoires*")
            .min(1, "1 heure minimum"),
    })
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
        min="1"
        outline
        type="number"
        valueDefault="1"
        {...props}
        {...field}
    />
);

const notify = (type, date) => {
    const variable = "Heure(s) supplémentaire(s)";
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>{variable} Enregistrée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
            case "warning":
            toast.warning(
                <div className="text-center">
                    <strong>{variable} NON Enregistrée : Le salarié était absent pendant cette date {date} &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistrée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistrée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

class CreateOvertime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            debutPeriode: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            finPeriode: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
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
        values.employeId = this.props.employeId

        AxiosCenter.createOvertime(values)
            .then((response) => {
                const statut = response.status;
                const dateExpRept = this.props.formatDate(response.data.date);
                switch(statut) {
                    case 201:
                        notify("success", "");
                        actions.setSubmitting(true);
                        //this.props.handleReset("ExpenseReport");
                        actions.resetForm();
                    break;
                    case 208:
                        notify("warning", dateExpRept);
                    break;
                    default:
                        notify("warning", "");
                        break;
                };
            }).catch((error) => {
            console.log(error);
            notify("error", "");
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
                                  dirty,
                                  handleReset,
                                  handleSubmit,
                                  isSubmitting
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

export default CreateOvertime;