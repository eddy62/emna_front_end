import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { Component } from 'react';
import RedirectionBtn from '../../../shared/component/buttons/RedirectionBtn';
import { Formik, Form, Field } from 'formik';
import InputComponent from '../../../shared/component/form/InputComponent';
import ErrorMessForm from '../../../shared/component/ErrorMessForm';
import ProductList from './quote-elements/ProductList';

const StartDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

const EndDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

export default class QuoteFormEdit extends Component {

  render() {
    const initialValues = {
      initialValues : this.props.quote,
    };
    
    return (
      <MDBContainer>
        <MDBCardHeader color="default-color">
          <MDBCardTitle>Gestion des Devis</MDBCardTitle><br />
        </MDBCardHeader><hr />  
        <MDBCardTitle tag="h3">{this.props.title}</MDBCardTitle><hr/> 
        <Formik
          onSubmit={this.props.onSubmit}
          initialValues={initialValues}
          validationSchema={this.quotesShema}
        >
          {({
            handleSubmit,     
            errors,
          }) => (
            <Form onSubmit={handleSubmit} className="container-fluid lighten-5 justify-content-center align-items-center">
              <MDBCard>
                <MDBCardBody>

                  {/* références devis */}
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="initialValues.numDevis"
                        label="Numéro de devis"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="initialValues.dateCreation"
                        label="Date de création"
                        component={StartDateComponent}
                        disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="initialValues.dateLimite"
                        label="Date limite"
                        component={EndDateComponent}
                      />
                      <ErrorMessForm
                        error={errors.dateLimite}
                        touched={errors.dateLimite}
                      />
                    </div>                      
                  </div>  
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="initialValues.nom"
                        label="Nom du devis"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-8">
                      <Field
                        name="initialValues.message"
                        label="Message"
                        component={InputComponent}
                        outline
                      /> 
                    </div>
                  </div>

                  {/* client */}
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-3">
                      <Field
                        name="initialValues.clientFournisseurId"
                        label="id client"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="initialValues.clientFournisseurNom"
                        label="Client"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="initialValues.clientFournisseurSiret"
                        label="Siret"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="initialValues.clientFournisseurTelephone"
                        label="Téléphone"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="initialValues.clientFournisseurEmail"
                        label="Email"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                  </div>

                  {/* adresse */}
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="initialValues.numeroRue"
                        label="N°"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-6">
                      <Field
                        name="initialValues.nomRue"
                        label="Rue"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>                   
                  </div>
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="initialValues.boitePostale"
                        label="BP"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="initialValues.codePostal"
                        label="Code postal"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="initialValues.ville"
                        label="Ville"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="initialValues.pays"
                        label="Pays"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>                    
                  </div>   
                  <br />      
                  <hr />

                  {/* coeur devis */}
                  <MDBTable>
                    <MDBTableHead>
                    <tr>
                      <th scope="col"><strong>Produit id</strong></th>
                      <th scope="col"><strong>Commentaire</strong></th>
                      <th scope="col"><strong>Quantité</strong></th>
                      <th scope="col"><strong>Remise</strong></th>
                    </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {this.props.quote.ligneProduitDTOList.map((productLine, index) => (
                        <ProductList key={productLine.id} productLine={productLine} />
                      ))}
                    </MDBTableBody>
                  </MDBTable>    
                  <div className="d-flex flex-row-reverse">
                    <Field
                      name="initialValues.prixTTC"
                      label="Total TTC"
                      component={InputComponent}
                      disabled background
                    />
                  </div>                   
                  <hr />
                  <br />      
                </MDBCardBody>
              </MDBCard><br />
              <div className="row d-flex justify-content-center">
                <RedirectionBtn color="default-color" to="/devis/accueil" txt="retour" size="sm"/>
                <MDBBtn type="submit" size="sm" color="default-color">Enregistrer</MDBBtn>
              </div>
            </Form>
          )}              
        </Formik>
      </MDBContainer>
    );
  }
}