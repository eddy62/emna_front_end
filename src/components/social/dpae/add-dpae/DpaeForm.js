import React from "react";
import "../CreateDpae.scss";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBInput, MDBRow} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import RegexService from "../../../../shared/services/RegexService";
import {Link} from "react-router-dom";

const ComponentDate = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        outline
        type="date"
        min={props.mindate}
        max={props.maxdate}
        disabled={props.disabled}
        {...field}
    />

);

const ComponentNumber = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        min="0"
        outline
        type="number"
        {...props}
        {...field}
    />
);

const ComponentSelect = ({field, ...props}) => (
    <div>
        <select className="form-control browser-default custom-select"
                style={{marginTop: "7.5%"}}
                name={props.name}
                value={props.label}
                {...props}
                {...field}
        >
            <option
                style={{color: "#757575"}}
                value=""
                disabled={false}
            >{props.label}</option>
            {props.options.map((object) => (
                <option key={object.key} value={object.value}>{object.intitule}</option>))}
        </select>
    </div>
);

const ComponentText = ({field, ...props}) => (
    <MDBInput
        outline
        type="text"
        {...props}
        {...field}
    />
);

const ComponentTextArea = ({field, ...props}) => (
    <MDBInput
        outline
        type="textarea"
        label={props.label}
        rows="3"
        {...props}
        {...field}
    />
);

const ComponentTime = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        outline
        type="time"
        {...field}
    />
);

const ComponentError = (props) => (
    <div className="text-danger">{props.children}</div>
);

const listOptionsSex = [
    {key: 1, value: 1, intitule: "Masculin"},
    {key: 2, value: 2, intitule: "Féminin"}
];

const listOptionNature = [
    {
        key: 1,
        value: "CDD",
        intitule: "Contrat à durée déterminée"
    },
    {
        key: 2,
        value: "CDI",
        intitule: "Contrat à durée indéterminée"
    },
    {
        key: 3,
        value: "CTT",
        intitule: "Contrat de travail temporaire"
    },
];

// contrôle saisie apeCode en dehors de yup car dynamique
const validateApeCode = value => {
    let errorMessage;
    if (value !== "7820Z") errorMessage = "Le Code APE ne correspond pas à une agence de travail temporaire";
    return errorMessage;
};

// contrôle saisie healthService en dehors de yup car dynamique
const validateHealthService = value => {
    let errorMessage;
    if (value === "") errorMessage = "Service de santé au travail obligatoire";
    return errorMessage;
};

// contrôle saisie endContractDate en dehors de yup car dynamique
const validateEndContractDate = value => {
    let errorMessage;
    if (value === "") errorMessage = "Date de fin de contrat obligatoire";
    return errorMessage;
};

