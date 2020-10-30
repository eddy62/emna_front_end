import React, {Component} from 'react';
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup"
import AxiosCenter from "../../../shared/services/AxiosCenter";
import {Link} from 'react-router-dom';
import {MDBBtn, MDBCardHeader, MDBCardTitle, MDBContainer, MDBInput} from "mdbreact";
import {toast} from "react-toastify";

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
    <div >
        <MDBInput label={props.label} type="text" {...props} className="form-control" {...field} />
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
        AxiosCenter.getCustomerSupplier(this.state.IdEntity)
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
        AxiosCenter.updateCustomerSupplier(values)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong>Le client {this.state.updateClient.nom} a été mis à jour </strong>
                    </div>,
                    { position: "top-right" }
                );
                this.props.history.push("/clientFournisseur/detail/" + response.data.id);
            })
            .catch((error) => {
                console.log(error);
                toast.error(
                    <div className="text-center">
                        <strong>Le Client {this.state.updateClient.nom} n'a pas été mis à jour&nbsp;&nbsp;!</strong>
                        <br />
                    </div>,
                    { position: "top-right" }
                );
            });
        actions.setSubmitting(true);
    }



    userSchema = Yup.object().shape({
        nom: Yup.string("String")
            .min(3, "Le nom doit contenir au moins 3 caractères")
            .max(30, "Le nom ne peut dépasser 30 caractères ")
            .required("Le champ est obligatoire"),
        siret: Yup.string()
            .matches(/^[0-9]+$/, "Siret doit être composé uniquement de chiffres").required("Le champ est obligatoire").min(14, 'SIRET doit contenir exactement 14 chiffres')
            .max(14, 'SIRET doit contenir exactement 14 chiffres'),
        email: Yup.string()
            .email("L'adress mail doit être valide")
            .required("Le champ est obligatoire"),
        telephone: Yup.string()
            .matches(/^[0-9]+$/, "Téléphone doit être composé uniquement de chiffres").required("Le champ est obligatoire").min(10, 'Téléphone doit contenir exactement 10 chiffres')
            .max(10, 'Téléphone doit contenir exactement 10 chiffres'),
        numeroRue: Yup.string()
            .matches(/^[0-9a-z ]+$/, "Numéro doit être composé uniquement de chiffres, lettres minuscules, espaces"),
        nomRue: Yup.string().required("Le champ est obligatoire"),
        codePostal: Yup.string().matches(/^(?:[0-8]\d|9[0-8])\d{3}$/, "Code postal invalide").required("Le champ est obligatoire"),
        ville: Yup.string().matches(/^[A-Z ]{1,50}$/, "Ville doit contenir uniquement des majuscules sans accent et des espaces").required("Le champ est obligatoire"),
        pays: Yup.string().matches(/^[A-Z ]{1,50}$/, "Pays doit contenir uniquement des majuscules sans accent et des espaces").required("Le champ est obligatoire"),
    });
    render() {

        return (
            <MDBContainer>
                <div>
                    <MDBCardHeader color="default-color">Gestion Client Fournisseur </MDBCardHeader>
                    <br></br>
                    <MDBCardTitle tag="h3">Modifier les données d'un Client Fournisseur  </MDBCardTitle>
                    <hr></hr>
                    <div className="container-fluid ">
                        <Formik
                            initialValues={this.getInitialValues()}
                            onSubmit={this.submit}
                            enableReinitialize={true}
                            validationSchema={this.userSchema}
                        >
                            {({ handleSubmit }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-white border p-5 d-flex flex-column"
                                >
                                    <div >
                                        <Field name="nom" label="Nom de la Société" component={ComposantInput} />
                                        <ErrorMessage name="nom" component={ComposantErreur} />

                                        <Field name="siret" label="SIRET" component={ComposantInput} />
                                        <ErrorMessage name="siret" component={ComposantErreur} />

                                        <Field name="email" label="Adresse mail" component={ComposantInput} />
                                        <ErrorMessage name="email" component={ComposantErreur} />

                                        <Field name="telephone" label="Téléphone" component={ComposantInput} />
                                        <ErrorMessage name="telephone" component={ComposantErreur} />

                                        <Field name="numeroRue" label="Numéro" component={ComposantInput} />
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
                                    <br></br>
                                    <div className="row d-flex justify-content-center ">
                                        <MDBBtn rounded type="submit" color="primary">
                                            Sauvegarder
              </MDBBtn>
                                        <Link to="/client-fournisseur">
                                            <MDBBtn rounded color="teal accent-3">
                                                Annuler
                  </MDBBtn>
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </MDBContainer >
        );
    }
}
export default ModifierClient;
