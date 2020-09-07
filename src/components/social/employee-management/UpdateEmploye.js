import React from "react";
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./gestionEmploye.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import Loading from "../../../shared/component/Loading";
import ErrorMessForm from "../../../shared/component/ErrorMessForm";
import { toast } from "react-toastify";

const employeSchema = Yup.object().shape({
  //Identitée
  civilite: Yup.string().required("Champ obligatoire"),
  nomUsage: Yup.string()
    .min(2, "Trop court")
    .max(20, "Trop long")
    .required("Champ obligatoire"),
  prenom: Yup.string().min(2, "Trop court").max(20, "Trop long"),
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
  periodeEssai: Yup.number()
    .max(121, "120 jours limite conventionnelle")
    .required("Champ obligatoire"),
  //Informations Emploi
  raisonSociale: Yup.string("String").max(20, "Trop long"),
  dateEmbauche: Yup.date().required("Champ Obligatoire"),
  dateSortie: Yup.date()
    .min(
      Yup.ref("dateEmbauche"),
      "La date de sortie ne peut être avant la date d'embauche"
    )
    .required("Champ Obligatoire"),
  codeTypeContrat: Yup.string("String").required("Champ Obligatoire"),
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
  <MDBInput label={props.label} outline type="number" {...props} {...field} />
);

class UpdateEmploye extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employe: {},
      listeTypeContrat: [],
      listeStatutEmploye: [],
      loaded: false,
    };
  }

  getInitialValues = () => {
    return this.state.employe;
  };

  componentDidMount() {
    const idEmploye = this.props.match.params.id;
    console.log(idEmploye);
    AxiosCenter.getAllTypeContrats()
      .then((response) => {
        const listeTypeContrat = response.data;
        console.log(listeTypeContrat);
        this.setState({ listeTypeContrat: listeTypeContrat });
      })
      .catch((error) => {
        console.log(error);
      });
    AxiosCenter.getAllStatutEmployes()
      .then((response) => {
        const listeStatutEmploye = response.data;
        console.log(listeStatutEmploye);
        this.setState({ listeStatutEmploye: listeStatutEmploye });
      })
      .catch((error) => {
        console.log(error);
      });
    AxiosCenter.getWrapperEmploye(idEmploye)
      .then((response) => {
        const employe = response.data;
        console.log(employe);
        this.setState({ employe: employe, loaded: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submit = (values, actions) => {
    console.log(values);
    AxiosCenter.updateWrapperEmploye(values)
      .then((response) => {
        console.log(response);
        const employe = response.data;
        console.log(employe);
        if (response.status === 200) {
          toast.success(
            <div className="text-center">
              <strong>Information Employé modofié &nbsp;&nbsp;!</strong>
            </div>,
            { position: "top-right" }
          );
        }
        this.props.history.push("/detailEmploye/" + employe.id);
      })
      .catch((error) => {
        toast.error(
          <div className="text-center">
            <strong>Employé NON Modifié &nbsp;&nbsp;!</strong>
            <br />
            {error.response.data.status === 400 ? (
              <small>{error.response.data.title}</small>
            ) : null}
          </div>,
          { position: "top-right" }
        );
        console.log(error);
      });
    actions.setSubmitting(true);
  };

  render() {
    if (!this.state.loaded) return <Loading />;
    const title = "Gestion Social";
    const title1 = "Modifier un Nouvel Employé";
    const entreprise = this.state.employe.raisonSociale;
    return (
      <div className="App">
        <div className="newEmp">
          <MDBContainer>
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
              initialValues={this.getInitialValues()}
              validationSchema={employeSchema}
              enableReinitialize={true}
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
                            <MDBCol md="2" className="mb-3">
                              <Field
                                name="id"
                                label="N° ID*"
                                disabled
                                component={ComposantInput}
                              />
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                              <Field
                                name="matricule"
                                label="N° Matricule*"
                                disabled
                                component={ComposantInput}
                              />
                            </MDBCol>
                            <MDBCol md="6" className="mb-3">
                              <Field
                                name="numeroSecuriteSociale"
                                label="N° Sécurité Sociale*"
                                disabled
                                component={ComposantInput}
                              />
                            </MDBCol>
                          </MDBRow>
                          <MDBRow between around>
                            {/* ligne2 */}
                            <MDBCol md="2" className="mb-3">
                              <div>
                                <br />
                                <ErrorMessForm
                                  error={errors.matricule}
                                  touched={touched.matricule}
                                  right
                                />
                                <select
                                  className="browser-default custom-select"
                                  name="civilite"
                                  value={values.civilite}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="">Civilité*</option>
                                  <option value="M">Monsieur</option>
                                  <option value="F">Madame</option>
                                </select>
                              </div>
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                              <Field
                                name="nomNaissance"
                                label="Nom de Naissance"
                                disabled
                                component={ComposantInput}
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
                                disabled
                                component={ComposantDate}
                              />
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                              <Field
                                name="villeNaissance"
                                label="Ville de Naissance"
                                disabled
                                component={ComposantInput}
                              />
                            </MDBCol>
                            <MDBCol md="2" className="mb-3">
                              <Field
                                name="departementNaissance"
                                label="Département"
                                disabled
                                component={ComposantInput}
                              />
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                              <Field
                                name="paysNaisance"
                                label="Pays*"
                                disabled
                                component={ComposantInput}
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
                                  <option value="C">Célibataire</option>
                                  <option value="M">Marié(e)</option>
                                  <option value="D">Divorcé(e)</option>
                                  <option value="V">Veuf(ve)</option>
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
                                  name="codeTypeContrat"
                                  value={values.codeTypeContrat}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.listeTypeContrat.map(
                                    (typeContrat) => (
                                      <option value={typeContrat.codeRef}>
                                        {typeContrat.intitule}
                                      </option>
                                    )
                                  )}
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
                                  <option value="EMP">Employé</option>
                                  <option value="AM">Agent de Maitrise</option>
                                  <option value="AC">Assimilé Cadre</option>
                                  <option value="C">Cadre</option>
                                  <option value="STG">Stagiaire</option>
                                </select>
                                {errors.typeContrat && touched.typeContrat && (
                                  <div className="text-danger">
                                    {errors.codeTypeContrat}
                                  </div>
                                )}
                              </div>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow around between>
                            {/* ligne3 */}
                            <MDBCol md="4" className="mb-3">
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
                              <Field
                                name="periodeEssai"
                                label="Essai (Nb jours)*"
                                component={ComposantNumber}
                              />
                              <ErrorMessage
                                name="periodeEssai"
                                component={ComposantErreur}
                              />
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                              <div>
                                <br />
                                <select
                                  className="browser-default custom-select"
                                  name="codeRef"
                                  value={values.codeRef}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {this.state.listeStatutEmploye.map((statut) => (
                                    <option value={statut.codeRef}>
                                      {statut.libelle}
                                    </option>
                                  ))}
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
                        RESET
                    </MDBBtn>

                      <MDBBtn
                        color="teal accent-3"
                        rounded
                        size="sm"
                        onClick={() => {
                          this.props.history.push(
                            "/listEmployes/" + this.state.employe.societeId
                          );
                        }}
                      >
                        ANNULER
                    </MDBBtn>
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

export default UpdateEmploye;