const dpaeSchema = (props) => {
    return Yup.object().shape({
        //employeur
        siret: Yup.string()
            .required("SIRET obligatoire")
            .matches(RegexService.onlyNumbers(), "Chiffres uniquement")
            .matches(RegexService.startWithSpecificCharacter("12"), "Commence obligatoirement par 1 ou 2")
            .length(14, "Se compose obligatoirement de 14 chiffres"),
        urssafCode: Yup.string()
            .required("Code Urssaf obligatoire")
            .matches(RegexService.onlyNumbers(), "Chiffres uniquement")
            .length(3, "Se compose obligatoirement de 3 chiffres"),
        apeCode: Yup.string()
            .required("Code APE obligatoire")
            .matches(RegexService.onlyNumbersAndUnaccentedLetters(), "Caractère spécial ou accentué non autorisé")
            .min(4, "Se compose obligatoirement de 4 ou 5 caractères")
            .max(5, "Se compose obligatoirement de 4 ou 5 caractères"),
        designation: Yup.string()
            .required("Désignation obligatoire")
            .matches(/^[a-zA-Z0-9 éèêëâàäöôûüùîïç°²!#$%&'()*+,-./:;<=>?@]*$/, "Caractère spécial non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        streetDesignation: Yup.string()
            .required("Adresse obligatoire")
            .matches(/^[a-zA-Z0-9 éèêëâàäöôûüùîïç°²!#$%&'()*+,-./:;<=>?@]*$/, "Caractère spécial non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        postalCode: Yup.string()
            .required("Code postal obligatoire")
            .matches(/^[0-9]*$/, "Chiffres uniquement")
            .length(5, "Se compose obligatoirement de 5 chiffres")
            .matches(RegexService.doesNotStartWith("00000"), "N'existe pas"),
        town: Yup.string()
            .required("Ville obligatoire")
            .matches(/^[a-zA-Z0-9 éèêëâàäöôûüùîïç°²!#$%&'()*+,-./:;<=>?@]*$/, "Caractère spécial non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        phoneNumber: Yup.string()
            .matches(/^[0-9]*$/, "Chiffres uniquement")
            .matches(/^[0]/, "Commence obligatoirement par 0")
            .length(10, "Se compose obligatoirement de 10 chiffres"),

        // salarie
        surname: Yup.string()
            .required("Nom obligatoire")
            .matches(RegexService.matchUrssafControlForEmployeeName(), "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        customaryName: Yup.string()
            .matches(RegexService.matchUrssafControlForEmployeeName(), "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        christianName: Yup.string()
            .required("Prénom obligatoire")
            .matches(RegexService.matchUrssafControlForEmployeeName(), "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        sex: Yup.string()
            .required("Sexe obligatoire"),
        nir: Yup.string()
            .required("N° de Sécurité Sociale obligatoire")
            .matches(RegexService.onlyNumbers(), "Chiffres uniquement")
            .matches(/(^(.{13}|.{15})$)/, "Se compose obligatoirement de 13 ou 15 chiffres"),
        // TODO calcul à faire
        nirKey: Yup.string(),
        birthDate: Yup.date()
            .required("Date de naissance obligatoire")
            .max(new Date(), "Doit être inférieure à la date du jour"),
        departmentBirth: Yup.string()
            .required("Département de naissance obligatoire")
            .matches(/(^[0-9]*$|2a|2A|2b|2B)/, "Chiffres uniquement (exceptés 2A et 2B)")
            .min(2, "Se compose obligatoirement de 2 ou 3 caractères")
            .max(3, "Se compose obligatoirement de 2 ou 3 caractères"),
        birthTown: Yup.string()
            .required("Commune de naissance obligatoire")
            .matches(RegexService.matchUrssafControlForEmployeeAddress(), "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        countryBirth: Yup.string()
            .required("Pays de naissance obligatoire")
            .matches(RegexService.matchUrssafControlForEmployeeAddress(), "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),

        // contrat
        nature: Yup.string()
            .required("Nature du contrat obligatoire"),
        healthService: Yup.string()
            .matches(RegexService.onlyNumbers(), "Chiffres uniquement")
            .length(3, "Se compose obligatoirement de 3 chiffres"),
        startContractDate: Yup.date()
            .required("Date de début de contrat obligatoire")
            .min(props.oneYearBeforeNow, "Doit être inférieure au maximum d'un an à la date du jour")
            .max(props.oneYearFromNow, "Doit être supérieure au maximum d'un an à la date du jour"),
        startContractTime: Yup.string()
            .required("Heure de début de contrat obligatoire"),
        endContractDate: Yup.date()
            .min(Yup.ref("startContractDate"), "Doit être supérieure ou égale à la date de début"),
        trialTime: Yup.number()
            .min(0, "Doit être positive ou nulle")
            .max(999, "Doit être inférieure à la durée maximale légale"),
        comment: Yup.string()
    })
};

class DpaeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            society: this.props.society,
            employee: this.props.employee,
            disabled: false,
            oneYearBeforeNow: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            oneYearFromNow: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.employee !== this.props.employee) {
            this.setState({employee: this.props.employee})
        }
    }

    componentDidMount() {
        console.log(this.state.society);
        console.log(this.state.employee);
    }

    //TODO submit
    submit = (values, actions) => {
        // formatage urssaf
        values.apeCode = values.apeCode.toUpperCase();
        values.designation = values.designation.trim();
        values.streetDesignation = values.streetDesignation.trim();
        values.town = values.town.trim();
        values.surname = this.formatName(values.surname.trim().toUpperCase());
        values.customaryName = this.formatName(values.customaryName.trim().toUpperCase());
        values.christianName = this.formatName(values.christianName.trim().toUpperCase());
        values.departmentBirth = values.departmentBirth.toUpperCase();
        values.birthTown = this.formatName(values.birthTown.trim().toUpperCase());
        values.countryBirth = this.formatName(values.countryBirth.trim().toUpperCase());
        if (values.nir.length === 15) this.splitNir(values);
        values.startContractTime += ":00";
        values.comment = values.comment.trim();

        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
        actions.setSubmitting(false);
    }

    formatName(value) {
        return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    splitNir(values) {
        values.nirKey = values.nir.substring(13, 15);
        values.nir = values.nir.substring(0, 13);
    }

    render() {
        return (
            <Formik initialValues={{
                // test (1) ou prod (120)
                indicator: 1,

                // employeur
                designation: this.state.society.raisonSociale,
                siret: this.state.society.siret,
                apeCode: this.state.society.domaineDactivite,
                urssafCode: this.state.society.codeUrssaf,
                streetDesignation: this.state.society.numeroRue + " " + this.state.society.nomRue,
                town: this.state.society.ville,
                postalCode: this.state.society.codePostal,
                phoneNumber: this.state.society.telephone,

                // salarie
                surname: this.state.employee.nomNaissance,
                customaryName: this.state.employee.nomUsage,
                christianName: this.state.employee.prenom,
                sex: this.state.employee.civilite === "M" ? 1 : 2,
                nir: this.state.employee.numeroSecuriteSociale,
                nirKey: "",
                birthDate: this.state.employee.dateNaissance,
                birthTown: this.state.employee.villeNaissance,
                departmentBirth: this.state.employee.departementNaissance,
                countryBirth: this.state.employee.paysNaissance,

                // contrat
                // TODO récupérer bonne variable ?
                startContractDate: this.state.employee.dateEmbauche,
                startContractTime: "",
                // TODO récupérer bonne variable ?
                endContractDate: "",
                trialTime: this.state.employee.periodeEssai,
                nature: this.state.employee.codeRefContrat,
                healthService: this.state.society.serviceSanteTravail,
                comment: ""

                // // employeur
                // designation: "",
                // siret: "",
                // apeCode: "",
                // urssafCode: "",
                // streetDesignation: "",
                // town: "",
                // postalCode: "",
                // phoneNumber: "",
                //
                // // salarie
                // surname: "",
                // customaryName: "",
                // christianName: "",
                // sex: "",
                // nir: "",
                // nirKey: "",
                // birthDate: "",
                // birthTown: "",
                // departmentBirth: "",
                // countryBirth: "",
                //
                // // contrat
                // startContractDate: "",
                // startContractTime: "",
                // endContractDate: "",
                // trialTime: "",
                // nature: "",
                // healthService: "",
                // comment: ""
            }}
                    onSubmit={this.submit}
                    validationSchema={dpaeSchema(this.state)}
            >
                {({
                      dirty,
                      handleReset,
                      handleSubmit,
                      isSubmitting,
                      values
                  }) => (
                    <Form onSubmit={handleSubmit}
                          className="w-100"
                    >
                        {/*employeur*/}
                        <MDBCardBody>
                            <MDBCardTitle className="text" tag="h5">Employeur</MDBCardTitle>
                            <MDBCard className="cadre">
                                <MDBCardBody>
                                    {/*ligne 1 employeur*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="siret"
                                                value={values.siret}
                                                label="SIRET*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="siret" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="urssafCode"
                                                value={values.urssafCode}
                                                label="Code Urssaf*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="urssafCode" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="apeCode"
                                                value={values.apeCode}
                                                validate={values.nature === "CTT" ? validateApeCode : null}
                                                label="Code APE*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="apeCode" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 2 employeur*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="designation"
                                                value={values.designation}
                                                label="Désignation*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="designation" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 3 employeur*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="streetDesignation"
                                                value={values.streetDesignation}
                                                label="Adresse*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="streetDesignation" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 4 employeur*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="postalCode"
                                                value={values.postalCode}
                                                label="Code Postal*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="postalCode" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="town"
                                                value={values.town}
                                                label="Ville*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="town" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                label="Téléphone"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="phoneNumber" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCardBody>
                        {/*salarie*/}
                        {/*<pre>{JSON.stringify(values, null, 4)}</pre>*/}
                        <MDBCardBody>
                            <MDBCardTitle className="text" tag="h5">Salarié</MDBCardTitle>
                            <MDBCard className="cadre">
                                <MDBCardBody>
                                    {/*ligne 1 salarie*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="surname"
                                                value={values.surname}
                                                label="Nom*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="surname" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="customaryName"
                                                value={values.customaryName}
                                                label="Nom d'Usage"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="customaryName" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 2 salarie*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="christianName"
                                                value={values.christianName}
                                                label="Prénom*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="christianName" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="sex"
                                                value={values.sex}
                                                label="Sexe*"
                                                disabled={this.state.disabled}
                                                options={listOptionsSex}
                                                component={ComponentSelect}
                                            />
                                            <ErrorMessage name="sex" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 3 salarie*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="nir"
                                                value={values.nir}
                                                label="N° de Sécurité Sociale"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="nir" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="birthDate"
                                                value={values.birthDate}
                                                label="Date de Naissance*"
                                                disabled={this.state.disabled}
                                                component={ComponentDate}
                                            />
                                            <ErrorMessage name="birthDate" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 4 salarie*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="departmentBirth"
                                                value={values.departmentBirth}
                                                label="Département de Naissance*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="departmentBirth" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="birthTown"
                                                value={values.birthTown}
                                                label="Commune de Naissance*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="birthTown" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="countryBirth"
                                                value={values.countryBirth}
                                                label="Pays de Naissance*"
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="countryBirth" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCardBody>
                        {/*contrat*/}
                        {/*<pre>{JSON.stringify(values, null, 4)}</pre>*/}
                        <MDBCardBody>
                            <MDBCardTitle className="text" tag="h5">Contrat</MDBCardTitle>
                            <MDBCard className="cadre">
                                <MDBCardBody>
                                    {/*ligne 1 contrat*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="nature"
                                                value={values.nature}
                                                label="Nature du Contrat*"
                                                disabled={this.state.disabled}
                                                options={listOptionNature}
                                                component={ComponentSelect}
                                            />
                                            <ErrorMessage name="nature" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="healthService"
                                                value={values.healthService}
                                                validate={values.nature !== "CTT" ? validateHealthService : null}
                                                label={values.nature !== "CTT" ? "Service de Santé au Travail*" : "Service de Santé au Travail"}
                                                disabled={this.state.disabled}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="healthService" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 2 contrat*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="startContractDate"
                                                value={values.startContractDate}
                                                label="Date de Début de Contrat*"
                                                disabled={this.state.disabled}
                                                mindate={this.state.oneYearBeforeNow}
                                                maxdate={this.state.oneYearFromNow}
                                                component={ComponentDate}
                                            />
                                            <ErrorMessage name="startContractDate" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                getvalue={(value) => {
                                                    values.startContractTime = value
                                                }}
                                                name="startContractTime"
                                                label="Heure de Début de Contrat*"
                                                value={values.startContractTime}
                                                component={ComponentTime}
                                            />
                                            <ErrorMessage name="startContractTime" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 3 contrat*/}
                                    <MDBRow around between>
                                        {values.nature === "CDD" ? (<MDBCol className="mb-3">
                                            <Field
                                                name="endContractDate"
                                                value={values.endContractDate}
                                                label="Date de Fin de Contrat*"
                                                disabled={this.state.disabled}
                                                validate={validateEndContractDate}
                                                component={ComponentDate}
                                            />
                                            <ErrorMessage name="endContractDate" component={ComponentError}/>
                                        </MDBCol>) : null}
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="trialTime"
                                                value={values.trialTime}
                                                label="Période d'Essai (en Jours)"
                                                disabled={this.state.disabled}
                                                component={ComponentNumber}
                                            />
                                            <ErrorMessage name="trialTime" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/*ligne 4 contrat*/}
                                    <MDBRow around between>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="comment"
                                                value={values.comment}
                                                label="Commentaire"
                                                component={ComponentTextArea}
                                            />
                                            <ErrorMessage name="comment" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCardBody>
                        <MDBRow around between>* : champs obligatoires</MDBRow>
                        <MDBRow around between>
                            {UserService.isSociety() ? (
                                <MDBBtn
                                    color="teal accent-3"
                                    rounded
                                    size="sm"
                                    type="submit"
                                >
                                    Soumettre
                                </MDBBtn>
                            ) : null}
                            <MDBBtn
                                color="teal accent-3"
                                rounded
                                size="sm"
                                type="reset"
                                onClick={handleReset}
                                disabled={!dirty || isSubmitting}
                            >
                                Réinitialiser
                            </MDBBtn>
                            <Link to={"/socialHome/" + this.state.society.id}>
                                <MDBBtn
                                    color="teal accent-3"
                                    rounded
                                    size="sm"
                                    // onClick={() => {
                                    //     // this.props.history.push(
                                    //     //     "/socialHome/" + this.state.society.id
                                    //     // );
                                    // }}
                                >
                                    Annuler
                                </MDBBtn>
                            </Link>
                        </MDBRow>
                    </Form>
                )}
            </Formik>
        );
    }

}

export default DpaeForm;