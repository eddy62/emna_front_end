import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import Style from "./../ClientFournisseur.module.css";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import NavBar from '../../home/NavBar';
import SideBar from '../../home/SideBar';


const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
    <div className=" form-group col-6">
        <label> {props.label} </label>
        <input type="text" {...props} className="form-control" {...field} />
    </div>
);

class ModifierClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updateClient: {},
            loaded: false,
            IdEntity: this.props.match.params.id,


        };
    }


    componentDidMount() {
        console.log(" id " + this.state.IdEntity)
        AxiosCenter.getClientFournisseur(this.state.IdEntity)
            .then((response) => {
                console.log(response.data);
                const client = response.data;
                this.setState({
                    updateClient: client,
                    loaded: true,

                });

            })
            .catch((error) => {
                console.log(error);
            });

    }


    getInitialValues = () => {
        console.log("objet updateCLient " + this.state.updateClient.id)
        return this.state.updateClient;
    }


    submit = (values, actions) => {
        values.id = this.state.IdEntity
        AxiosCenter.updateClientFournisseur(values)
            .then((response) => {
                console.log(response.data);
                console.log("values" + values);
            })
            .catch((error) => {
                console.log(error);
            });

        actions.setSubmitting(false);
    }


    render() {

        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div>
                    <SideBar />
                </div>


                <div className="container-fluid ">
                    <h1 className={Style.h2}>Modifier un client fournisseur</h1>
                    <Formik
                        initialValues={this.getInitialValues()}
                        onSubmit={this.submit}
                        enableReinitialize={true}
                    >
                        {({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className=" container-fluid p-5 bg-light justify-content-center align-items-center"
                            >
                                <div className=" row p-2">
                                    <Field
                                        name="nom"
                                        label="Nom de la Société" component={ComposantInput}

                                    />



                                    <Field name="siren" label="SIREN" component={ComposantInput} />


                                    <Field name="email" label="Email" component={ComposantInput} />


                                    <Field
                                        name="telephone"
                                        label="Téléphone" component={ComposantInput}

                                    />


                                    <Field
                                        name="numeroRue"
                                        label="Numero" component={ComposantInput}

                                    />


                                    <Field name="nomRue" label="Rue" component={ComposantInput} />


                                    <Field
                                        name="codePostal"
                                        label="Code Postal" component={ComposantInput}

                                    />


                                    <Field name="ville" label="Ville" component={ComposantInput} />
                                    <Field name="pays" label="Pays" component={ComposantInput} />

                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Sauvegarder
                            </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}
export default ModifierClient;