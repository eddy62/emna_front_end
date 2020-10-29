import React from "react";
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCardHeader, MDBCardTitle, MDBContainer, MDBInput} from "mdbreact";
import UserService from '../../../shared/services/UserService';
import {toast} from "react-toastify";

const ComposantErreur = (props) => (
  <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
  <div >
    <MDBInput label={props.label} type="text" {...props} className="form-control" {...field} />
  </div>
);

class AddClientFournisseur extends React.Component {
  submit = (values, actions) => {
    AxiosCenter.createCustomerSupplier(values)
      .then((response) => {
        toast.success(
          <div className="text-center">
            <strong>Le nouveau Client Fournisseur {response.data.nom} a été bien crée</strong>
          </div>,
          { position: "top-right" }
        );
          actions.setSubmitting(true);
          this.props.history.push("/client-fournisseur");
      })
      .catch((error) => {
        if(error.data = 'A new clientFournisseur cannot already have an SIRET'){
            toast.error(
                <div className="text-center">
                    <strong>Erreur le SIRET est déjà utilisé par un autre Client Fournisseur &nbsp;&nbsp;!</strong>
                    <br />
                </div>,
                { position: "top-right" }
            );
        } else {
            toast.error(
                <div className="text-center">
                    <strong>Erreur lors de la création d'un nouveau Client Fournisseur &nbsp;&nbsp;!</strong>
                    <br />
                </div>,
                { position: "top-right" }
            );
            actions.setSubmitting(false);
        }
      });
  };

    userSchema = Yup.object().shape({
        nom: Yup.string("String")
            .min(3, "Le nom doit contenir au moins 3 caractères")
            .max(30, "Le nom ne peut dépasser 30 caractères ")
            .required("Le champ est obligatoire"),
        siret: Yup.string()
            .matches(/^[0-9]+$/, "Siret doit être composé uniquement de chiffres").required("Le champ est obligatoire").min(14, 'SIRET doit contenir exactement 14 chiffres')
            .max(14, 'SIRET doit contenir exactement 14 chiffres'),
        email: Yup.string()
            .email("L'adress mail doit être valide")
            .required("Le champ est obligatoire"),
        telephone: Yup.string()
            .matches(/^[0-9]+$/, "Téléphone doit être composé uniquement de chiffres").required("Le champ est obligatoire").min(10, 'Téléphone doit contenir exactement 10 chiffres')
            .max(10, 'Téléphone doit contenir exactement 10 chiffres'),
        numeroRue: Yup.string()
            .matches(/^[0-9a-z ]+$/, "Numéro doit être composé uniquement de chiffres, lettres minuscules, espaces"),
        nomRue: Yup.string().required("Le champ est obligatoire"),
        codePostal: Yup.string().matches(/^(?:[0-8]\d|9[0-8])\d{3}$/, "Code postal invalide").required("Le champ est obligatoire"),
        ville: Yup.string().matches(/^[A-Z ]{1,50}$/, "Ville doit contenir uniquement des majuscules sans accent et des espaces").required("Le champ est obligatoire"),
        pays: Yup.string().matches(/^[A-Z ]{1,50}$/, "Pays doit contenir uniquement des majuscules sans accent et des espaces").required("Le champ est obligatoire"),
    });

  render() {
    return (
      <MDBContainer>
        <div>
          <MDBCardHeader color="default-color">Gestion Client Fournisseur </MDBCardHeader>
          <br></br>
          <MDBCardTitle tag="h3">Enregister un Nouveau Client Fournisseur  </MDBCardTitle>
          <hr></hr>
          <Formik
            onSubmit={this.submit}
            initialValues={{
              nom: "",
              email: "",
              telephone: "",
              codePostal: "",
              ville: "",
              idSociete: UserService.getSocietyId(),
              id: null,
            }}
            validationSchema={this.userSchema}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-white border p-5 d-flex flex-column"
              >
                <div >
                  <Field
                    name="nom"
                    label="Nom de la Société"
                    component={ComposantInput}
                  />
                  <ErrorMessage name="nom" component={ComposantErreur} />

                  <Field name="siret" label="SIRET" component={ComposantInput} />
                  <ErrorMessage
                    name="siret"
                    component={ComposantErreur}
                  />

                  <Field name="email" label="Adresse mail" component={ComposantInput} />
                  <ErrorMessage
                    name="email"
                    type="email"
                    component={ComposantErreur}
                  />
                  <Field
                    name="telephone"
                    label="Téléphone"
                    component={ComposantInput}
                  />
                  <ErrorMessage
                    name="telephone"
                    type="number"
                    component={ComposantErreur}
                  />


                  <Field
                    name="numeroRue"
                    label="Numéro"
                    component={ComposantInput}
                  />
                  <ErrorMessage
                    name="numeroRue"
                    type="number"
                    component={ComposantErreur}
                  />

                  <Field name="nomRue" label="Rue" component={ComposantInput} />
                  <ErrorMessage name="nomRue" component={ComposantErreur} />

                  <Field
                    name="codePostal"
                    label="Code Postal"
                    component={ComposantInput}
                  />
                  <ErrorMessage
                    name="codePostal"
                    type="number"
                    component={ComposantErreur}
                  />

                  <Field name="ville" label="Ville" component={ComposantInput} />
                  <ErrorMessage name="ville" component={ComposantErreur} />
                  <Field name="pays" label="Pays" component={ComposantInput} />
                  <ErrorMessage name="pays" component={ComposantErreur} />
                </div>
                <br></br>
                <div className="row d-flex justify-content-center ">
                  <MDBBtn rounded type="submit" color="primary">
                    Enregistrer
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
        </div>
      </MDBContainer >
    );
  }
}

export default AddClientFournisseur;
