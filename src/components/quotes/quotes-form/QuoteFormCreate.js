import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer,
        MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { Component } from 'react';
import RedirectionBtn from '../../../shared/component/buttons/RedirectionBtn';
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import InputComponent from '../../../shared/component/form/InputComponent';
import ErrorMessForm from '../../../shared/component/ErrorMessForm';
import Loading from '../../../shared/component/Loading';
import AxiosCenter from '../../../shared/services/AxiosCenter';
import UserService from '../../../shared/services/UserService';

// composants de selection des dates
const StartDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

const EndDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

// select commun au fournisseur et au produit
const ComposantSelect = ({field, form: {touched, errors}, ...props}) => (
  <span>
    <select className="browser-default custom-select md-form md-outline" {...props} {...field}>
      <option defaultValue label={props.label} key="0"/>
      {
        props.list.map((item) => (
          <option value={item.id} label={item.nom} key={item.id}/>
        ))
      }
    </select>
  </span>
)

// tableau de produits
const ArrayComponent = ({productLineList, removeProduct}) =>
productLineList.map((item, index) => (
    <tr key={item.product.id}>
      <td >
        {item.product.reference}
      </td>
      <td>
        {item.product.nom}
      </td>
      <td>
        {item.product.tva} %
      </td>
      <td>
        {item.product.prix} € ht
      </td>
      <td>
        <MDBBtn onClick={ () => {removeProduct(item.product.id)}} size="sm" color="default-color">X</MDBBtn>
      </td>
    </tr>
  )
)

export default class QuoteFormCreate extends Component {

  constructor() {
    super();
    this.state = {
        loaded: false,
        productList: [],
        productLineList: []
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

  componentDidMount() {
    AxiosCenter.getInfosForCreateQuote(UserService.getSocietyId()).then((res) => {
      this.setState({ 
        customerList : res[1].data,
        numDevis : res[0].data+1,
        productList : res[2].data,
        loaded: true
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getInitialValues = () => {
    return {
      numDevis : this.state.numDevis,
      clientFournisseurId: this.state.clientFournisseurId,
      productList: this.state.productList,
      product: ''
    }
  }
  
  getProductById = (id) => {
    return this.state.productList.filter(product => product.id === id)[0];
  }
  
  // ajouter un produit au devis 
  addproductLineList = async () => {
    let currentProduct = document.getElementById("current-product").value
    let newListe = [...this.state.productLineList]
    let product = await this.getProductById(parseInt(currentProduct))
    newListe.push({product: product})
    this.setState({productLineList: newListe})
  }

  // supprimer un produit
  removeProduct = (id) => {
    this.state.productLineList.map((value) => {
      if (value.product.id === id) {
        let index = value.product.id
        this.setState({
          productLineList: this.state.productLineList.filter((v, i) => v.product.id !== index)
        })
      }
    })
  }

  render() {
    if(!this.state.loaded) return <Loading/>
    return (
      <MDBContainer>
        <MDBCardHeader color="default-color">
          <MDBCardTitle>Gestion des Devis</MDBCardTitle>
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
                    {/* client et nom devis */}
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
                    <MDBCol md="6">
                      <Field
                        name="nom"
                        label="Nom du devis ( optionnel )"
                        component={InputComponent}
                        outline
                      />
                    </MDBCol>
                  </MDBRow>
                  {/* produits et tableau de produits */}
                  <MDBRow>
                    <MDBCol md="6">
                      <Field
                        name="productId"
                        id="current-product"
                        label="Liste de produits :"
                        list={this.state.productList}
                        component={ComposantSelect}
                      />
                      <MDBBtn onClick={this.addproductLineList} size="sm" color="default-color">Ajouter</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                  <MDBTable>
                    <MDBTableHead>
                    <tr>
                      <th scope="col"><strong>Reference</strong></th>
                      <th scope="col"><strong>Nom</strong></th>
                      <th scope="col"><strong>TVA</strong></th>
                      <th scope="col"><strong>Prix</strong></th>
                    </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <ArrayComponent 
                        productLineList={this.state.productLineList}
                        removeProduct={this.removeProduct}
                      />
                    </MDBTableBody>
                  </MDBTable>   
                  <hr />
                  {/* prix total et message */}
                  <div className="d-flex flex-row-reverse">
                    <Field
                      name="prixTTC"
                      label="Total TTC"
                      component={InputComponent}
                      outline disabled background
                    />
                  </div>   
                    <MDBCol>
                      <Field
                        name="message"
                        label="Message"
                        component={InputComponent}
                        outline
                      /> 
                    </MDBCol>                
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