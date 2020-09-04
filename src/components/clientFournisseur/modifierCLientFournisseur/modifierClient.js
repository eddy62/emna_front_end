import React, { Component } from 'react';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import AxiosCenter from "../../../shared/services/AxiosCenter";
import { Link } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBCardHeader, MDBCardTitle, MDBInput } from "mdbreact";
import { toast } from "react-toastify";

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
            .min(3, "Le nom ne peut contient moins que 3 caractères")
            .max(20, "Le nom ne peut dépasser 20 caractères ")
            .required("Le champ est obligatoire"),
        siren: Yup.string()
            .matches(/^[0-9]+$/, "Siren doit être composé uniquement de chiffres").required("Le champ est obligatoire").min(9, 'Doit contenir exactement 9 chiffres')
            .max(9, 'Doit contenir exactement 9 chiffres'),
        email: Yup.string()
            .email("L'adress mail doit être valide")
            .required("Le champ est obligatoire"),
        telephone: Yup.string()
            .matches(/^[0-9]+$/, "Telephone doit être composé uniquement de chiffres").required("Le champ est obligatoire").min(10, 'Doit contenir exactement 10 chiffres')
            .max(10, 'Doit contenir exactement 10 chiffres'),
        numeroRue: Yup.string()
            .matches(/^[0-9]+$/, "Numero doit être composé uniquement de chiffres").required("Le champ est obligatoire"),
        nomRue: Yup.string().required("Le champ est obligatoire"),
        codePostal: Yup.string().matches(/^[a-zA-Z0-9\s]+$/, "Code postal invalide").required("Le champ est obligatoire"),
        ville: Yup.string().matches(/^[a-zA-Zéçèùàêû\s]+$/, "Ville doit être composé uniquement de littres").required("Le champ est obligatoire"),
        pays: Yup.string().matches(/^[a-zA-Zéçèùàêû\s]+$/, "Pays doit être composé uniquement de littres").required("Le champ est obligatoire"),
    });
    render() {

        return (
            <MDBContainer>
                <div>
                    <MDBCardHeader color="default-color">Gestion Client Fournisseur </MDBCardHeader>
                    <br></br>
                    <MDBCardTitle tag="h3">Modifier les donnnées d'un Client Fournisseur  </MDBCardTitle>
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

                                        <Field name="siren" label="SIREN" component={ComposantInput} />
                                        <ErrorMessage name="siren" component={ComposantErreur} />

                                        <Field name="email" label="Adresse mail" component={ComposantInput} />
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
