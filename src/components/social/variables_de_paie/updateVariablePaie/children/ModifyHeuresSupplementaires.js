import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import {
    MDBBtn,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
} from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../shared/component/Loading";

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
        {...props}
        {...field}
    />
);

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) Modifiée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Heure(s) supplémentaire(s) NON Modifiée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

class ModifyHeuresSupplementaires extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            debutPeriode: "",
            finPeriode: "",
            loaded: false,
            btnDisabled: true
        }
    };

    componentDidMount() {
        this.setState({
            loaded: true
        });
        this.updatePeriod();
    }

    componentWillUnmount() {
        this.props.reloadParentAfterUpdate();
    }

    submit = (values, actions) => {
        AxiosCenter.modifyHeureSupplementaire(values)
            .then(() => {
                notify('success');
                actions.resetForm();
                this.props.toggleAvance(this.props.index);
            }).catch((error) => {
            console.log(error);
            notify('error');
        });
        actions.setSubmitting(true);
    };

    updatePeriod() {
        this.state.debutPeriode = new Date(new Date()
            .setFullYear(
                this.props.heureSupplementaire.annee,
                this.props.heureSupplementaire.mois - 1,
                1
            )).toISOString().slice(0, 10);
        this.state.finPeriode = new Date(new Date()
            .setFullYear(
                this.props.heureSupplementaire.annee,
                this.props.heureSupplementaire.mois,
                0
            )).toISOString().slice(0, 10)
    }

    render() {
        if (!this.state.loaded) return <Loading/>;
        else return (
            <div className="App">
                <div className="titre">
                    <MDBContainer>
                        {/* Formulaire */}
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{
                                annee: this.props.heureSupplementaire.annee,
                                date: this.props.heureSupplementaire.date,
                                employeId: this.props.heureSupplementaire.employeId,
                                etatVariablePaieId: this.props.heureSupplementaire.etatVariablePaieId,
                                id: this.props.heureSupplementaire.id,
                                justificatif: this.props.heureSupplementaire.justificatif,
                                mois: this.props.heureSupplementaire.mois,
                                nombreHeure: this.props.heureSupplementaire.nombreHeure,
                            }}
                            validationSchema={heuresSupSchema(this.state)}
                        >
                            {({
                                  handleSubmit
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody style={{marginTop: "-3%", marginBottom: "-3%"}}>
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
                                                onClick={() => this.props.toggleAvance(this.props.index)}
                                            >Annuler
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

export default ModifyHeuresSupplementaires;