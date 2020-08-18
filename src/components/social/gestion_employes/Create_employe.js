import React from "react";
import "./style2.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../shared/services/AxiosCenter";

import {
  MDBContainer,
  MDBCardHeader,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCardBody,
  MDBCard,
  MDBInput,
  MDBCol,
} from "mdbreact";

const employeSchema = Yup.object().shape({
  //Identitée
  matricule: Yup.string()
    .min(6, "Trop court")
    .max(8, "Trop long")
    .required("Champ obligatoire"),
  numeroSecuriteSociale: Yup.string("String")
    .min(15, "Numero non Conforme")
    .max(15, "Numero non Conforme")
    .required("Champ obligatoire"),
  civilite: Yup.string().required("Champ obligatoire"),
  nomNaissance: Yup.string().min(2, "Trop court").max(20, "Trop long"),
  nomUsage: Yup.string()
    .min(2, "Trop court")
    .max(20, "Trop long")
    .required("Champ obligatoire"),
  prenom: Yup.string().min(2, "Trop court").max(20, "Trop long"),
  dateNaissance: Yup.date().required("Champ obligatoire"),
  villeNaissance: Yup.string()
    .min(2, "Trop court")
    .max(20, "Trop long")
    .required("Champ obligatoire"),
  departementNaissance: Yup.string("String")
    .min(2, "Trop court")
    .max(20, "Trop long"),
  paysNaisance: Yup.string("String")
    .min(2, "Trop court")
    .max(20, "Trop long")
    .required("Champ obligatoire"),
  situationFamiliale: Yup.string("String").required("Champ Obligatoire"),
  enfantsACharge: Yup.string("String").required("Champ Obligatoire"),
  //Coordonnées
  numeroRue: Yup.string().max(5, "Trop long"),
  nomRue: Yup.string()
    .min(2, "Trop court")
    .max(100, "Trop long")
    .required("Champ obligatoire"),
  boitePostale: Yup.string("String").min(2, "Trop court").max(100, "Trop long"), //complement adresse
  codePostal: Yup.number(),
  ville: Yup.string("String")
    .min(2, "Trop court")
    .max(20, "Trop long")
    .required("Champ obligatoire"),
  pays: Yup.string("String")
    .min(2, "Trop court")
    .max(20, "Trop long")
    .required("Champ obligatoire"),
  email: Yup.string()
    .email("L'email doit être valide")
    .required("Le champ est obligatoire"),
  telephoneFix: Yup.number().min(9, "Trop court"),
  telephonePortable: Yup.number().min(9, "Trop court"),
  fax: Yup.number().min(9, "Trop court"),
  //Informations Emploi
  raisonSociale: Yup.string("String").max(20, "Trop long"),
  dateEmbauche: Yup.date().required("Champ Obligatoire"),
  dateSortie: Yup.date().required("Champ Obligatoire"),
  typeContrat: Yup.string("String").required("Champ Obligatoire"),
  categorie: Yup.string("String").required("Champ Obligatoire"),
  poste: Yup.string("String").required("Champ Obligatoire"),
  codeRef: Yup.string("String").required("Champ obligatoire"), //StatutEmploye
  salaireHoraire: Yup.number().required("Champ Obligatoire"),
  salaireBrutMensuelle: Yup.number().required("Champ Obligatoire"),
  heuresMensuelle: Yup.string("String").required("Champ Obligatoire"),
});

const ComposantErreur = (props) => (
  <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="text" {...props} {...field} />
);

const ComposantDate = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);
const ComposantNumber = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput
    label={props.label}
    min="0"
    outline
    type="number"
    {...props}
    {...field}
  />
);

