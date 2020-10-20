import React from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
} from "mdbreact";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import * as dateFns from "date-fns";
import "./gestionEmploye.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import Loading from "../../../shared/component/Loading";
import ErrorMessForm from "../../../shared/component/ErrorMessForm";
import {toast} from "react-toastify";
import UserService from "../../../shared/services/UserService";
import NotificationService from "../../../shared/services/NotificationService";

const employeSchema = Yup.object().shape({
    //Identitée
    matricule: Yup.string()
        .min(6, "Trop court")
        .max(8, "Trop long")
        .required("Champ obligatoire - Format 'EMP<num>'"),
    numeroSecuriteSociale: Yup.string("String")
        .min(15, "Numero non Conforme - 15 Chiffres")
        .max(15, "Numero non Conforme - 15 Chiffres")
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
    paysNaissance: Yup.string("String")
        .min(2, "Trop court")
        .max(20, "Trop long")
        .required("Champ obligatoire"),
    situationFamiliale: Yup.string("String").required("Champ Obligatoire"),
    nbEnfantACharge: Yup.string("String").required("Champ Obligatoire"),
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
    telephoneFixe: Yup.number().min(9, "Trop court"),
    telephonePortable: Yup.number().min(9, "Trop court"),
    fax: Yup.number().min(9, "Trop court"),
    //Informations Emploi
    raisonSociale: Yup.string("String").max(20, "Trop long"),
    dateEmbauche: Yup.date().required("Champ Obligatoire"),
    // dateSortie: Yup.date().min(Yup.ref("dateEmbauche"), "La date de sortie ne peut être avant la date d'embauche"),
    // codeRefContrat: Yup.string("String").required("Champ Obligatoire"),
    categorie: Yup.string("String").required("Champ Obligatoire"),
    poste: Yup.string("String").required("Champ Obligatoire"),
    // codeRefStatut: Yup.string("String").required("Champ obligatoire"), //StatutEmploye
    salaireHoraire: Yup.number().required("Champ Obligatoire"),
    salaireBrutMensuel: Yup.number().required("Champ Obligatoire"),
    nbHeureMensuelle: Yup.string("String").required("Champ Obligatoire"),
    periodeEssai: Yup.number()
        .max(121, "120 jours limite conventionnelle")
        .required("Champ obligatoire"),
});

const ComposantInput = ({field, form: {touched, errors}, ...props}) => (
    <MDBInput label={props.label} outline type="text" {...props} {...field} />
);

const ComposantDate = ({field, form: {touched, errors}, ...props}) => (
    <MDBInput label={props.label} outline type="date" {...props} {...field} />
);
const ComposantNumber = ({field, form: {touched, errors}, ...props}) => (
    <MDBInput
        label={props.label}
        min="0"
        outline
        type="number"
        {...props}
        {...field}
    />
);
const ComposantNumberDecimal = ({field, form: {touched, errors}, ...props}) => (
    <MDBInput
        label={props.label}
        min="0.01"
        step="0.01"
        outline
        type="number"
        {...props}
        {...field}
    />
);

