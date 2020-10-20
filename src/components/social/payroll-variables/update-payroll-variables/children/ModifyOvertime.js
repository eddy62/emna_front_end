import React from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from "yup";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow, MDBCardHeader, MDBCardTitle} from "mdbreact";
import {toast} from "react-toastify";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../shared/component/Loading";
import NotificationService from "../../../../../shared/services/NotificationService";

const heuresSupSchema = (props) => {
    return Yup.object().shape({
        date: Yup.date().required("Date Obligatoire*")
            .min(props.startPeriod, "Date erronée")
            .max(props.endPeriod, "Date erronée"),
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
        {...props}
        {...field}
    />
);

const notify = (type, date) => {
    const variable = "Heure(s) supplémentaire(s)"
    switch (type) {
        case "warning":
            toast.warning(
                <div className="text-center">
                    <strong>{variable} NON modifiée : Le salarié était absent pendant cette date {date} !</strong>
                </div>
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Modifiée(s) &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

class ModifyOvertime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected - 1, 1)).toISOString().slice(0, 10),
            endPeriod: new Date(new Date().setFullYear(this.props.yearSelected, this.props.monthSelected, 0)).toISOString().slice(0, 10),
            loaded: false,
            btnDisabled: true
        }
    };

    componentDidMount() {
        this.setState({
            loaded: true
        });
    }

    submit = (values, actions) => {
        const entityName = "Heure(s) supplémentaire(s)";

        AxiosCenter.modifyOvertime(values)
            .then((response) => {
                const statut = response.status;
                const dateOvertime = this.props.dateFormat(response.data.date);
                switch(statut) {
                    case 201:
                        NotificationService.successModification(entityName);
                        actions.resetForm();
                        this.props.toggleAvance(this.props.index);
                        this.props.reloadParentAfterUpdate();
                    break;
                    case 208:
                        NotificationService.employeeWasAbsent(entityName, dateOvertime);
                    break;
                    default:
                        NotificationService.failedModification(entityName);
                        break;
                }
            }).catch((error) => {
            console.log(error);
            NotificationService.failedModification(entityName);
        });
        actions.setSubmitting(true);
    };

    render() {
        if (!this.state.loaded) return <Loading/>;
        else return (
            <div>
                <MDBContainer>
                    <div>
                        <MDBCardHeader color={"teal accent-4"} >
                            <MDBCardTitle tag="h4">Heures Supplémentaires</MDBCardTitle>
                        </MDBCardHeader>
                    </div>
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
                                <MDBCardBody>
                                    <MDBRow between around>
                                        {/* ligne 1 */}
                                        <MDBCol md="4">
                                            <Field
                                                name="date"
                                                label="Date* :"
                                                debutdate={this.state.startPeriod}
                                                findate={this.state.endPeriode}
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
        )
    }
}

export default ModifyOvertime;