class NewEmploye extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      societe: {},
    };
  }

  componentDidMount() {
    const idSociete = this.props.match.params.id;
    console.log(idSociete);
    AxiosCenter.getWrapperSociete(idSociete)
      .then((response) => {
        const societe = response.data;
        console.log(societe);
        this.setState({ societe: societe });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submit = (values, actions) => {
    console.log(values);
    AxiosCenter.createWrapperEmploye(values)
      .then((response) => {
        const employe = response.data;
        console.log(employe);
        this.props.history.push("/detailEmploye/" + employe.id);
      })
      .catch((error) => {
        console.log(error);
      });
    actions.setSubmitting(true);
  };

  render() {
    const title = "Gestion Social";
    const title1 = "Enregister un Nouvel Employé";
    const entreprise = this.state.societe.raisonSociale;
    return (
      <div className="App">
        <div className="newEmp">
          <MDBContainer responsive>
            <div>
              <MDBCardHeader color="default-color">
                <MDBCardTitle tag="h1">{title}</MDBCardTitle>
                <br />
                <MDBCardTitle tag="h3">{entreprise}</MDBCardTitle>
              </MDBCardHeader>
            </div>
            <div>
              <hr></hr>
            </div>
            <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
              {title1}
            </MDBCardHeader>
            <div>
              <hr></hr>
            </div>
            {/* formulaire */}
            <Formik
              onSubmit={this.submit}
              initialValues={{
                id: null,
                matricule: "",
                numeroSecuriteSociale: "",
                civilite: "",
                nomNaissance: "",
                nomUsage: "",
                prenom: "",
                dateNaissance: "",
                villeNaissance: "",
                departementNaissance: "",
                paysNaisance: "",
                situationFamiliale: "",
                enfantsACharge: "",
                numeroRue: "",
                nomRue: "",
                boitePostale: "",
                codePostal: "",
                ville: "",
                pays: "",
                email: "",
                telephoneFix: "",
                telephonePortable: "",
                fax: "",
                societeId: 1,
                raisonSociale: "JAKARTA SARL", //TO DO recupère le nom de la société
                dateEmbauche: "",
                dateSortie: "",
                typeContrat: "",
                categorie: "",
                poste: "",
                codeRef: "",
                salaireHoraire: "",
                salaireBrutMensuelle: "",
                heuresMensuelle: "",
              }}
              validationSchema={employeSchema}
            >
              {({
                values,
                errors,
                touched,
                dirty,
                isSubmitting,
                handleSubmit,
                handleChange,
                handleBlur,
                handleReset,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <MDBCardBody>
                      <MDBCardTitle className="text" tag="h5">
                        Identitée
                      </MDBCardTitle>
                      <MDBCard className="cadre">
                        <MDBRow around between>
                          {/* ligne1 */}
                          <MDBCol md="4" className="mb-3">
                            <Field
                              name="matricule"
                              label="N° Matricule*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="matricule"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="6" className="mb-3">
                            <Field
                              name="numeroSecuriteSociale"
                              label="N° Sécurité Sociale*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="numeroSecuriteSociale"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow between around>
                          {/* ligne2 */}
                          <MDBCol md="2" className="mb-3">
                            <div>
                              <br />
                              <select
                                className="browser-default custom-select"
                                name="civilite"
                                value={values.civilite}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Civilité*</option>
                                <option value="Monsieur">Monsieur</option>
                                <option value="Madame">Madame</option>
                              </select>
                              {errors.civilite && touched.civilite && (
                                <div className="text-danger">
                                  {errors.civilite}
                                </div>
                              )}
                            </div>
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="nomNaissance"
                              label="Nom de Naissance"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="nomNaissance"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="nomUsage"
                              label="Nom d'usage*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="nomUsage"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="prenom"
                              label="Prénom(s)"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="prenom"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow between around>
                          {/* ligne3 */}
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="dateNaissance"
                              label="Date Naissance*"
                              component={ComposantDate}
                            />
                            <ErrorMessage
                              name="dateNaissance"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="villeNaissance"
                              label="Ville de Naissance"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="villeNaissance"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="mb-3">
                            <Field
                              name="departementNaissance"
                              label="Département"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="departementNaissance"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="paysNaisance"
                              label="Pays*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="paysNaisance"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow between around>
                          {/* ligne4 */}
                          <MDBCol md="4" className="mb-3">
                            <div>
                              <br />
                              <select
                                className="browser-default custom-select"
                                name="situationFamiliale"
                                value={values.situationFamiliale}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Situation Familiale*</option>
                                <option value="Célibataire">Célibataire</option>
                                <option value="Marié(e)">Marié(e)</option>
                                <option value="Divorcé(e)">Divorcé(e)</option>
                                <option value="Veuf(ve)">Veuf(ve)</option>
                              </select>
                              {errors.civilite && touched.civilite && (
                                <div className="text-danger">
                                  {errors.civilite}
                                </div>
                              )}
                            </div>
                          </MDBCol>
                          <MDBCol md="4" className="mb-3">
                            <Field
                              name="enfantsACharge"
                              label="Enfant(s) à Charge*"
                              component={ComposantNumber}
                            />
                            <ErrorMessage
                              name="enfantsACharge"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCard>
                    </MDBCardBody>
                    <MDBCardBody>
                      <MDBCardTitle className="text" tag="h5">
                        Coordonnées
                      </MDBCardTitle>
                      <MDBCard className="cadre">
                        <MDBRow around between>
                          {/* ligne1 */}
                          <MDBCol md="2" className="mb-3">
                            <Field
                              name="numeroRue"
                              label="N°"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="numeroRue"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="9" className="mb-3">
                            <Field
                              name="nomRue"
                              label="Libellé*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="nomRue"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow around between>
                          {/* ligne2 */}
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="boitePostale"
                              label="Complément Adresse / BP"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="boitePostale"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="mb-3">
                            <Field
                              name="codePostal"
                              label="Code Postal*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="codePostal"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="ville"
                              label="Ville*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="ville"
                              component={ComposantErreur}
                            />
                          </MDBCol>

                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="pays"
                              label="Pays*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="pays"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow around between>
                          {/* ligne3 */}
                          <MDBCol md="4" className="mb-3">
                            <Field
                              name="email"
                              label="Email*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="email"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="mb-3">
                            <Field
                              name="telephoneFix"
                              label="Telephone fixe"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="telephoneFix"
                              component={ComposantErreur}
                            />
                          </MDBCol>

                          <MDBCol md="2" className="mb-3">
                            <Field
                              name="fax"
                              label="Fax"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="fax"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="mb-3">
                            <Field
                              name="telephonePortable"
                              label="Portable*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="telephonePortable"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCard>
                    </MDBCardBody>
                    <MDBCardBody>
                      <MDBCardTitle className="text" tag="h5">
                        Informations Emploi
                      </MDBCardTitle>
                      <MDBCard className="cadre">
                        <br />
                        <MDBRow around between>
                          {/* ligne1 */}
                          <MDBCol md="4" className="mb-3">
                            <Field
                              name="raisonSociale"
                              label="Société*"
                              disabled
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="raisonSociale"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="dateEmbauche"
                              label="Date Embauche*"
                              component={ComposantDate}
                            />
                            <ErrorMessage
                              name="dateEmbauche"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="dateSortie"
                              label="Date Sortie"
                              component={ComposantDate}
                            />
                            <ErrorMessage
                              name="dateSortie"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow around between>
                          {/* ligne3 */}
                          <MDBCol md="6" className="mb-3">
                            <div>
                              <br />
                              <select
                                className="browser-default custom-select"
                                name="typeContrat"
                                value={values.typeContrat}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Type Contrat*</option>
                                <option value="CDD Tps Plein">
                                  CDD Tps Plein
                                </option>
                                <option value="CDD Tps Partiel2">
                                  CDD Tps Partiel
                                </option>
                                <option value="CDI Tps Plein">
                                  CDI Tps Plein
                                </option>
                                <option value="CDI Tps Partie">
                                  CDI Tps Partiel
                                </option>
                                <option value="Contrat Pro/Alternance">
                                  Contrat Pro/Alternance
                                </option>
                              </select>
                              {errors.typeContrat && touched.typeContrat && (
                                <div className="text-danger">
                                  {errors.typeContrat}
                                </div>
                              )}
                            </div>
                          </MDBCol>
                          <MDBCol md="4" className="mb-3">
                            <div>
                              <br />
                              <select
                                className="browser-default custom-select"
                                name="categorie"
                                value={values.categorie}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Catégorie*</option>
                                <option value="Employé">Employé</option>
                                <option value="Agent de Maitrise">
                                  Agent de Maitrise
                                </option>
                                <option value="Assimilé Cadre">
                                  Assimilé Cadre
                                </option>
                                <option value="Cadre">Cadre</option>
                                <option value="Stagiaire">Stagiaire</option>
                              </select>
                              {errors.typeContrat && touched.typeContrat && (
                                <div className="text-danger">
                                  {errors.typeContrat}
                                </div>
                              )}
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow around between>
                          {/* ligne3 */}
                          <MDBCol md="7" className="mb-3">
                            <Field
                              name="poste"
                              label="Poste"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="poste"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <div>
                              <br />
                              <select
                                className="browser-default custom-select"
                                name="codeRef"
                                value={values.libelle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Statut Employé*</option>
                                <option value="EMPNEMB">Non Embauché</option>
                                <option value="EMPEMB">Embauché</option>
                                <option value="EMPEND">Sorti</option>
                                <option value="EMPOTHER">Autre</option>
                              </select>
                              {errors.typeContrat && touched.typeContrat && (
                                <div className="text-danger">
                                  {errors.typeContrat}
                                </div>
                              )}
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow around between>
                          {/* ligne4 */}

                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="salaireHoraire"
                              label="Salaire Horaire*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="salaireHoraire"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="salaireBrutMensuelle"
                              label="Salaire Mensuel*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="salaireBrutMensuelle"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <Field
                              name="heuresMensuelle"
                              label="Heures Mensuelles*"
                              component={ComposantInput}
                            />
                            <ErrorMessage
                              name="heuresMensuelle"
                              component={ComposantErreur}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCard>
                    </MDBCardBody>
                  </div>
                  <p className="small">* Mention Obligatoire</p>
                  <div>
                    <hr></hr>
                  </div>
                  <div>
                    <MDBRow around between>
                      <MDBBtn
                        color="teal accent-3"
                        rounded
                        size="sm"
                        type="submit"
                      >
                        Enregistrer
                      </MDBBtn>

                      <MDBBtn
                        color="teal accent-3"
                        rounded
                        size="sm"
                        type="reset"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                      >
                        INITIALISER
                      </MDBBtn>

                      <MDBBtn
                        color="teal accent-3"
                        rounded
                        size="sm"
                        onClick={() => {
                          this.props.history.push(
                            "/listEmployes/" + this.state.societe.id
                          );
                        }}
                      >
                        ANNULER
                      </MDBBtn>
                    </MDBRow>
                  </div>
                </Form>
              )}
            </Formik>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default NewEmploye;
