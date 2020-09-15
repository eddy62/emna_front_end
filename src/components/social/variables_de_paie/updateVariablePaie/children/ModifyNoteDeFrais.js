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
import Loading from "../../../../../shared/component/Loading";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";

const noteDeFraisSchema = (props) => {
    return Yup.object().shape({
        date: Yup.date().required("Date obligatoire*")
        .min(props.minDate, "Date erronée")
            .max(props.maxDate, "Date erronée"),
        montant: Yup.number().required("Montant obligatoire*")
            .min("0.01", "Ne peut être un montant nul ou négatif"),
        designation: Yup.string().required("Désignation obligatoire*")
    })
};


const ComponentDate = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        outline
        type="date"
        min={props.startDate}
        max={props.endDate}
        {...props}
        {...field}
    />
);

const ComponentDesignation = ({field, form: {touched, errors}, ...props}) => (
    <MDBInput
        label={props.label}
        outline
        type="text"
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
const ComponentUpload = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
            <label className="custom-control-label" htmlFor="defaultUnchecked">Justificatif(s)</label>
        </div>
        <MDBBtn disabled={true}
                color="teal accent-3"
                rounded
                size="sm"
                type="submit">
            Upload</MDBBtn>
    </div>
);

const ComponentError = (props) => (
    <div className="text-danger">{props.children}</div>
);

const notify = (type) => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Note de frais modifiée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Note de frais NON modifiée  &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};

class ModifyNoteDeFrais extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           minDate: "",
            maxDate: "",
        };
    }

    componentWillUnmount() {
        this.props.reloadParentAfterUpdate();
    }

    submit = (values, actions) => {
        AxiosCenter.updateNoteDeFrais(values)
            .then(() => {
                notify("success");
                this.props.toggleNoteDeFrais(this.props.index);
            }).catch((error) => {
            console.log(error);
            notify("error");
        });
        actions.setSubmitting(true);
    };

    updatePeriod() {
        this.state.minDate = new Date(new Date()
            .setFullYear(
                this.props.noteDeFrais.annee,
                this.props.noteDeFrais.mois - 1,
                1
            )).toISOString().slice(0, 10);
        this.state.maxDate = new Date(new Date()
            .setFullYear(
                this.props.noteDeFrais.annee,
                this.props.noteDeFrais.mois,
                0
            )).toISOString().slice(0, 10)
    };

    toggleNoteDeFrais = () => {
        this.props.toggleNoteDeFrais()
    };


    render() {
        return (

            this.updatePeriod(),
            <div className="App">
                <div className="titre">
                    <MDBContainer>
                        {/* Formulaire */}
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{
                                annee: this.props.noteDeFrais.annee,
                                date: this.props.noteDeFrais.date,
                                designation: this.props.noteDeFrais.designation,
                                employeId: this.props.noteDeFrais.employeId,
                                etatVariablePaieId: this.props.noteDeFrais.etatVariablePaieId,
                                id: this.props.noteDeFrais.id,
                                justificatif: this.props.noteDeFrais.justificatif,
                                mois: this.props.noteDeFrais.mois,
                                montant: this.props.noteDeFrais.montant,

                            }}
                            validationSchema={noteDeFraisSchema(this.state)}
                        >
                            {({
                                  handleSubmit,
                                values

                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody style={{marginTop: "-5%", marginBottom: "-3%"}}>
                                        <MDBRow between around>
                                            {/* ligne 1 */}
                                            <MDBCol md="4" className="mt-3">
                                                <Field
                                                    name="date"
                                                    label="Le* :"
                                                    startDate={this.state.minDate}
                                                    endDate={this.state.maxDate}
                                                    component={ComponentDate}
                                                />
                                                <ErrorMessage
                                                    name="date"
                                                    component={ComponentError}
                                                />
                                                </MDBCol>
                                        </MDBRow>
                                        <MDBRow between around>
                                            {/* ligne 2 */}
                                            <MDBCol md="4" style={{marginTop: "-1%"}}>
                                                <Field
                                                    name="montant"
                                                    label="Montant*"
                                                    component={ComponentNumber}
                                                />
                                                <ErrorMessage
                                                    name="montant"
                                                    component={ComponentError}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        {/* désignation */}
                                        <MDBRow center style={{marginTop:"-3%"}}>
                                            <MDBCol md="5">
                                                <Field
                                                    name="designation"
                                                    label="Désignation*"
                                                    component={ComponentDesignation}
                                                />
                                                <ErrorMessage name="designation" component={ComponentError}/>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow center>
                                            <MDBCol md="4">
                                                <Field
                                                    name="justificatif"
                                                    component={ComponentUpload}
                                                />
                                                <ErrorMessage name="justificatif" component={ComponentError}/>
                                            </MDBCol>
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
                                                onClick={() => this.props.toggleNoteDeFrais(this.props.index)}
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

export default ModifyNoteDeFrais;