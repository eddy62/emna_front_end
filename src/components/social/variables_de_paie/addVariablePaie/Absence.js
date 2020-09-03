import React, {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {
    MDBBtn, MDBCard, MDBCardBody,
    MDBCardHeader, MDBCardTitle, MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle, MDBInput,
    MDBRow
} from "mdbreact";

import AxiosCenter from "./../../../../shared/services/AxiosCenter";
import Loading from "./../../../../shared/component/Loading";
import * as actions from "react-bootstrap-sweetalert";

const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantNumber = ({field, form: {touched, errors}, ...props}) => (
    <MDBInput
        label={props.label}
        min="0.01"
        step="0.01"
        outline
        type="number"
        valueDefault="0.01"
        {...props}
        {...field}
    />
);

const ComposantSelect = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label>{props.label}</label>
        <select name="type" {...props} {...field}>
            {props.list.map((prime, index) =>
                (<option key={index}>{prime.nomUsage}</option>))
            }
        </select>
    </div>
);

class Absence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearSelected : 2020, /*a supp pour test sera fourni par le composant parent apres*/
            idEmploye: 1, /*a supp pour test*/
            monthSelected : 9, /*a supp pour test*/

            listeTypePrime: [],
            loaded: false

        };
    }

    componentDidMount() { /*se lance apres le render*/
        /*AxiosCenter.getAllTypePrimes()
            .then((response) => {
                const list = response.data
                console.log(list)
                this.setState(
                    {
                        listeTypePrime: list,
                        loaded: true
                    }
                )
            }).catch((error) => {
            console.log(error)
        })*/
        //Récupération de la liste des employés à travers l'id de la société
        AxiosCenter.getAllWrapperEmployesBySociety(1)
        .then((response) => {
            const list = response.data;
            this.setState(
                {
                    listeTypePrime: list,
                    loaded: true
                }
            )
        }).catch((error) => {
        console.log(error)
        });

    }


    submit = (values, action) => {
        values.employeId = 1

        AxiosCenter.createPrime(values)
            .then((response) => {
                const Prime = response.data
                console.log(Prime)
            }).catch((error) => {
            console.log(error)
        })
        actions.setSubmitting(true)
    }

    primeSchema = Yup.object().shape({
        montant: Yup.number().positive("Le montant doit être positif")
            .required("Le montant est obligatoire"),
    });

    render() {
        if (!this.state.loaded) return <Loading/>;
        return (
            <div>
                <div>
                    <MDBContainer>
                        <div>
                            <MDBCardHeader color={"primary"}>
                                <MDBCardTitle tag="h4">Primes</MDBCardTitle>
                            </MDBCardHeader>
                        </div>

                        <Formik
                            onSubmit={this.submit}
                            initialValues={{/* a prendre dans le back, deux accodales liste d'expression */
                                annee: this.state.yearSelected, /* this.props.yearSelected, props composant parent a remettre */
                                employeId: this.state.idEmploye, /* this.props.idEmploye */
                                etatVariablePaieId: 1,
                                id: null,
                                mois: this.state.monthSelected, /* this.props.monthSelected */
                                montant: "",
                                type: "",
                                typePrimeID: ""

                            }}
                            validationSchema={this.primeSchema}
                        >
                            {({
                                  handleSubmit,
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody>
                                        <MDBCard>
                                            <MDBRow between around>
                                                <div>
                                                    <Field
                                                        name="type"
                                                        label="Type:"
                                                        list={this.state.listeTypePrime}
                                                        component={ComposantSelect}
                                                    />
                                                    <ErrorMessage name="type" component={ComposantErreur}/>
                                                </div>
                                            </MDBRow>
                                            <MDBRow between around>
                                                <div>
                                                    <Field
                                                        name="montant"
                                                        label="Montant en Euros"
                                                        component={ComposantNumber}
                                                    />
                                                    <ErrorMessage name="montant" component={ComposantErreur}/>
                                                </div>
                                            </MDBRow>
                                            <MDBRow between around>
                                                {/* ligne3 */}
                                                <MDBBtn
                                                    type="submit"
                                                    color="primary"
                                                    rounded
                                                    size="sm"
                                                    type="submit"
                                                >Enregistrer
                                                </MDBBtn>
                                                <MDBBtn
                                                    type="submit"
                                                    color="primary"
                                                    rounded
                                                    size="sm"
                                                    onClick={() => {
                                                        this.props.history.push(
                                                            "/socialHome/1" /* Path à modifier */
                                                        );
                                                    }
                                                    }
                                                >Annuler
                                                </MDBBtn>
                                            </MDBRow>
                                        </MDBCard>
                                    </MDBCardBody>
                                </Form>
                            )}
                        </Formik>
                    </MDBContainer>
                </div>
            </div>
        )

    }
}

export default Absence;