class CreateEmploye extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            societe: {},
            // listeTypeContrat: [],
            listeStatutEmploye: [],
            loaded: false,
        };
    }

    componentDidMount() {
        const idSociete = this.props.match.params.id;
        console.log(idSociete);
        // AxiosCenter.getAllTypeContracts()
        //     .then((response) => {
        //         const listeTypeContrat = response.data;
        //         console.log(listeTypeContrat);
        //         this.setState({listeTypeContrat: listeTypeContrat});
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        AxiosCenter.getAllStatutEmployees()
            .then((response) => {
                const listeStatutEmploye = response.data;
                console.log(listeStatutEmploye);
                this.setState({listeStatutEmploye: listeStatutEmploye});
            })
            .catch((error) => {
                console.log(error);
            });
        AxiosCenter.getWrapperSociety(idSociete)
            .then((response) => {
                const societe = response.data;
                console.log(societe);
                this.setState({societe: societe, loaded: true});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    submit = (values, actions) => {
        const entityName = "Employé(e)";

        const diff = dateFns.differenceInCalendarYears(
            new Date(),
            new Date(values.dateNaissance)
        );
        console.log(diff);
        if (diff >= 14) {
            AxiosCenter.createWrapperEmployee(values)
                .then((response) => {
                    console.log(response);
                    const employe = response.data;
                    console.log(employe);
                    if (response.status === 200) {

                    }
                    this.props.history.push("/detailEmploye/" + employe.id);
                })
                .catch((error) => {
                    console.log(error.response);
                    NotificationService.successRegistration(entityName);
                });
            actions.setSubmitting(true);
        } else {
            toast.error(
                <div className="text-center">
                    <strong>Employé NON Enregistré !</strong>
                    <br/>
                    <small>Date de Naissance incorrecte !</small>
                    <br/>
                    <small>L'âge minimum pour travailler est de 14 ans !</small>
                </div>
            );
        }
    };

    render() {
        if (!this.state.loaded) return <Loading/>;
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
                                <br/>
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
                                paysNaissance: "",
                                situationFamiliale: "",
                                nbEnfantACharge: "",
                                numeroRue: "",
                                nomRue: "",
                                boitePostale: "",
                                codePostal: "",
                                ville: "",
                                pays: "",
                                email: "",
                                telephoneFixe: "",
                                telephonePortable: "",
                                fax: "",
                                societeId: UserService.getSocietyId(),
                                raisonSociale: entreprise,
                                dateEmbauche: "",
                                dateSortie: "",
                                // codeRefContrat: "",
                                categorie: "",
                                poste: "",
                                codeRefStatut: "EMPNEMB",
                                salaireHoraire: "",
                                salaireBrutMensuel: "",
                                nbHeureMensuelle: "",
                                periodeEssai: 0,
                                // valeurs precedemment absentes (new jdl)
                                adresseId: null,
                                archive: false,
                                dateCreation: "",
                                // idContrat: null,
                                // idTypeContrat: null,
                                infoEntrepriseId: null,
                                intitule: "",
                                libelle: "",
                                signe: false,
                                statutEmployeId: null,
                                titre: ""
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
                                                        <ErrorMessForm
                                                            error={errors.matricule}
                                                            touched={touched.matricule}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="6" className="mb-3">
                                                        <Field
                                                            name="numeroSecuriteSociale"
                                                            label="N° Sécurité Sociale*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.numeroSecuriteSociale}
                                                            touched={touched.numeroSecuriteSociale}
                                                            right
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow between around>
                                                    {/* ligne2 */}
                                                    <MDBCol md="2" className="mb-3">
                                                        <div>
                                                            <br/>
                                                            <ErrorMessForm
                                                                error={errors.civilite}
                                                                touched={touched.civilite}
                                                                right
                                                            />
                                                            <select
                                                                className="browser-default custom-select"
                                                                name="civilite"
                                                                value={values.civilite}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            >
                                                                <option value="" disabled selected>
                                                                    Civilité*
                                                                </option>
                                                                <option value="M">Monsieur</option>
                                                                <option value="F">Madame</option>
                                                            </select>
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="nomNaissance"
                                                            label="Nom de Naissance"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.nomNaissance}
                                                            touched={touched.nomNaissance}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="nomUsage"
                                                            label="Nom d'usage*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.nomUsage}
                                                            touched={touched.nomUsage}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="prenom"
                                                            label="Prénom(s)"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.prenom}
                                                            touched={touched.prenom}
                                                            right
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
                                                        <ErrorMessForm
                                                            error={errors.dateNaissance}
                                                            touched={touched.dateNaissance}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="villeNaissance"
                                                            label="Ville de Naissance*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.villeNaissance}
                                                            touched={touched.villeNaissance}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="2" className="mb-3">
                                                        <Field
                                                            name="departementNaissance"
                                                            label="Département"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.departementNaissance}
                                                            touched={touched.departementNaissance}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="paysNaissance"
                                                            label="Pays*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.paysNaissance}
                                                            touched={touched.paysNaissance}
                                                            right
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow between around>
                                                    {/* ligne4 */}
                                                    <MDBCol md="4" className="mb-3">
                                                        <div>
                                                            <br/>
                                                            <ErrorMessForm
                                                                error={errors.situationFamiliale}
                                                                touched={touched.situationFamiliale}
                                                                right
                                                            />
                                                            <select
                                                                className="browser-default custom-select"
                                                                name="situationFamiliale"
                                                                value={values.situationFamiliale}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            >
                                                                <option value="" disabled selected>
                                                                    Situation Familiale*
                                                                </option>
                                                                <option value="C">Célibataire</option>
                                                                <option value="M">Marié(e)</option>
                                                                <option value="D">Divorcé(e)</option>
                                                                <option value="V">Veuf(ve)</option>
                                                            </select>
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol md="4" className="mb-3">
                                                        <Field
                                                            name="nbEnfantACharge"
                                                            label="Enfant(s) à Charge*"
                                                            component={ComposantNumber}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.nbEnfantACharge}
                                                            touched={touched.nbEnfantACharge}
                                                            right
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
                                                        <ErrorMessForm
                                                            error={errors.numeroRue}
                                                            touched={touched.numeroRue}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="9" className="mb-3">
                                                        <Field
                                                            name="nomRue"
                                                            label="Libellé*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.nomRue}
                                                            touched={touched.nomRue}
                                                            right
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
                                                        <ErrorMessForm
                                                            error={errors.boitePostale}
                                                            touched={touched.boitePostale}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="2" className="mb-3">
                                                        <Field
                                                            name="codePostal"
                                                            label="Code Postal*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.codePostal}
                                                            touched={touched.codePostal}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="ville"
                                                            label="Ville*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.ville}
                                                            touched={touched.ville}
                                                            right
                                                        />
                                                    </MDBCol>

                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="pays"
                                                            label="Pays*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.pays}
                                                            touched={touched.pays}
                                                            right
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
                                                        <ErrorMessForm
                                                            error={errors.email}
                                                            touched={touched.email}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="2" className="mb-3">
                                                        <Field
                                                            name="telephoneFixe"
                                                            label="Telephone fixe"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.telephoneFixe}
                                                            touched={touched.telephoneFixe}
                                                            right
                                                        />
                                                    </MDBCol>

                                                    <MDBCol md="2" className="mb-3">
                                                        <Field
                                                            name="fax"
                                                            label="Fax"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.fax}
                                                            touched={touched.fax}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="2" className="mb-3">
                                                        <Field
                                                            name="telephonePortable"
                                                            label="Portable*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.telephonePortable}
                                                            touched={touched.telephonePortable}
                                                            right
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
                                                <br/>
                                                <MDBRow around between>
                                                    {/* ligne1 */}
                                                    <MDBCol md="4" className="mb-3">
                                                        <Field
                                                            name="raisonSociale"
                                                            label="Société*"
                                                            disabled
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.raisonSociale}
                                                            touched={touched.raisonSociale}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="dateEmbauche"
                                                            label="Date Embauche*"
                                                            component={ComposantDate}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.dateEmbauche}
                                                            touched={touched.dateEmbauche}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    {/*<MDBCol md="3" className="mb-3">*/}
                                                    {/*    <Field*/}
                                                    {/*        name="dateSortie"*/}
                                                    {/*        label="Date Sortie"*/}
                                                    {/*        component={ComposantDate}*/}
                                                    {/*    />*/}
                                                    {/*    <ErrorMessForm*/}
                                                    {/*        error={errors.dateSortie}*/}
                                                    {/*        touched={touched.dateSortie}*/}
                                                    {/*        right*/}
                                                    {/*    />*/}
                                                    {/*</MDBCol>*/}
                                                </MDBRow>

                                                <MDBRow around between>
                                                    {/* ligne3 */}
                                                    {/*<MDBCol md="6" className="mb-3">*/}
                                                    {/*    <div>*/}
                                                    {/*        <br/>*/}
                                                    {/*        <ErrorMessForm*/}
                                                    {/*            error={errors.codeRefContrat}*/}
                                                    {/*            touched={touched.codeRefContrat}*/}
                                                    {/*            right*/}
                                                    {/*        />*/}
                                                    {/*        <select*/}
                                                    {/*            className="browser-default custom-select"*/}
                                                    {/*            name="codeRefContrat"*/}
                                                    {/*            value={values.codeRefContrat}*/}
                                                    {/*            onChange={handleChange}*/}
                                                    {/*            onBlur={handleBlur}*/}
                                                    {/*        >*/}
                                                    {/*            <option value="" disabled selected>*/}
                                                    {/*                Type Contrat**/}
                                                    {/*            </option>*/}
                                                    {/*            {this.state.listeTypeContrat.map(*/}
                                                    {/*                (typeContrat) => (*/}
                                                    {/*                    <option value={typeContrat.codeRef}>*/}
                                                    {/*                        {typeContrat.intitule}*/}
                                                    {/*                    </option>*/}
                                                    {/*                )*/}
                                                    {/*            )}*/}
                                                    {/*        </select>*/}
                                                    {/*    </div>*/}
                                                    {/*</MDBCol>*/}
                                                    <MDBCol md="4" className="mb-3">
                                                        <div>
                                                            <br/>
                                                            <ErrorMessForm
                                                                error={errors.categorie}
                                                                touched={touched.categorie}
                                                                right
                                                            />
                                                            <select
                                                                className="browser-default custom-select"
                                                                name="categorie"
                                                                value={values.categorie}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            >
                                                                <option value="" disabled selected>
                                                                    Catégorie*
                                                                </option>
                                                                <option value="EMP">Employé</option>
                                                                <option value="AM">Agent de Maitrise</option>
                                                                <option value="AC">Assimilé Cadre</option>
                                                                <option value="C">Cadre</option>
                                                                <option value="STG">Stagiaire</option>
                                                            </select>
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow around between>
                                                    {/* ligne3 */}
                                                    <MDBCol md="4" className="mb-3">
                                                        <Field
                                                            name="poste"
                                                            label="Poste*"
                                                            component={ComposantInput}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.poste}
                                                            touched={touched.poste}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="periodeEssai"
                                                            label="Essai (Nb jours)*"
                                                            component={ComposantNumber}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.periodeEssai}
                                                            touched={touched.periodeEssai}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    {/*<MDBCol md="3" className="mb-3">*/}
                                                    {/*    <div>*/}
                                                    {/*        <br/>*/}
                                                    {/*        <ErrorMessForm*/}
                                                    {/*            error={errors.libelle}*/}
                                                    {/*            touched={touched.libelle}*/}
                                                    {/*            right*/}
                                                    {/*        />*/}
                                                    {/*        <select*/}
                                                    {/*            className="browser-default custom-select"*/}
                                                    {/*            name="codeRefStatut"*/}
                                                    {/*            value={values.libelle}*/}
                                                    {/*            onChange={handleChange}*/}
                                                    {/*            onBlur={handleBlur}*/}
                                                    {/*        >*/}
                                                    {/*            <option value="" disabled selected>*/}
                                                    {/*                Statut Employé**/}
                                                    {/*            </option>*/}
                                                    {/*            {this.state.listeStatutEmploye.map((statut) => (*/}
                                                    {/*                <option value={statut.codeRef}>*/}
                                                    {/*                    {statut.libelle}*/}
                                                    {/*                </option>*/}
                                                    {/*            ))}*/}
                                                    {/*        </select>*/}
                                                    {/*    </div>*/}
                                                    {/*</MDBCol>*/}
                                                </MDBRow>
                                                <MDBRow around between>
                                                    {/* ligne4 */}

                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="salaireHoraire"
                                                            label="Salaire Horaire*"
                                                            component={ComposantNumberDecimal}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.salaireHoraire}
                                                            touched={touched.salaireHoraire}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="salaireBrutMensuel"
                                                            label="Salaire Mensuel*"
                                                            component={ComposantNumberDecimal}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.salaireBrutMensuel}
                                                            touched={touched.salaireBrutMensuel}
                                                            right
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" className="mb-3">
                                                        <Field
                                                            name="nbHeureMensuelle"
                                                            label="Heures Mensuelles*"
                                                            component={ComposantNumberDecimal}
                                                        />
                                                        <ErrorMessForm
                                                            error={errors.nbHeureMensuelle}
                                                            touched={touched.nbHeureMensuelle}
                                                            right
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

export default CreateEmploye;
