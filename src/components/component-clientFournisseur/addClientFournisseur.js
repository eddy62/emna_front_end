import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'
import Style from './ClientFournisseur.module.css'

const ComposantErreur = props => (
    <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({
    field,
    form: { touched, errors },
    ...props
}) => (
        <div className=" form-group col-6">
            <label> {props.label} </label>
            <input type="text" {...props} className="form-control" {...field} />
        </div>
    );

class AddClientFournisseur extends React.Component {

    submit = (values, actions) => {
        console.log(values)

        AxiosCenter.createClientFournisseur(values).then(response => {
            console.log(response.data);
            console.log('values' + values)
        }).catch(error => {
            console.log(error)
        })

        actions.setSubmitting(false);

    }

    userSchema = Yup.object().shape({
        nom: Yup.string('String').min(3, 'Trop court').max(20, 'Trop long').required('Requis'),
        siren: Yup.number('Entres des chiffre').min(9, ' SIREN est composé de 9 chiffres').required('Le champ est obligatoire'),
        email: Yup.string().email("L'email doit être valide").required('Le champ est obligatoire'),
        telephone: Yup.number('Entrez des chiffres').min(9, 'Trop court'),
        numero: Yup.number('Entrez la bonne format'),
        rue: Yup.string('String').min(5, 'Trop court'),
        codePostal: Yup.number('Entrez des chiffres').min(4, 'Trop court'),
        ville: Yup.string('String'),

    });

    render() {
        return (

            <div className="container-fluid ">
                <h1 className={Style.h2}>Ajouter un client fournisseur</h1>
                <Formik
                    onSubmit={this.submit}
                    initialValues={{
                        nom: '', email: '', telephone: '', codePostal: '', ville: '', idSociete: 1,
                        id: null,
                    }}
                    validationSchema={this.userSchema}>

                    {({

                        handleSubmit,
                        isSubmitting,

                    }) => (
                            <form onSubmit={handleSubmit} className=" container-fluid p-5 bg-light justify-content-center align-items-center" >
                                <div className=" row p-2">
                                    <Field name="nom" label="Nom de la Société" component={ComposantInput} />
                                    <ErrorMessage name="nom" component={ComposantErreur} />

                                    <Field name="siren" label="SIREN" component={ComposantInput} />
                                    <ErrorMessage name="siren" type="number" component={ComposantErreur} />

                                    <Field name="email" label="Email" component={ComposantInput} />
                                    <ErrorMessage name="email" type="email" component={ComposantErreur} />

                                    <Field name="telephone" label="Téléphone" component={ComposantInput} />
                                    <ErrorMessage name="telephone" type="number" component={ComposantErreur} />

                                    <Field name="numeroRue" label="Numero" component={ComposantInput} />
                                    <ErrorMessage name="numeroRue" type="number" component={ComposantErreur} />

                                    <Field name="nomRue" label="Rue" component={ComposantInput} />
                                    <ErrorMessage name="nomRue" component={ComposantErreur} />


                                    <Field name="codePostal" label="Code Postal" component={ComposantInput} />
                                    <ErrorMessage name="codePostal" type="number" component={ComposantErreur} />


                                    <Field name="ville" label="Ville" component={ComposantInput} />
                                    <ErrorMessage name="ville" component={ComposantErreur} />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Sauvegarder
              </button>
                            </form>
                        )}
                </Formik>
            </div>
        )
    }
}

export default AddClientFournisseur;