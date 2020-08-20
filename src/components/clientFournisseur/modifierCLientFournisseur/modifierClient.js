import React, { Component } from 'react';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import Style from "./../ClientFournisseur.module.css";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import { Link } from 'react-router-dom';
import {
    MDBBtn
} from "mdbreact";

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
    <div className=" form-group col-6">
        <label> {props.label} </label>
        <input type="text" {...props} className="form-control" {...field} />
    </div>
);

class ModifierClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updateClient: {},
            loaded: false,
            IdEntity: this.props.match.params.id,
        };
    }


    componentDidMount() {
        console.log(" id " + this.state.IdEntity)
        AxiosCenter.getClientFournisseur(this.state.IdEntity)
            .then((response) => {
                const client = response.data;
                this.setState({
                    updateClient: client,
                    loaded: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    getInitialValues = () => {
        return this.state.updateClient;
    }


    submit = (values, actions) => {
        AxiosCenter.updateClientFournisseur(values)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        actions.setSubmitting(true);
    }



    userSchema = Yup.object().shape({
        nom: Yup.string("String").min(2, "Trop court").max(20, "Trop long").required("Le champ est obligatoire"),
        siren: Yup.number("Entres des chiffre").required("Le champ est obligatoire"),
        email: Yup.string().email("L'email doit être valide").required("Le champ est obligatoire"),
        telephone: Yup.number().min(9, "Trop court"),
        numeroRue: Yup.string().required("Le champ est obligatoire"),
        nomRue: Yup.string().required("Le champ est obligatoire"),
        codePostal: Yup.string().required("Le champ est obligatoire"),
        ville: Yup.string().required("Le champ est obligatoire"),
        pays: Yup.string().required("Le champ est obligatoire"),
    });
    render() {

        return (

            <div className="container-fluid ">
                <h1 className={Style.h2}>Modifier un client fournisseur</h1>
                <Formik
                    initialValues={this.getInitialValues()}
                    onSubmit={this.submit}
                    enableReinitialize={true}
                    validationSchema={this.userSchema}
                >
                    {({ handleSubmit }) => (
                        <form
                            onSubmit={handleSubmit}
                            className=" container-fluid p-5  teal lighten-5 justify-content-center align-items-center"
                        >
                            <div className=" row p-2">
                                <Field name="nom" label="Nom de la Société" component={ComposantInput} />
                                <ErrorMessage name="nom" component={ComposantErreur} />

                                <Field name="siren" label="SIREN" component={ComposantInput} />
                                <ErrorMessage name="siren" component={ComposantErreur} />

                                <Field name="email" label="Email" component={ComposantInput} />
                                <ErrorMessage name="email" component={ComposantErreur} />

                                <Field name="telephone" label="Téléphone" component={ComposantInput} />
                                <ErrorMessage name="telephone" component={ComposantErreur} />

                                <Field name="numeroRue" label="Numero" component={ComposantInput} />
                                <ErrorMessage name="numeroRue" component={ComposantErreur} />

                                <Field name="nomRue" label="Rue" component={ComposantInput} />
                                <ErrorMessage name="nomRue" component={ComposantErreur} />

                                <Field name="codePostal" label="Code Postal" component={ComposantInput} />
                                <ErrorMessage name="codePostal" component={ComposantErreur} />

                                <Field name="ville" label="Ville" component={ComposantInput} />
                                <ErrorMessage name="ville" component={ComposantErreur} />

                                <Field name="pays" label="Pays" component={ComposantInput} />
                                <ErrorMessage name="pays" component={ComposantErreur} />
                            </div>
                            <div className="container-fluid  justify-content-center ">
                                <MDBBtn rounded type="submit" color="primary">
                                    Sauvegarder
              </MDBBtn>
                                <Link to="/client-fournisseur">
                                    <MDBBtn rounded color="teal accent-3">
                                        Retour
                  </MDBBtn>
                                </Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>

        );
    }
}
export default ModifierClient;
