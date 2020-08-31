import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import { Link } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBCardHeader, MDBCardTitle, MDBInput } from "mdbreact";
import UserService from '../../../shared/services/UserService';

const ComposantErreur = (props) => (
  <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
  <div >
    {/* <label> {props.label} </label> */}
    <MDBInput label={props.label} type="text" {...props} className="form-control" {...field} />
  </div>
);

class AddClientFournisseur extends React.Component {
  submit = (values, actions) => {
    AxiosCenter.createClientFournisseur(values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    actions.setSubmitting(true);
    this.props.history.push("/client-fournisseur");
  };

  userSchema = Yup.object().shape({
    nom: Yup.string("String")
      .min(3, "Le nom ne peut contient moins que 3 caractères")
      .max(20, "Le nom ne peut dépasser 20 caractères ")
      .required("Le champ est obligatoire"),
    siren: Yup.number().required(
      "Le champ est obligatoire"
    ),
    email: Yup.string()
      .email("L'email doit être valide")
      .required("Le champ est obligatoire"),
    telephone: Yup.number("Format non conforme").required("Le champ est obligatoire"),
    numeroRue: Yup.string().required("Le champ est obligatoire"),
    nomRue: Yup.string().required("Le champ est obligatoire"),
    codePostal: Yup.string().required("Le champ est obligatoire"),
    ville: Yup.string().required("Le champ est obligatoire"),
    pays: Yup.string().required("Le champ est obligatoire"),
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

                  <Field name="siren" label="SIREN" component={ComposantInput} />
                  <ErrorMessage
                    name="siren"
                    type="number"
                    component={ComposantErreur}
                  />

                  <Field name="email" label="Email" component={ComposantInput} />
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
                    label="Numero"
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
