import React from "react";
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../../shared/services/AxiosCenter";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCardTitle, MDBContainer,} from "mdbreact";
import Loading from "../../../../../../shared/component/Loading";
import {toast} from "react-toastify";

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantDate = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input type="Date"
               max={props.datefin}
               min={props.datedebut}
               className="form-control"
               {...props}
               {...field} />
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
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            releve: [],
        };
    }

    submit = (values, actions) => {
        AxiosCenter.postOperation(values)
            .then((response) => {
                console.log(response.data);
                toast.success(
                    this.props.history.push("/detailsreleveinvalide/" + this.props.match.params.id),
                { position: "top-right" }
                );
                //this.props.history.goBack();
            })
            .catch((error) => {
                console.log(error);
                toast.error(
                    <div className="text-center">
                        <strong>La date n'est pas dans l'interval des dates du relevé &nbsp;&nbsp;!</strong>
                        <br />
                    </div>,
                    { position: "top-right" }
                );
            });
        // console.log(values.date,values.type)
        actions.setSubmitting(true);
    };

    componentDidMount() {
        AxiosCenter.getReleveById(this.props.match.params.id)
            .then((response) => {
                const releve = response.data;
                this.setState({
                    releve,
                    datefin     : this.getISODate(releve.dateFin),
                    datedebut   : this.getISODate(releve.dateDebut),
                    loaded      : true

                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    schema = (state) => { return Yup.object().shape({
            date: Yup.date().required("La date est obligatoire")
                .max(state.datefin, "La date ne peut être supérieur à la date de fin du relevé")
                .min(state.datedebut, "La date ne peut être inférieur a la date du début du relevé"),
            description: Yup.string().required("La description est obligatoire"),
            solde: Yup.number().positive("Le solde doit être positif")
                .required("Le solde est obligatoire"),
        });
    }

    getISODate = (date) => {
        return new Date(date).toISOString().slice(0,10);
    }

    render() {
        if (!this.state.loaded) return <Loading />
        return (
            <MDBContainer>
                <div>
                    <MDBCardTitle tag="h1">Création d'opération</MDBCardTitle>
                    <hr/>
                    <Formik initialValues={{
                        description: "",
                        solde: "",
                        type: "credit",
                        releveId: this.props.match.params.id
                    }}
                            onSubmit={this.submit}
                            validationSchema={this.schema(this.state)}
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
                                        datedebut={this.state.datedebut}
                                        datefin={this.state.datefin}
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
                                <br/>
                                <div className="row d-flex justify-content-center ">
                                    <MDBBtn rounded type="submit" color="primary">
                                        Sauvegarder
                                    </MDBBtn>
                                    <Link to={"/detailsreleveinvalide/" + this.props.match.params.id}>
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