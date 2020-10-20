import React from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from "yup";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow, MDBCardHeader, MDBCardTitle} from "mdbreact";
import {toast} from "react-toastify";
import Loading from "../../../../../shared/component/Loading";
import AxiosCenter from "../../../../../shared/services/AxiosCenter"
import NotificationService from "../../../../../shared/services/NotificationService";

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

class ModifyPaydayAdvanceReminder extends React.Component {
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
        const entityName = values.type + " sur salaire";

        AxiosCenter.modifyPaydayAdvanceOrReminder(values)
            .then(() => {
                NotificationService.successModification(entityName);
                actions.resetForm();
                this.props.toggleAvance(this.props.index);
                this.props.reloadParentAfterUpdate();
            }).catch((error) => {
            console.log(error);
            NotificationService.failedModification(entityName);
        });
        actions.setSubmitting(true);
    };

    render() {
        if (!this.state.loaded) return <Loading/>
        else return (
                <div>
                    <MDBContainer>
                    <div>
                        <MDBCardHeader color={"teal accent-4"}>
                            <MDBCardTitle tag="h4">Rappels/Avances sur Salaire</MDBCardTitle>
                        </MDBCardHeader>
                    </div>
                        {/* Formulaire */}
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{
                                annee: this.props.avanceRappelSalaire.annee,
                                debutPeriode: this.props.avanceRappelSalaire.debutPeriode,
                                employeId: this.props.avanceRappelSalaire.employeId,
                                etatVariablePaieId: this.props.avanceRappelSalaire.etatVariablePaieId,
                                finPeriode: this.props.avanceRappelSalaire.finPeriode,
                                id: this.props.avanceRappelSalaire.id,
                                mois: this.props.avanceRappelSalaire.mois,
                                montant: this.props.avanceRappelSalaire.montant,
                                type: this.props.avanceRappelSalaire.type,
                            }}
                            validationSchema={avanceRappelSchema(this.state)}
                        >
                            {({
                                  handleBlur,
                                  handleChange,
                                  handleSubmit,
                                  values,
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody>
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

export default ModifyPaydayAdvanceReminder;