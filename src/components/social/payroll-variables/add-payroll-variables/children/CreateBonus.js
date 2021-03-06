import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBContainer, MDBInput, MDBRow} from "mdbreact";

import Loading from "../../../../../shared/component/Loading";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import NotificationService from "../../../../../shared/services/NotificationService";

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantNumber = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        min="0.01"
        step="0.01"
        outline
        type="number"
        valueDefault="0.01"
        {...props}
        {...field}
    />
);

const ComposantSelect = ({field, ...props}) => (
    <div>
        <label style={{fontSize:"0.8rem", color:"#757575", marginLeft:"-70%"}}>{props.label}</label>
        <select className="form-control browser-default custom-select" name={props.name} {...props} {...field}>
            {props.list.map((object) => (
                <option key={object.id} value={object.id}>{object.intitule}</option>))}
        </select>
    </div>
);

class CreateBonus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeTypePrime: [],
            loaded: false
        };
    }

    componentDidMount() {
        AxiosCenter.getAllBonusTypes()
            .then((response) => {
                const list = response.data
                this.setState(
                    {
                        listeTypePrime: list,
                        loaded: true
                    }
                )
            }).catch((error) => {
            console.log(error)
        })
    }

    submit = (values, actions) => {
        const entityName = "Prime";

        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;

        AxiosCenter.createBonus(values)
            .then(() => {
                NotificationService.successRegistration(entityName);
                actions.resetForm();
            }).catch((error) => {
            console.log(error);
            NotificationService.failedRegistration(entityName);
        });
        actions.setSubmitting(true)
    };

    primeSchema = Yup.object().shape({
        montant: Yup.number().positive("Le montant doit être positif")
            .required("Le montant est obligatoire"),
    });

    render() {
        if (!this.state.loaded) return <Loading/>;
        return (
            <div>
                <div>
                    <MDBContainer>
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{
                                annee: "",
                                employeId: "",
                                etatVariablePaieId: 1,
                                id: null,
                                mois: "",
                                montant: 0,
                                typePrimeId: 1
                            }}
                            validationSchema={this.primeSchema}
                        >
                            {({
                                  dirty,
                                  handleReset,
                                  handleSubmit,
                                  isSubmitting
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBRow between around>
                                        <div>
                                            <Field
                                                name="typePrimeId"
                                                label="Type :"
                                                list={this.state.listeTypePrime}
                                                component={ComposantSelect}
                                            />
                                            <ErrorMessage name="typePrimeId" component={ComposantErreur}/>
                                        </div>
                                        <div>
                                            <Field
                                                name="montant"
                                                label="Montant*"
                                                component={ComposantNumber}
                                            />
                                            <ErrorMessage name="montant" component={ComposantErreur}/>
                                        </div>
                                    </MDBRow>
                                    <MDBRow center>
                                        {/* ligne3 */}
                                        <MDBBtn
                                            type="submit"
                                            color="teal accent-3"
                                            rounded
                                            size="sm"
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
                                </Form>
                            )}
                        </Formik>
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

export default CreateBonus;