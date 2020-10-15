import React from "react";
import "../DeclarationOfEmployment.scss";
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
    MDBTimePicker
} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import RegexService from "../../../../shared/services/RegexService";

const ComponentDate = ({field, ...props}) => (
    <div>
        <MDBInput
            label={props.label}
            outline
            type="date"
            min={props.mindate}
            max={props.maxdate}
            {...field}
        />
    </div>

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
        {/*<label style={{fontSize: "0.8rem", color: "#757575", marginLeft: "-70%"}}> {props.label} </label>*/}
        <select className="form-control browser-default custom-select"
                name={props.name}  {...props} {...field}
        >
            <option value="" disabled={true} selected={true}>{props.label}</option>
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
    <MDBTimePicker
        outline
        hoursFormat={24}
        hours={0}
        minutes={0}
        cancelable={true}
        cancelText="Réinitialiser"
        clearable={true}
        clearText="Test"
        doneText="Sélectionner"
        label={props.label}
        getValue={props.getvalue}
    />
);

const ComponentError = (props) => (
    <div className="text-danger">{props.children}</div>
);

const doeSchema = (props) => {
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
        // TODO fonction uppercase
        apeCode: Yup.string()
            .required("Code APE obligatoire")
            .matches(/^[0-9A-Z]*$/, "Caractère spécial ou accentué non autorisé")
            .min(4, "Se compose obligatoirement de 4 ou 5 caractères")
            .max(5, "Se compose obligatoirement de 4 ou 5 caractères"),
        // TODO fonction trim
        designation: Yup.string()
            .required("Désignation obligatoire")
            .matches(/^[a-zA-Z0-9 éèêëâàäöôûüùîïç°²!#$%&'()*+,-./:;<=>?@]*$/, "Caractère spécial non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        // TODO fonction trim
        streetDesignation: Yup.string()
            .required("Adresse obligatoire")
            .matches(/^[a-zA-Z0-9 éèêëâàäöôûüùîïç°²!#$%&'()*+,-./:;<=>?@]*$/, "Caractère spécial non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        postalCode: Yup.string()
            .required("Code postal obligatoire")
            .matches(/^[0-9]*$/, "Chiffres uniquement")
            .length(5, "Se compose obligatoirement de 5 chiffres")
            .matches(RegexService.doesNotStartWith("00000"), "N'existe pas"),
        // TODO fonction trim
        town: Yup.string()
            .required("Ville obligatoire")
            .matches(/^[a-zA-Z0-9 éèêëâàäöôûüùîïç°²!#$%&'()*+,-./:;<=>?@]*$/, "Caractère spécial non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        phoneNumber: Yup.string()
            .matches(/^[0-9]*$/, "Chiffres uniquement")
            .matches(/^[0]/, "Commence obligatoirement par 0")
            .length(10, "Se compose obligatoirement de 10 chiffres"),
        // salarie
        // TODO fonction sup accent + trim + uppercase
        surname: Yup.string()
            .required("Nom obligatoire")
            .matches(/^[A-Z' .&-]*$/, "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        // TODO fonction sup accent + trim + uppercase
        customaryName: Yup.string()
            .matches(/^[A-Z' .&-]*$/, "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        // TODO fonction sup accent + trim + uppercase
        christianName: Yup.string()
            .required("Prénom obligatoire")
            .matches(/^[A-Z' .&-]*$/, "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        sex: Yup.string()
            .required("Sexe obligatoire"),
        // TODO pb avec param fonction RegexService
        // TODO pb avec test qui sup required de tous les champs
        nir: Yup.string()
            .required("N° de Sécurité Sociale obligatoire")
            .matches(RegexService.onlyNumbers(), "Chiffres uniquement")
            // .matches(RegexService.startWithSpecificCharacter("12"), "Commence obligatoirement par 1 ou 2")
            // .matches(RegexService.startWithSpecificCharacter(Yup.ref("sex")), "Ne correspond pas au sexe renseigné")
        .test("length", "Se compose obligatoirement de 13 ou 15 chiffres", (value) => (value.length === 13 || value.length === 15))
        ,
        // TODO calcul à faire
        nirKey: Yup.string(),
        birthDate: Yup.date()
            .required("Date de naissance obligatoire")
            .max(new Date(), "Doit être inférieure à la date du jour"),
        // TODO fonction uppercase
        departmentBirth: Yup.string()
            .required("Département de naissance obligatoire")
            .matches(/(^[0-9]*$|2A|2B)/, "Chiffres uniquement (exceptés 2A et 2B)")
            .min(2, "Se compose obligatoirement de 2 ou 3 caractères")
            .max(3, "Se compose obligatoirement de 2 ou 3 caractères"),
        // TODO fonction trim + uppercase
        birthTown: Yup.string()
            .required("Commune de naissance obligatoire")
            .matches(/^[A-Z0-9 .'-]*$/, "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        // TODO fonction trim + uppercase
        countryBirth: Yup.string()
            .required("Pays de naissance obligatoire")
            .matches(/^[A-Z0-9 .'-]*$/, "Caractère spécial ou accentué non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        // contrat
        nature: Yup.string()
            .required("Nature du contrat obligatoire"),
        // TODO fonction uppercase (selon doc)
        healthService: Yup.string()
            // .required("Service de santé au travail obligatoire pour un CDD ou un CDI")
            .matches(RegexService.onlyNumbers(), "Chiffres uniquement")
            // .matches(RegexService.onlyNumbersAndUppercaseUnaccentedLetters(), "Chiffres et lettres uniquement")
            // .matches(RegexService.startWithSpecificString("MT"), "Commence obligatoirement par MT")
            .length(3, "Se compose obligatoirement de 3 chiffres"),
        startContractDate: Yup.date()
            .required("Date de début de contrat obligatoire")
            .min(props.oneYearBeforeNow, "Doit être inférieure au maximum d'un an à la date du jour")
            .max(props.oneYearFromNow, "Doit être supérieure au maximum d'un an à la date du jour"),
        // TODO required
        startContractTime: Yup.string()
        .required("Heure de début de contrat obligatoire")
        ,
        // TODO required si CDD
        endContractDate: Yup.date()
            .min(Yup.ref("startContractDate"),
                "Doit être supérieure ou égale à la date de début"),
        trialTime: Yup.number()
            .min(0, "Doit être positive ou nulle")
            .max(999, "Doit être inférieure à la durée maximale légale"),
        // TODO fonction trim
        comment: Yup.string()
        // test controle dynamique
        // comment: Yup.ref("nature") !== "CTT" ? Yup.string().required("required") : Yup.string().notRequired()

    })
};

class CreateDeclarationOfEmployment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            society: {},
            oneYearBeforeNow: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            oneYearFromNow: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        }
    }

    componentDidMount() {
        /*set society*/
        AxiosCenter.getSocietyById(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    society: response.data,
                    loaded: true
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //TODO submit
    submit = (values) => {
        alert(JSON.stringify(values, null, 2));
    }

    formatName(value) {
        return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    handleChange = (values) => {
        console.log(values)
    }

    render() {
        const title = "Gestion Social";
        const title1 = "Soumettre une Déclaration Préalable d'Embauche";
        const companyName = this.state.society.raisonSociale;

        if (!this.state.loaded) return <Loading/>;
        else return (
            <div className="App">
                <div className="dpae">
                    <MDBContainer>
                        <MDBCardHeader color="default-color">
                            <MDBCardTitle tag="h1">
                                {title}
                            </MDBCardTitle>
                            <MDBCardTitle tag="h3">
                                {companyName}
                            </MDBCardTitle>
                        </MDBCardHeader>
                        <hr/>
                        <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
                            {title1}
                        </MDBCardHeader>
                        <hr/>
                        {/*formulaire*/}
                        <Formik initialValues={{
                            // test (1) ou prod (120)
                            indicator: 1,

                            // employeur
                            designation: "",
                            siret: "",
                            apeCode: "",
                            urssafCode: "",
                            streetDesignation: "",
                            town: "",
                            postalCode: "",
                            phoneNumber: "",

                            // salarie
                            surname: "",
                            customaryName: "",
                            christianName: "",
                            sex: "",
                            nir: "",
                            nirKey: "",
                            birthDate: "",
                            birthTown: "",
                            departmentBirth: "",
                            countryBirth: "",

                            // contrat
                            startContractDate: "",
                            startContractTime: "",
                            endContractDate: "",
                            trialTime: "",
                            nature: "",
                            healthService: "",
                            comment: ""
                        }}
                                onSubmit={this.submit}
                                validationSchema={doeSchema(this.state)}
                        >
                            {({
                                  dirty,
                                  handleChange,
                                  handleBlur,
                                  handleReset,
                                  handleSubmit,
                                  setFieldValue,
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
                                                            label="SIRET*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="siret" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="urssafCode"
                                                            label="Code Urssaf*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="urssafCode" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="apeCode"
                                                            label="Code APE*"
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
                                                            label="Désignation*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="designation" component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                                {/*ligne 3 employeur*/}
                                                <MDBRow around between>
                                                    {/*<MDBCol className="mb-3">
                                                        <Field
                                                            name="raisonSociale1"
                                                            label="Raison Sociale*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="raisonSociale1" component={ComponentError}/>
                                                    </MDBCol>*/}
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="streetDesignation"
                                                            label="Adresse*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="streetDesignation"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                                {/*ligne 4 employeur*/}
                                                <MDBRow around between>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="postalCode"
                                                            label="Code Postal*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="postalCode" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="town"
                                                            label="Ville*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="town" component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                                {/*ligne 5 employeur*/}
                                                {/*<MDBRow around between>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="raisonSociale2"
                                                            label="Raison Sociale 2"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="raisonSociale2" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="adresseEtablissement2"
                                                            label="Adresse 2"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="adresseEtablissement2"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>*/}
                                                {/*ligne 5 employeur*/}
                                                <MDBRow around between>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="phoneNumber"
                                                            label="Téléphone"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="phoneNumber" component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCardBody>
                                    {/*salarie*/}
                                    <pre>{JSON.stringify(values, null, 4)}</pre>
                                    <MDBCardBody>
                                        <MDBCardTitle className="text" tag="h5">Salarié</MDBCardTitle>
                                        <MDBCard className="cadre">
                                            <MDBCardBody>
                                                {/*ligne 1 salarie*/}
                                                <MDBRow around between>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="surname"
                                                            label="Nom*"
                                                            onChange={(e) => {
                                                                handleChange(e)
                                                                setFieldValue("surname", this.formatName(values.surname))
                                                            }}
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="surname" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="customaryName"
                                                            label="Nom d'Usage"
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
                                                            label="Prénom*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="christianName" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        {/*<select*/}
                                                        {/*    className="browser-default custom-select"*/}
                                                        {/*    name="sex"*/}
                                                        {/*    onChange={handleChange}*/}
                                                        {/*    onBlur={handleBlur}*/}
                                                        {/*>*/}
                                                        {/*    <option value="" disabled={true} selected={true}>Sexe*</option>*/}
                                                        {/*    <option value="1">Masculin</option>*/}
                                                        {/*    <option value="2">Féminin</option>*/}
                                                        {/*</select>*/}
                                                        <Field
                                                            name="sex"
                                                            label="Sexe*"
                                                            options={[
                                                                {key: 1, value: 1, intitule: "Masculin"},
                                                                {key: 2, value: 2, intitule: "Féminin"},
                                                            ]}
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
                                                            label="N° de Sécurité Sociale"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="nir" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="birthDate"
                                                            label="Date de Naissance*"
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
                                                            label="Département de Naissance*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="departmentBirth"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="birthTown"
                                                            label="Commune de Naissance*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="birthTown" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="countryBirth"
                                                            label="Pays de Naissance*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="countryBirth" component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCardBody>
                                    {/*contrat*/}
                                    <pre>{JSON.stringify(values, null, 4)}</pre>
                                    <MDBCardBody>
                                        <MDBCardTitle className="text" tag="h5">Contrat</MDBCardTitle>
                                        <MDBCard className="cadre">
                                            <MDBCardBody>
                                                {/*ligne 1 contrat*/}
                                                <MDBRow around between>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="nature"
                                                            label="Nature du Contrat*"
                                                            options={[
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
                                                            ]}
                                                            component={ComponentSelect}
                                                        />
                                                        <ErrorMessage name="nature" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="healthService"
                                                            required={values.nature !== "CTT" ? true : false}
                                                            label={values.nature !== "CTT" ? "Service de Santé au Travail*" : "Service de Santé au Travail"}
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="healthService"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                                {/*ligne 2 contrat*/}
                                                <MDBRow around between>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="startContractDate"
                                                            label="Date de Début de Contrat*"
                                                            mindate={this.state.oneYearBeforeNow}
                                                            maxdate={this.state.oneYearFromNow}
                                                            component={ComponentDate}
                                                        />
                                                        <ErrorMessage name="startContractDate"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        {/*<Field*/}
                                                        {/*    getvalue={(value) => {values.startContractTime = value}}*/}
                                                        {/*    name="startContractTime"*/}
                                                        {/*    label="Heure de Début de Contrat*"*/}
                                                        {/*    */}
                                                        {/*    component={ComponentTime}*/}
                                                        {/*/>*/}
                                                        <MDBTimePicker
                                                            outline
                                                            hoursFormat={24}
                                                            hours={0}
                                                            minutes={0}
                                                            cancelable={true}
                                                            cancelText="Réinitialiser"
                                                            clearable={true}
                                                            clearText="Test"
                                                            doneText="Sélectionner"
                                                            name="startContractTime"
                                                            label="Heure de Début de Contrat*"
                                                            // value={values.startContractTime}
                                                            // getValue={(value) => {console.log(value)
                                                            getValue={this.handleChange}
                                                        />
                                                        <ErrorMessage name="startContractTime"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                                {/*ligne 3 contrat*/}
                                                <MDBRow around between>
                                                    {values.nature === "CDD" ? (<MDBCol className="mb-3">
                                                        <Field
                                                            name="endContractDate"
                                                            label="Date de Fin de Contrat*"
                                                            component={ComponentDate}
                                                        />
                                                        <ErrorMessage name="endContractDate"
                                                                      component={ComponentError}/>
                                                    </MDBCol>) : null}
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="trialTime"
                                                            label="Période d'Essai (en Jours)"
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
                                                disabled={true}
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
                                                    "/socialHome/" + this.state.society.id
                                                );
                                            }}
                                        >
                                            Annuler
                                        </MDBBtn>
                                    </MDBRow>
                                </Form>
                            )}
                        </Formik>
                    </MDBContainer>
                </div>
            </div>
        );
    }

}

export default CreateDeclarationOfEmployment;