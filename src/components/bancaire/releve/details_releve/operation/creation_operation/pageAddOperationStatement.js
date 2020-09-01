import React from "react";
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../../shared/services/AxiosCenter";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCardTitle, MDBContainer,} from "mdbreact";

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantDate = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input type="Date" max={new Date().toISOString().split("T")[0]} {...props} className="form-control" {...field} />
    </div>
);

const ComposantInput = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input type="text" {...props} className="form-control" {...field} />
    </div>
);

const ComposantSelect = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <select className=" form-control browser-default custom-select" name="type"  {...props} {...field} >
            {/* <option value="pc">PC</option> */}
            <option defaultValue="credit">Crédit</option>
            <option value="debit">Débit</option>
        </select>
    </div>
);

class PageAddOperationStatement extends React.Component {
    submit = (values, actions) => {
        AxiosCenter.postOperation(values)
            .then((response) => {
                console.log(response.data);
                this.props.history.push("/detailsreleveinvalide/"+this.props.match.params.id);
                //this.props.history.goBack();
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(values.date,values.type)
        actions.setSubmitting(true);
    };

    schema = Yup.object().shape({
        date: Yup.date().required("La date est obligatoire")
            .max(new Date(),"La date ne peut être supérieur a la date du jour"),
        description: Yup.string().required("La description est obligatoire"),
        solde: Yup.number().positive("Le solde doit être positif")
            .required("Le solde est obligatoire"),
    });

    render() {
        return (
            <MDBContainer>
                <div>
                    <MDBCardTitle tag="h1">Création d'opération</MDBCardTitle>
                    <hr></hr>
                    <Formik initialValues={{
                        description: "",
                        solde: "",
                        type: "credit",
                        releveId: this.props.match.params.id
                    }}
                            onSubmit={this.submit}
                            validationSchema={this.schema}
                    >
                        {({handleSubmit, isSubmitting}) => (
                            <form
                                onSubmit={handleSubmit}
                                className="container-fluid p-5  lighten-5 justify-content-center align-items-center"
                            >
                                <div>
                                    <Field
                                        name="date"
                                        label="Date :"
                                        component={ComposantDate}
                                    />
                                    <ErrorMessage name="date" component={ComposantErreur}/>

                                    <Field name="description"
                                           label="Description :"
                                           component={ComposantInput}
                                    />
                                    <ErrorMessage name="description" component={ComposantErreur}/>

                                    <Field name="type"
                                           label="Type :"
                                           component={ComposantSelect}
                                    />
                                    <Field name="solde"
                                           label="Solde :"
                                           component={ComposantInput}
                                    />
                                    <ErrorMessage name="solde" component={ComposantErreur}/>
                                </div>
                                <br></br>
                                <div className="row d-flex justify-content-center ">
                                    <MDBBtn rounded type="submit" color="primary">
                                        Sauvegarder
                                    </MDBBtn>
                                    <Link to={"/detailsreleveinvalide/"+this.props.match.params.id}>
                                        <MDBBtn rounded color="teal accent-3">
                                            Retour
                                        </MDBBtn>
                                    </Link>
                                    {/*<a href="#" onClick={() => this.props.history.goBack()}>*/}
                                    {/*    <MDBBtn rounded color="teal accent-3">*/}
                                    {/*        Retour*/}
                                    {/*    </MDBBtn>*/}
                                    {/*</a>*/}
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </MDBContainer>
        );
    }
}

export default PageAddOperationStatement;