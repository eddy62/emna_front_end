import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { Component } from 'react';
import RedirectionBtn from '../../../shared/component/buttons/RedirectionBtn';
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import InputComponent from '../../../shared/component/form/InputComponent';
import ErrorMessForm from '../../../shared/component/ErrorMessForm';
import Loading from '../../../shared/component/Loading';
import AxiosCenter from '../../../shared/services/AxiosCenter';
import UserService from '../../../shared/services/UserService';

const StartDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

const EndDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

const ComposantSelect = ({field, form: {touched, errors}, ...props}) => (
  <span>
      <select className="browser-default custom-select md-form md-outline" {...props} {...field}>
          <option defaultValue label="Sélectionnez un fournisseur" key="0"/>
          {
              props.list.map((item) => (
                  <option value={item.id} label={item.nom} key={item.id}/>
              ))
          }
      </select>
  </span>
)

export default class QuoteFormCreate extends Component {

  constructor() {
    super();
    this.state = {
        loaded: false,
    }
}

  lexique = {
    required : "le champ est obligatoire",
  }

  quotesShema = Yup.object().shape({
    dateCreation                  : Yup.date().required("Date obligatoire"),
    dateLimite                    : Yup.date().required("Date obligatoire")
                                              .min(Yup.ref('dateCreation'),"La date limite doit être ultérieure à la date de création"),
    clientFournisseurId           : Yup.number().required(this.lexique.required)                                   
  });

  getInitialValues = () => {
    return {
      numDevis : this.state.numDevis,
      clientFournisseurId: this.state.clientFournisseurId,
    }
  }

  componentDidMount() {
      AxiosCenter.getInfosForCreateQuote(UserService.getSocietyId()).then((res) => {
        this.setState({ 
          customerList : res[1].data,
          numDevis : res[0].data,
          loaded: true
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    if(!this.state.loaded) return <Loading/>
    return (
      <MDBContainer>
        <MDBCardHeader color="default-color">
          <MDBCardTitle>Accueil Devis</MDBCardTitle>
          <br />
        </MDBCardHeader>
        <hr />  
        <MDBCardTitle tag="h3">{this.props.title}</MDBCardTitle>
        <hr/> 
        <Formik
          onSubmit={this.props.onSubmit}
          initialValues={this.getInitialValues()}
          validationSchema={this.quotesShema}
        >
          {({
            handleSubmit,
            errors,
          }) => (
            <Form onSubmit={handleSubmit} className="container-fluid lighten-5 justify-content-center align-items-center">
              <MDBCard>
                <MDBCardBody>

                  {/* références entête devis */}
                  <MDBRow>
                    <MDBCol md="4">
                      <Field
                        name="numDevis"
                        label="Numéro de devis"
                        component={InputComponent}
                        outline disabled background 
                      />
                    </MDBCol>
                    <MDBCol md="4">
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
                    </MDBCol>
                    <MDBCol md="4">
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
                    </MDBCol>                      
                  </MDBRow>  
                  <MDBRow>
                    <MDBCol md="4">
                      <Field
                        name="nom"
                        label="Nom du devis"
                        component={InputComponent}
                        outline
                      />
                    </MDBCol>
                    <MDBCol md="8">
                      <Field
                        name="message"
                        label="Message"
                        component={InputComponent}
                        outline
                      /> 
                    </MDBCol>
                  </MDBRow>

                  {/* client */}
                  <MDBRow>
                    <MDBCol md="6">
                      <Field
                        name="clientFournisseurId"
                        label="Client Fournisseur :"
                        list={this.state.customerList}
                        component={ComposantSelect}
                      />
                      <ErrorMessForm
                        error={errors.clientFournisseurId}
                        touched={errors.clientFournisseurId}
                        left
                      />
                    </MDBCol>
                  </MDBRow>
                
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