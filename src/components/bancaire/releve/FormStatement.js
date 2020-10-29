import React from "react";
import {Field, Formik, ErrorMessage} from "formik";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCardTitle, MDBContainer} from "mdbreact";
import * as Yup from "yup";
import BackBtn from "../../../shared/component/buttons/BackBtn";
/**
 * Composant permettant de créer le formulaire pour créer/modifier un relevé
 * @param values correspond aux données à envoyer dans le formulaire
 * @param action action effectuer après avoir cliquer sur le bouton valider
 * @author Waroux Matthieu
 * @constructor
 */


const lexique = {
    
    dateDebut: "Date de début",
    dateFin: "Date de début",
    banque: "Banque"
}

const releveSchema = Yup.object().shape(
    {
        dateDebut: Yup.date().required("La date de début est obligatoire"),
        dateFin: Yup.date().required("La date de fin est obligatoire").min(
            Yup.ref('dateDebut'),
            "La date de fin doit être ultérieure à la date de début"
        ),
        banque: Yup.string().required("Le nom de la banque est requit")
    });

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantStartDate = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input {...field} {...props} type="date" className="form-control"/>
    </div>
);

const ComposantEndDate = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input {...field} {...props} type="date" className="form-control"/>
    </div>
);

const ComposantInput = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input {...field} {...props} type="text" className="form-control"/>
    </div>
);

const FormStatement =({values,action,title, history}) => {
    return (
        <MDBContainer>
            <div>
                <MDBCardTitle tag="h1">{title}</MDBCardTitle>
                <hr></hr>
                <Formik onSubmit={action}
                        initialValues={ values }
                        validationSchema={releveSchema}>
                    {({
                          values,
                          handleSubmit,
                          isSubmitting,
                          
                      }) => (
                        <form onSubmit={handleSubmit} className="bg-white p-5 d-flex flex-column">
                            <Field name="dateDebut"
                                   label="Date de début"
                                   value={values.dateDebut}
                                   component={ComposantStartDate}
                            />
                            <ErrorMessage name="dateDebut" component={ComposantErreur}/>

                            <Field name="dateFin"
                                   label="Date de fin"
                                   value={values.dateFin}
                                   component={ComposantEndDate}
                            />
                            <ErrorMessage name="dateFin" component={ComposantErreur}/>

                            <Field name="banque"
                                   label="Banque"
                                   value={values.banque}
                                   component={ComposantInput}
                            />
                            <ErrorMessage name="banque" component={ComposantErreur}/>
                            <div className="row d-flex justify-content-center ">
                            <MDBBtn rounded type="submit" color="teal">
                                        Sauvegarder
                            </MDBBtn>
                            <BackBtn history={history} size={"sm"}></BackBtn>
                                </div>

                            
                        </form>
                    )}
                </Formik>
            </div>
        </MDBContainer>
    );

}

export default FormStatement;