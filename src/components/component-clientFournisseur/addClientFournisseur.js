import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as axios from 'axios';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'


const ComposantErreur = props => (
    <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({
    field,
    form: { touched, errors },
    ...props
}) => (
        <div className="form-group">
            <label> {props.label} </label>
            <input type="text" {...props} className="form-control" {...field} />
        </div>
    );

class AddClientFournisseur extends React.Component {

    submit = (values, actions) => {
        console.log(values)
        axios.post('https://jsonplaceholder.typicode.com/users', values)
            .then(response => {
                console.log(response);
            })

            AxiosCenter.createClientFournisseur(values).then(response => {
                      console.log(response.data) ;
                  }).catch(error => {
                      console.log(error)
                  })
                
        actions.setSubmitting(false);

    }

    userSchema = Yup.object().shape({
        name: Yup.string('String').min(3, 'Trop court').max(20, 'Trop long').required('Requis'),
        siren: Yup.number('Entres des chiffre').min(9, ' SIREN est composé de 9 chiffres').required('Le champ est obligatoire'),
        email: Yup.string().email("L'email doit être valide").required('Le champ est obligatoire'),
        telephone: Yup.number('Entrez des chiffres').min(9, 'Trop court'),
        numero: Yup.number('Entrez la bonne format'),
        rue: Yup.string('String').min(5, 'Trop court'),
        codePostal: Yup.number('Entrez des chiffres').min(4, 'Trop court'),
        ville: Yup.string('String')
    });

    render() {
        return (

            <div className="container-fluid p-5 bg-light 
            d-flex flex-column justify-content-center align-items-center">
                <h1>Ajouter un client fournisseur</h1>
                <Formik
                    onSubmit={this.submit}
                    initialValues={{ name: '', siren: 0, email: '', telephone: '', numero: 0, rue: '', codePostal: '', ville: '' }}
                    validationSchema={this.userSchema}

                >

                    {({

                        handleSubmit,
                        isSubmitting,

                    }) => (
                            <form onSubmit={handleSubmit} className="bg-white border p-5 d-flex flex-column">
                                <Field name="name" label="Nom de la Société" component={ComposantInput} />
                                <ErrorMessage name="name" component={ComposantErreur} />

                                <Field name="siren" label="SIREN" component={ComposantInput} />
                                <ErrorMessage name="siren" type="number" component={ComposantErreur} />

                                <Field name="email" label="Email" component={ComposantInput} />
                                <ErrorMessage name="email" type="email" component={ComposantErreur} />

                                <Field name="telephone" label="Téléphone" component={ComposantInput} />
                                <ErrorMessage name="telephone" type="number" component={ComposantErreur} />

                                <Field name="numero" label="Numero" component={ComposantInput} />
                                <ErrorMessage name="numero" type="number" component={ComposantErreur} />

                                <Field name="rue" label="Rue" component={ComposantInput} />
                                <ErrorMessage name="rue" component={ComposantErreur} />

                                <Field name="codePostal" label="Code Postal" component={ComposantInput} />
                                <ErrorMessage name="codePostal" type="number" component={ComposantErreur} />

                                <Field name="ville" label="Ville" component={ComposantInput} />
                                <ErrorMessage name="ville" component={ComposantErreur} />

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