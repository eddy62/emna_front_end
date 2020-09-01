import React, { Component } from 'react';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import AxiosCenter from "../../../shared/services/AxiosCenter";
import { Link } from 'react-router-dom';
import {
    MDBBtn, MDBCardTitle,
    MDBCardHeader,
    MDBContainer,
    MDBInput,
} from "mdbreact";

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
    <div >
        <MDBInput label={props.label} type="text" {...props} className="form-control" {...field} />
    </div>
);
const ComposantTextarea = ({ field, form: { touched, errors }, ...props }) => (
    <div >
        <MDBInput type="textarea" label={props.label} rows="4"  {...props} className="form-control" {...field} />
    </div>
);
const ComposantSelect = ({ field, form: { touched, errors }, ...props }) => (
    <div >
        <label> {props.label} </label>
        <select className=" form-control browser-default custom-select" name="unite"  {...props} {...field} >
            {/* <option value="pc">PC</option> */}
            <option value="h">H</option>
            <option value="j">J</option>
            <option value="m">M</option>
            <option value="km">Km</option>
            <option value="M²">M²</option>
            <option value="kg">Kg</option>
        </select>
    </div>
);

class UpdateProduit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UpdateProduit: {},
            loaded: false,
            IdEntity: this.props.match.params.id,
        };
    }


    componentDidMount() {
        AxiosCenter.getProduitById(this.state.IdEntity)
            .then((response) => {
                const produit = response.data;
                console.log(response.data)
                this.setState({
                    UpdateProduit: produit,
                    loaded: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    getInitialValues = () => {
        return this.state.UpdateProduit;
    }


    submit = (values, actions) => {
        AxiosCenter.updateProduit(values)
            .then((response) => {
                this.props.history.push("/produit/detail/" + response.data.id);
            })
            .catch((error) => {
                console.log(error);
            });
        actions.setSubmitting(true);
    }



    userSchema = Yup.object().shape({
        nom: Yup.string().min(3, "Le Nom ne peut contient moins que 3 caractères")
            .max(20, "Le nom ne peut dépasser 20 caractères ").required("Le champ est obligatoire"),
        reference: Yup.string()
            .matches(/^[0-9]+$/, "Reference doit être composé uniquement de chiffres").required("Le champ est obligatoire"),
        tva: Yup.string()
            .matches(/^[0-9]+$/, "Tva doit être composé uniquement de chiffres").required("Le champ est obligatoire"),
        prix: Yup.string()
            .matches(/^[0-9]+$/, "Prix doit être composé uniquement de chiffres")
            .required("Le champ est obligatoire"),
        description: Yup.string().max(200, "200 caractères maximum"),
        unite: Yup.string().required("Le champ est obligatoire"),
    });
    render() {

        return (

            <MDBContainer>
                <div>
                    <MDBCardHeader color="default-color">Gestion Produits </MDBCardHeader>
                    <br></br>
                    <MDBCardTitle tag="h1">Edite Produit {this.state.UpdateProduit.nom} </MDBCardTitle>
                    <hr></hr>
                    <Formik
                        initialValues={this.getInitialValues()}
                        onSubmit={this.submit}
                        enableReinitialize={true}
                        validationSchema={this.userSchema}
                    >
                        {({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className=" container-fluid p-5 lighten-5 justify-content-center align-items-center"
                            >
                                <div >
                                    <Field
                                        name="nom"
                                        label="Nom produit"
                                        component={ComposantInput}
                                    />
                                    <ErrorMessage name="nom" component={ComposantErreur} />

                                    <Field name="reference" label="Reference" component={ComposantInput} />
                                    <ErrorMessage
                                        name="reference"
                                        type="numbre"
                                        component={ComposantErreur}
                                    />

                                    <Field name="tva" label="Tva"
                                        component={ComposantInput} />
                                    <ErrorMessage
                                        name="tva"
                                        type="numbre"
                                        component={ComposantErreur}
                                    />
                                    <Field name="unite" label="Unité" component={ComposantSelect} />
                                    <ErrorMessage name="unite" component={ComposantErreur} />

                                    <Field name="prix" label="Prix" component={ComposantInput} />
                                    <ErrorMessage name="prix" type="number" component={ComposantErreur} />

                                    <Field name="description" label="Description" component={ComposantTextarea}
                                        rows="2" />
                                    <ErrorMessage name="description" component={ComposantErreur} />

                                </div>
                                <br></br>
                                <div className="row d-flex justify-content-center ">
                                    <MDBBtn rounded type="submit" color="primary">
                                        Sauvegarder
              </MDBBtn>
                                    <Link to={`/produit/detail/${this.state.UpdateProduit.id}`}>
                                        <MDBBtn rounded color="teal accent-3">
                                            Annuler
                  </MDBBtn>
                                    </Link>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div >
            </MDBContainer >

        );
    }
}
export default UpdateProduit;
