import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBInput } from 'mdbreact';
import React, { Component } from 'react';
import RedirectionBtn from '../../../shared/component/RedirectionBtn';
import * as Yup from "yup";
import { Formik, Form, Field, } from 'formik';
import InputComponent from '../../../shared/component/form/InputComponent';
import ErrorMessForm from '../../../shared/component/ErrorMessForm';

const StartDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

const EndDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

export default class QuoteForm extends Component {

  lexique = {
    required : "le champ est obligatoire",
  }

  quotesShema = Yup.object().shape({
    dateCreation         : Yup.date().required("Date obligatoire"),
    dateLimite           : Yup.date().required("Date obligatoire").min(Yup.ref('dateCreation'),"La date limite doit être ultérieure à la date de création"),
    // clientFournisseur    : Yup.string().required(this.lexique.required),
  });

  render() {
    return (
      <MDBContainer>
        <MDBCardHeader color="default-color">
          <MDBCardTitle>Accueil Devis</MDBCardTitle><br />
        </MDBCardHeader><hr />  
        <MDBCardTitle tag="h3">{this.props.title}</MDBCardTitle><hr/> 
        <Formik
          onSubmit={this.props.onSubmit}
          initialValues={this.props.quote}
          validationSchema={this.quotesShema}
        >
          {({
            values,
            handleSubmit,
            errors,
            touched
          }) => (
            <Form onSubmit={handleSubmit} className="container-fluid lighten-5 justify-content-center align-items-center">
              <MDBCard>
                <MDBCardBody>
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-6">
                      <Field
                        name="dateCreation"
                        label="Date de création"
                        component={StartDateComponent}
                      />
                      <ErrorMessForm
                        error={errors.dateCreation}
                        touched={errors.dateCreation}           
                      />
                      <Field
                        name="dateLimite"
                        label="Date limite"
                        component={EndDateComponent}
                      />
                      <ErrorMessForm
                        error={errors.dateLimite}
                        touched={errors.dateLimite}
                      />
                    </div>
                    <div className="d-flex flex-column col-md-6">
                      <Field
                        name="numDevis"
                        label="Numéro de devis"
                        component={InputComponent}
                      />
                      <Field
                        name="nom"
                        label="Nom du devis"
                        component={InputComponent}
                      />
                    </div>
                  </div>  
                  <Field
                      name="message"
                      label="Message"
                      component={InputComponent}
                  />          
                  <Field
                    name="clientFournisseurId"
                    label="Client"
                    component={InputComponent}
                  />
                  <ErrorMessForm
                    error={errors.clientFournisseur}
                    touched={errors.clientFournisseur}
                  />
                </MDBCardBody>
              </MDBCard><br />
              <div className="row d-flex justify-content-center">
                <RedirectionBtn color="default-color" route="/devis/accueil" msg="retour"/>
                <MDBBtn type="submit" size="sm" color="default-color">Enregistrer</MDBBtn>
              </div>
            </Form>
          )}              
        </Formik>
      </MDBContainer>
    );
  }
}