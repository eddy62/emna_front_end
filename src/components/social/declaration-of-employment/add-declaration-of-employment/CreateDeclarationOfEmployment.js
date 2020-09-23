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
    MDBRow
} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const doeSchema = (props) => {
    return Yup.object().shape({
        siret: Yup.string()
            .required("SIRET obligatoire")
            .matches(/^[0-9]*$/, "Chiffres uniquement")
            .matches(/^[12]/, "Commence obligatoirement par 1 ou 2")
            .length(14, "Se compose obligatoirement de 14 chiffres"),
        urssafCode: Yup.string()
            .required("Code Urssaf obligatoire")
            .matches(/^[0-9]*$/, "Chiffres uniquement")
            .length(3, "Se compose obligatoirement de 3 chiffres"),
        apeCode: Yup.string()
            .required("Code APE obligatoire")
            .trim()
            .uppercase()
            .matches(/^[0-9A-Z]*$/, "Caractères spéciaux ou accentués non autorisés")
            .min(4, "Se compose obligatoirement de 4 ou 5 caractères")
            .max(5, "Se compose obligatoirement de 4 ou 5 caractères"),
        streetDesignation: Yup.string()
            .required("Adresse obligatoire")
            .trim()
            .matches(/^[a-zA-Z0-9éèêëâàäöôûüùîïç°²!#$%&'()*+,-./:;<=>?@]*$/, "Caractère spécial non autorisé")
            .max(32, "Se compose au maximum de 32 caractères"),
        postalCode: Yup.string()
            .required("Code postal obligatoire")
            .matches(/^[0-9]*$/, "Chiffres uniquement")
            .length(5, "Se compose obligatoirement de 5 chiffres")
            .test("matchesTest", "N'existe pas", value => !(value === "00000"))

    })
};

const ComponentDate = ({field, ...props}) => (
    <div>
        <MDBInput
            label={props.label}
            outline
            type="date"
            min={props.startdate}
            max={props.enddate}
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
        <label style={{fontSize: "0.8rem", color: "#757575", marginLeft: "-70%"}}> {props.label} </label>
        <select className="form-control browser-default custom-select"
                name={props.name}  {...props} {...field}
        >
            {props.list.map((object) => (
                <option key={object.id} value={object.id}>{object.intitule}</option>))}
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
        type="textarea"
        label={props.label}
        rows="5"
        {...props}
        {...field}
    />
);

const ComponentError = (props) => (
    <div className="text-danger">{props.children}</div>
);

class CreateDeclarationOfEmployment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            society: {}
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
    submit = () => {

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
                            siret: "", //  identifier
                            apeCode: "", // code
                            urssafCode: "", // code
                            streetDesignation: "", // text
                            town: "", //text
                            postalCode: "", // code
                            phoneNumber: "", // text

                            /*raisonSociale1: "",
                            raisonSociale2: "",
                            adresseEtablissement2: "",*/

                            // salarie
                            surname: "", // text
                            christianName: "", // text
                            sex: "", // code
                            nir: "", // identifier
                            nirKey: "", // text
                            birthDate: "", // date
                            birthTown: "", // text
                            departmentBirth: "", // code

                            // contrat
                            startContractDate: "", // date
                            startContractTime: "", // time
                            endContractDate: "", // date
                            nature: "", // code
                            healthService: "", // text

                            /*periodeEssai: 0*/
                        }}
                                onSubmit={this.submit}
                                validationSchema={doeSchema(this.state)}
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
                                    <pre>{JSON.stringify(values, null, 4)}</pre>
                                    {/*employeur*/}
                                    <MDBCardBody>
                                        <MDBCardTitle className="text" tag="h5">Employeur</MDBCardTitle>
                                        <MDBCard className="cadre">
                                            <MDBCardBody>
                                                {/*ligne 1 employeur*/}
                                                <MDBRow around between>
                                                    <MDBCol md="4" className="mb-3">
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
                                                {/*ligne 3 employeur*/}
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
                                                {/*ligne 4 employeur*/}
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
                                                            component={ComponentNumber}
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
                                                    <MDBCol md="4" className="mb-3">
                                                        <Field
                                                            name="surname"
                                                            label="Nom*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="surname" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="christianName"
                                                            label="Prénom*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="christianName" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="sex"
                                                            label="Sexe*"
                                                            component={ComponentText} // select
                                                        />
                                                        <ErrorMessage name="sex" component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                                {/*ligne 2 salarie*/}
                                                <MDBRow around between>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="nir"
                                                            label="N° de Sécurité Sociale"
                                                            component={ComponentNumber}
                                                        />
                                                        <ErrorMessage name="nir" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="nirKey"
                                                            label="NIR"
                                                            component={ComponentNumber}
                                                        />
                                                        <ErrorMessage name="nirKey" component={ComponentError}/>
                                                    </MDBCol>
                                                </MDBRow>
                                                {/*ligne 3 salarie*/}
                                                <MDBRow around between>
                                                    <MDBCol md="4" className="mb-3">
                                                        <Field
                                                            name="birthDate"
                                                            label="Date de Naissance*"
                                                            component={ComponentDate}
                                                        />
                                                        <ErrorMessage name="birthDate" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="birthTown"
                                                            label="Ville de Naissance*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="birthTown" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="departmentBirth"
                                                            label="Département de Naissance*"
                                                            component={ComponentNumber}
                                                        />
                                                        <ErrorMessage name="departmentBirth"
                                                                      component={ComponentError}/>
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
                                                            label="Nature du Contrat*"
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="nature" component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="healthService"
                                                            label="Service de Santé au Travail*"
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
                                                            component={ComponentDate}
                                                        />
                                                        <ErrorMessage name="startContractDate"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="startContractTime"
                                                            label="Heure de Début de Contrat*"
                                                            component={ComponentDate}
                                                        />
                                                        <ErrorMessage name="startContractTime"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                    <MDBCol className="mb-3">
                                                        <Field
                                                            name="endContractDate"
                                                            label="Date de Fin de Contrat*"
                                                            component={ComponentDate}
                                                        />
                                                        <ErrorMessage name="endContractDate"
                                                                      component={ComponentError}/>
                                                    </MDBCol>
                                                    {/*<MDBCol className="mb-3">
                                                        <Field
                                                            name="periodeEssai"
                                                            label="Période d'Essai*"
                                                            // select
                                                            component={ComponentText}
                                                        />
                                                        <ErrorMessage name="periodeEssai" component={ComponentError}/>
                                                    </MDBCol>*/}
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
                                                disabled={false}
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