import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";



const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
    <div >
        <label> {props.label} </label>
        <input type="text" {...props} className="form-control" {...field} />
    </div>
);
const ComposantTextarea = ({ field, form: { touched, errors }, ...props }) => (
    <div >
        <label> {props.label} </label>
        <textarea type="text" {...props} className="form-control" {...field} />
    </div>
);

class AddProduit extends React.Component {
    submit = (values, actions) => {
        AxiosCenter.createProduit(values)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        actions.setSubmitting(true);
    };

    userSchema = Yup.object().shape({
        nom: Yup.string().required("Le champ est obligatoire"),
        reference: Yup.number("Entres des chiffre").required("Le champ est obligatoire"),
        tva: Yup.string().required("Le champ est obligatoire"),
        prix: Yup.number(),
        description: Yup.string().required("Le champ est obligatoire"),
        unite: Yup.string().required("Le champ est obligatoire"),
    });

    render() {
        return (

            <div >
                <h1 >Ajouter un Produit</h1>
                <Formik
                    onSubmit={this.submit}
                    initialValues={{
                        nom: "",
                        reference: "",
                        tva: "",
                        prix: "",
                        unite: "",
                        description: "",
                        societeId: 1,
                        id: null,
                    }}
                    validationSchema={this.userSchema}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="container-fluid p-5  lighten-5 justify-content-center align-items-center"
                        >
                            <div >
                                <Field
                                    name="nom"
                                    label="Nom de Produit"
                                    component={ComposantInput}
                                />
                                <ErrorMessage name="nom" component={ComposantErreur} />

                                <Field name="reference" label="Reference" component={ComposantInput} />
                                <ErrorMessage
                                    name="reference"
                                    type="numbre"
                                    component={ComposantErreur}
                                />

                                <Field name="tva" label="Tva"
                                    component={ComposantInput} />
                                <ErrorMessage
                                    name="tva"
                                    type="numbre"
                                    component={ComposantErreur}
                                />
                                <Field
                                    name="unite"
                                    label="Unité"
                                    component={ComposantInput}
                                />
                                <ErrorMessage
                                    name="unite"
                                    type="number"
                                    component={ComposantErreur}
                                />

                                <Field
                                    name="prix"
                                    label="Prix"
                                    component={ComposantInput}
                                />
                                <ErrorMessage
                                    name="prix"
                                    type="number"
                                    component={ComposantErreur}
                                />

                                <Field name="description" label="Description" component={ComposantTextarea}
                                    rows="2" />
                                <ErrorMessage name="nomRue" component={ComposantErreur} />
                            </div>
                            <br></br>

                            <div className="center align-items-center ">
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
            </div >
        );
    }
}

export default AddProduit;
