import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { Component } from 'react';
import RedirectionBtn from '../../../shared/component/buttons/RedirectionBtn';
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import InputComponent from '../../../shared/component/form/InputComponent';
import ErrorMessForm from '../../../shared/component/ErrorMessForm';

const StartDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

const EndDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

export default class QuoteFormCreate extends Component {

  lexique = {
    required : "le champ est obligatoire",
  }

  quotesShema = Yup.object().shape({
    dateCreation                  : Yup.date().required("Date obligatoire"),
    dateLimite                    : Yup.date().required("Date obligatoire")
                                              .min(Yup.ref('dateCreation'),"La date limite doit être ultérieure à la date de création"),
    clientFournisseurNom          : Yup.string().required(this.lexique.required)
                                                .min(3, "Le nom ne peut contenir moins de 3 caractères")
                                                .max(30, "Le nom ne peut dépasser 30 caractères "),
    clientFournisseurSiret        : Yup.string().required(this.lexique.required)
                                                .matches(/^[0-9]+$/, "Le Siret doit être composé uniquement de chiffres")
                                                .min(14, 'Doit contenir exactement 14 chiffres')
                                                .max(14, 'Doit contenir exactement 14 chiffres'),
    clientFournisseurTelephone    : Yup.string().matches(/^[0-9]+$/, "Telephone doit être composé uniquement de chiffres")
                                                .required(this.lexique.required)
                                                .min(10, 'Doit contenir exactement 10 chiffres')
                                                .max(10, 'Doit contenir exactement 10 chiffres'),
    clientFournisseurEmail        : Yup.string().required(this.lexique.required)
                                                .email("L'adresse Email doit être valide"),
    numeroRue                     : Yup.string().required(this.lexique.required)
                                                .matches(/^[0-9]+$/, "Le numero de rue doit être composé uniquement de chiffres"),
    nomRue                        : Yup.string().required(this.lexique.required)
                                                .min(3, "Le nom ne peut contenir moins de 3 caractères"),
    boitePostale                  : Yup.string().required(this.lexique.required),
    codePostal                    : Yup.string().required(this.lexique.required)
                                                .matches(/^[0-9]+$/, "Code postal invalide"),
    ville                         : Yup.string().required(this.lexique.required)
                                                .matches(/^[a-zA-Zéçèùàêû\s]+$/, "La ville doit être composé uniquement de lettres"),
    pays                          : Yup.string().required(this.lexique.required)
                                                .matches(/^[a-zA-Zéçèùàêû\s]+$/, "Le pays doit être composé uniquement de lettres"),
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
                        name="numDevis"
                        label={this.props.number}
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="dateCreation"
                        label="Date de création"
                        component={StartDateComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.dateCreation}
                        touched={errors.dateCreation}           
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="dateLimite"
                        label="Date limite"
                        component={EndDateComponent}
                        outline
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
                        name="nom"
                        label="Nom du devis"
                        component={InputComponent}
                        outline
                      />
                    </div>
                    <div className="d-flex flex-column col-md-8">
                      <Field
                        name="message"
                        label="Message"
                        component={InputComponent}
                        outline
                      /> 
                    </div>
                  </div>

                  {/* client */}
                  {/* <div className="form-group row">
                    <div className="d-flex flex-column col-md-8">
                      <select className="browser-default custom-select">
                        <option>Choisissez un client dans la liste</option>
                          {this.props.customerList.map((client) => (
                            <option value={client.nom} label={client.nom} key={client.id}></option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-3">
                      <Field
                        name="clientFournisseurId"
                        label="id client"
                        component={InputComponent}
                        outline disabled background
                      />
                    </div>
                  </div> */}
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-3">
                      <Field
                        name="clientFournisseurNom"
                        label="Nom client"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.clientFournisseurNom}
                        touched={errors.clientFournisseurNom}           
                      />
                    </div>
                    <div className="d-flex flex-column col-md-3">
                      <Field
                        name="clientFournisseurSiret"
                        label="Siret"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.clientFournisseurSiret}
                        touched={errors.clientFournisseurSiret}           
                      />
                    </div>
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="clientFournisseurTelephone"
                        label="Téléphone"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.clientFournisseurTelephone}
                        touched={errors.clientFournisseurTelephone}           
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="clientFournisseurEmail"
                        label="Email"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.clientFournisseurEmail}
                        touched={errors.clientFournisseurEmail}           
                      />
                    </div>
                  </div>

                  {/* adresse */}
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="numeroRue"
                        label="N°"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.numeroRue}
                        touched={errors.numeroRue}           
                      />
                    </div>
                    <div className="d-flex flex-column col-md-6">
                      <Field
                        name="nomRue"
                        label="Rue"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.nomRue}
                        touched={errors.nomRue}           
                      />
                    </div>                   
                  </div>
                  <div className="form-group row">
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="boitePostale"
                        label="BP"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.boitePostale}
                        touched={errors.boitePostale}           
                      />
                    </div>
                    <div className="d-flex flex-column col-md-2">
                      <Field
                        name="codePostal"
                        label="Code postal"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.codePostal}
                        touched={errors.codePostal}           
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="ville"
                        label="Ville"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.ville}
                        touched={errors.ville}           
                      />
                    </div>
                    <div className="d-flex flex-column col-md-4">
                      <Field
                        name="pays"
                        label="Pays"
                        component={InputComponent}
                        outline
                      />
                      <ErrorMessForm
                        error={errors.pays}
                        touched={errors.pays}           
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
                      {/* {this.props.quote.ligneProduitDTOList.map((productLine, index) => (
                        <ProductList key={productLine.id} productLine={productLine} />
                      ))} */}
                    </MDBTableBody>
                  </MDBTable>    
                  <div className="d-flex flex-row-reverse">
                    <Field
                      name="prixTTC"
                      label="Total TTC"
                      component={InputComponent}
                      outline disabled background
                    />
                  </div>                   
                  <hr />
                  <br />      
                     
                  {/* documents */}
                  {/* <Field
                    name="documentDTOList"
                    label="Documents relatifs"
                    component={InputComponent}
                    outline
                  />         */}
                  
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