import React, {Component} from "react";
import {Field, Formik, ErrorMessage, Form} from "formik";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCardTitle, MDBContainer, MDBInput} from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import UserService from "../../../../shared/services/UserService";
import * as Yup from "yup";
import {toast} from "react-toastify";

const lexique = {
    title: "Création d'un relevé",
    dateDebut: "Date de début",
    dateFin: "Date de début",
    banque: "Banque"
}

const releveSchema = Yup.object().shape(
    {
        dateDebut: Yup.date().required("La date de début est obligatoire"),
        dateFin: Yup.date().required("La date de fin est obligatoire"),
        banque: Yup.string().required("Le nom de la banque est requit")
    });

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantStartDate = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input {...field} {...props} type="date" className="form-control"/>
    </div>
);

const ComposantEndDate = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input {...field} {...props} type="date" className="form-control"/>
    </div>
);

const ComposantInput = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label> {props.label} </label>
        <input {...field} {...props} type="text" className="form-control"/>
    </div>
);

class CreationReleve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            societeId: UserService.getSocietyId(),
            roleUser: UserService.getRole()
        };
    }

    submit = (values, actions) => {
        values.societeId = this.state.societeId;
        AxiosCenter.postReleve(values)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong>Le nouveau relevé {response.data.nom} a bien été créé. </strong>
                    </div>
                )
                console.log(values.date,values.type)
                this.props.history.push("/menureleve");
            })
            .catch((error) => {
                console.log(error);
                toast.error(
                    <div className="text-center">
                        <strong>Erreur lors de la création le nouveau relevé n'a pas été créé &nbsp;&nbsp;!</strong>
                    </div>
                );
            });
       // console.log(values.date,values.type)
        actions.setSubmitting(true);
    };

    render() {
        return (
            <MDBContainer>
                <div>
                    <MDBCardTitle tag="h1">{lexique.title}</MDBCardTitle>
                    <hr></hr>
                    <Formik onSubmit={this.submit}
                            initialValues={{ dateDebut: "", dateFin: "", banque: "" }}
                            validationSchema={releveSchema}>
                        {({
                              values,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                              handleReset,
                              isSubmitting,
                              errors,
                              touched,
                              dirty
                          }) => (
                            <form onSubmit={handleSubmit} className="bg-white p-5 d-flex flex-column">
                                <Field name="dateDebut"
                                       label="Date de début"
                                       value={values.date}
                                       component={ComposantStartDate}
                                />
                                <ErrorMessage name="dateDebut" component={ComposantErreur}/>

                                <Field name="dateFin"
                                       label="Date de fin"
                                       value={values.date}
                                       component={ComposantEndDate}
                                />
                                <ErrorMessage name="dateFin" component={ComposantErreur}/>

                                <Field name="banque"
                                       label="Banque"
                                       value={values.date}
                                       component={ComposantInput}
                                />
                                <ErrorMessage name="banque" component={ComposantErreur}/>


                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    Envoyer
                                </button>
                            </form>
                        )}
                    </Formik>
                    <Link to={"/menureleve"}>
                        <MDBBtn className="boutton" color=" teal lighten-2" rounded size="sm">
                            <span id="color-button"> Retour</span>
                        </MDBBtn>
                    </Link>
                </div>
            </MDBContainer>
        );
    }
}
export default CreationReleve;
