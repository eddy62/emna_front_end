import React from "react";
import "../CreateDpae.scss";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBInput, MDBRow} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import RegexService from "../../../../shared/services/RegexService";

/**
 * DpaeForm
 *
 * @author Created by Cédric Belot
 */

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
            // max étrange mais correspondant à la demande urssaf
            .max(999, "Doit être inférieure à la durée maximale légale"),
        comment: Yup.string()
    })
};

class DpaeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneYearBeforeNow: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            oneYearFromNow: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        }
    }

    //TODO submit appel au back
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
                designation: this.props.dpae.raisonSociale,
                siret: this.props.dpae.siret,
                apeCode: this.props.dpae.domaineDactivite,
                urssafCode: this.props.dpae.codeUrssaf,
                streetDesignation: this.props.dpae.numeroRue + " " + this.props.dpae.nomRue,
                town: this.props.dpae.ville,
                postalCode: this.props.dpae.codePostal,
                phoneNumber: this.props.dpae.telephone,

                // salarie
                surname: this.props.dpae.nomNaissance,
                customaryName: this.props.dpae.nomUsage,
                christianName: this.props.dpae.prenom,
                sex: this.props.dpae.civilite === "M" ? 1 : 2,
                nir: this.props.dpae.numeroSecuriteSociale,
                nirKey: "",
                birthDate: this.props.dpae.dateNaissance,
                birthTown: this.props.dpae.villeNaissance,
                departmentBirth: this.props.dpae.departementNaissance,
                countryBirth: this.props.dpae.paysNaissance,

                // contrat
                startContractDate: this.props.dpae.dateDebut,
                startContractTime: "",
                // TODO récupérer bonne variable
                endContractDate: "",
                trialTime: this.props.dpae.periodeEssai,
                nature: this.props.dpae.codeRef,
                healthService: this.props.dpae.serviceSanteTravail,
                comment: ""

            }}
                    enableReinitialize
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
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="siret" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="urssafCode"
                                                value={values.urssafCode}
                                                label="Code Urssaf*"
                                                disabled={true}
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
                                                disabled={true}
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
                                                disabled={true}
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
                                                disabled={true}
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
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="postalCode" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="town"
                                                value={values.town}
                                                label="Ville*"
                                                disabled={true}
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
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="phoneNumber" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCardBody>
                        {/*salarie*/}
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
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="surname" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="customaryName"
                                                value={values.customaryName}
                                                label="Nom d'Usage"
                                                disabled={true}
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
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="christianName" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="sex"
                                                value={values.sex}
                                                label="Sexe*"
                                                disabled={true}
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
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="nir" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="birthDate"
                                                value={values.birthDate}
                                                label="Date de Naissance*"
                                                disabled={true}
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
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="departmentBirth" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="birthTown"
                                                value={values.birthTown}
                                                label="Commune de Naissance*"
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="birthTown" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol className="mb-3">
                                            <Field
                                                name="countryBirth"
                                                value={values.countryBirth}
                                                label="Pays de Naissance*"
                                                disabled={true}
                                                component={ComponentText}
                                            />
                                            <ErrorMessage name="countryBirth" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCardBody>
                        {/*contrat*/}
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
                                                disabled={true}
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
                                                disabled={true}
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
                                                disabled={true}
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
                                                disabled={false}
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
                                                disabled={true}
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
                                <MDBBtn
                                    color="teal accent-3"
                                    rounded
                                    size="sm"
                                    onClick={() => {
                                        this.props.history.push(
                                            "/socialHome/" + this.props.dpae.societyId
                                        );
                                    }}
                                >
                                    Annuler
                                </MDBBtn>
                        </MDBRow>
                    </Form>
                )}
            </Formik>
        );
    }

}

export default DpaeForm;