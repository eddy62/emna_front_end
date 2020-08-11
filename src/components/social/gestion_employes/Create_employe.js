import React from "react";
import "./style2.scss";
import { Formik, Form } from "formik";
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
    AxiosCenter.createWrapperEmploye(values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    actions.setSubmitting(true);
  };

  employeSchema = Yup.object().shape({
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
    boitePostale: Yup.string("String")
      .min(2, "Trop court")
      .max(100, "Trop long")
      .required("Champ obligatoire"), //complement adresse
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
    libelle: Yup.string("String").required("Champ obligatoire"), //StatutEmploye
    salaireHoraire: Yup.number().required("Champ Obligatoire"),
    salaireBrutMensuelle: Yup.number().required("Champ Obligatoire"),
    heuresMensuelle: Yup.string("String").required("Champ Obligatoire"),
  });

  render() {
    const title = "Gestion Social";
    const title1 = "Enregister un Nouvel Employé";
    const entreprise = this.state.societe.raisonSociale;
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
              initialValues={{}}
              validationSchema={this.employeSchema}
            >
              {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
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
                            <MDBInput
                              label="N° Matricule*"
                              outline
                              type="text"
                              name="matricule"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="6" className="mb-3">
                            <MDBInput
                              label="N° Sécurité Sociale*"
                              outline
                              type="text"
                              name="numeroSecuriteSociale"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              >
                                <option>Civilité*</option>
                                <option value="1">Monsieur</option>
                                <option value="2">Madame</option>
                              </select>
                            </div>
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Nom de Naissance"
                              outline
                              type="text"
                              name="nomNaissance"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Nom d'usage*"
                              outline
                              type="text"
                              name="nomUsage"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Prénom(s)"
                              outline
                              type="text"
                              name="prenom"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow between around>
                          {/* ligne3 */}
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              outline
                              label="Date Naissance*"
                              type="date"
                              name="dateNaissance"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Ville de Naissance*"
                              outline
                              type="text"
                              name="villeNaissance"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="2" className="mb-3">
                            <MDBInput
                              label="Département"
                              outline
                              type="text"
                              name="departementNaissance"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Pays*"
                              outline
                              type="text"
                              name="paysNaisance"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
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
                                type="text"
                                name="situationFamiliale"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              >
                                <option>Situation Familiale*</option>
                                <option value="1">Célibataire</option>
                                <option value="2">Marié(e)</option>
                                <option value="2">Divorcé(e)</option>
                                <option value="2">Veuf(ve)</option>
                              </select>
                            </div>
                          </MDBCol>
                          <MDBCol md="4" className="mb-3">
                            <MDBInput
                              label="Enfant(s) à Charge*"
                              outline
                              type="number"
                              name="enfantsACharge"
                              onChange={handleChange}
                              onBlur={handleBlur}
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
                            <MDBInput
                              label="N°"
                              outline
                              type="text"
                              name="numeroRue"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </MDBCol>
                          <MDBCol md="9" className="mb-3">
                            <MDBInput
                              label="Libellé*"
                              outline
                              type="text"
                              name="nomRue"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBRow around between>
                          {/* ligne2 */}
                          <MDBInput
                            label="Complément Adresse/BP"
                            outline
                            type="text"
                            name="boitePostale"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <MDBInput
                            label="Code Postal*"
                            outline
                            type="text"
                            name="codePostal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />

                          <MDBInput
                            label="Ville*"
                            outline
                            type="text"
                            name="ville"
                            required
                          />
                          <MDBInput
                            label="Pays*"
                            outline
                            type="text"
                            name="pays"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                        </MDBRow>
                        <MDBRow around between>
                          {/* ligne3 */}
                          <MDBInput
                            label="Email*"
                            outline
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <MDBInput
                            label="Telephone fixe"
                            outline
                            type="text"
                            name="telephoneFix"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <MDBInput label="Fax" outline type="text" />
                          <MDBInput
                            label="Portable*"
                            outline
                            type="text"
                            name="telephonePortable"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
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
                          <MDBInput
                            label="Sociéte"
                            outline
                            type="text"
                            name="raisonSociale"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={this.state.societe.raisonSociale}
                            disabled="false"
                          />
                          <MDBInput
                            outline
                            label="Date Embauche*"
                            type="date"
                            name="dateEmbauche"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <MDBInput
                            outline
                            label="Date Sortie"
                            type="date"
                            name="dateSortie"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />

                          <div>
                            <br />
                            <select
                              className="browser-default custom-select"
                              type="text"
                              name="typeContrat"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            >
                              <option>Type Contrat*</option>
                              <option value="1">CDD Tps Plein</option>
                              <option value="2">CDD Tps Partiel</option>
                              <option value="3">CDI Tps Plein</option>
                              <option value="4">CDI Tps Partiel</option>
                              <option value="4">Contrat Pro/Alternance</option>
                            </select>
                          </div>
                        </MDBRow>
                        <MDBRow around between>
                          {/* ligne2 */}
                          <MDBCol md="3" className="mb-3">
                            <div>
                              <br />
                              <select
                                className="browser-default custom-select"
                                type="text"
                                name="categorie"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              >
                                <option>Catégorie*</option>
                                <option value="1">Employé</option>
                                <option value="2">Agent de Maitrise</option>
                                <option value="3">Assimilé Cadre</option>
                                <option value="3">Cadre</option>
                                <option value="4">Stagiaire</option>
                              </select>
                            </div>
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Poste*"
                              outline
                              type="text"
                              name="poste"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <div>
                              <br />
                              <select
                                className="browser-default custom-select"
                                type="text"
                                name="libelle"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              >
                                <option>Statut*</option>
                                <option value="1">Non Embauche</option>
                                <option value="2">Embauché</option>
                                <option value="3">Stagiaire</option>
                                <option value="4">Cadre</option>
                              </select>
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow around between>
                          {/* ligne3 */}
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Salaire Horaire*"
                              outline
                              type="text"
                              name="salaireHoraire"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Salaire Mensuel*"
                              outline
                              type="text"
                              name="salaireBrutMensuelle"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <MDBInput
                              label="Heures Mensuelles*"
                              outline
                              type="text"
                              name="heuresMensuelle"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
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
                      onClick={this.submit}
                    >
                      Enregistrer
                    </MDBBtn>

                    <MDBBtn
                      color="teal accent-3"
                      rounded
                      size="sm"
                      type="reset"
                    >
                      RESET
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
                      Retour
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

export default NewEmploye;
