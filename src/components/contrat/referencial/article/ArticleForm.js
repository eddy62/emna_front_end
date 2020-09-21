import React from "react";
import {MDBBtn, MDBCardHeader, MDBCardTitle, MDBContainer} from "mdbreact";
import {Field, Formik} from "formik";
import {Link} from "react-router-dom";
import InputComponent from "../../../../shared/component/form/InputComponent";
import * as Yup from "yup";
import ErrorMessForm from "../../../../shared/component/ErrorMessForm";

export default  class ArticleForm extends React.Component {
    lexique = {
        required : "le champ est obligatoire",
    }

    articleShema = Yup.object().shape({
        titre       : Yup.string("String").required(this.lexique.required),
        intitule    : Yup.string("String").required(this.lexique.required),
        description : Yup.string("String").required(this.lexique.required),
    });

    render() {
        return (
            <MDBContainer>
                <div>
                    <MDBCardHeader color="default-color">Gestion d'un article </MDBCardHeader>
                    <br/>
                    <MDBCardTitle tag="h3">{this.props.title}</MDBCardTitle>
                    <hr/>
                    <Formik
                        onSubmit={this.props.onSubmit}
                        initialValues={this.props.article}
                        validationSchema={this.articleShema}
                    >
                        {({
                          handleSubmit,
                          isSubmitting,
                          errors,
                          touched
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white border p-5 d-flex flex-column"
                            >
                                <div >
                                    <Field
                                        name="titre"
                                        label="Titre de l'article"
                                        component={InputComponent}
                                    />
                                    <ErrorMessForm
                                        error={errors.titre}
                                        touched={errors.titre}
                                        left
                                    />

                                    <Field
                                        name="intitule"
                                        label="Intitulé de l'article"
                                        component={InputComponent}
                                    />
                                    <ErrorMessForm
                                        error={errors.intitule}
                                        touched={errors.intitule}
                                        left
                                    />

                                    <Field
                                        name="description"
                                        label="Description de l'article"
                                        component={InputComponent}
                                    />
                                    <ErrorMessForm
                                        error={errors.description}
                                        touched={errors.description}
                                        left
                                    />

                                </div>
                                <br/>
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
