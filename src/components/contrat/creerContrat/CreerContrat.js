import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ContratService from "../service/ContratService";

export default class CreerContrat extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{
                    titre: '',
                    dateCreation: '2020-07-29',
                    archive: 'false',
                    signe: 'false',
                }}
                validationSchema={Yup.object().shape({
                    titre: Yup.string()
                        .required('titre is required')
                })}
                onSubmit={fields => {
                    ContratService.postContrat(fields);
                    alert(JSON.stringify(fields, null, 4));
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="titre">titre</label>
                            <Field name="titre" type="text" className={'form-control' + (errors.titre && touched.titre ? ' is-invalid' : '')} />
                            <ErrorMessage name="titre" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Register</button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}


