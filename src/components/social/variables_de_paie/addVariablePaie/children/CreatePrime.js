import React, {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {
    MDBBtn, MDBCard, MDBCardBody,
    MDBCardHeader, MDBCardTitle, MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle, MDBInput,
    MDBRow
} from "mdbreact";

import Loading from "../../../../../shared/component/Loading";
import * as actions from "react-bootstrap-sweetalert";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

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
        <label style={{fontSize:"0.8rem", color:"#757575", marginLeft:"-70%"}}>{props.label}</label>
        <select className="form-control browser-default custom-select" name={props.name} {...props} {...field}>
            {props.list.map((object) => (
                <option key={object.id} value={object.id}>{object.intitule}</option>))}
        </select>
    </div>
);

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Prime Enregistrée &nbsp;&nbsp;!</strong>
                </div>,
                //{position: "top-right"}
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Prime NON Enregistrée &nbsp;&nbsp;!</strong>
                </div>,
                //{position: "top-right"}
            );
            break;
    }
};

class CreatePrime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeTypePrime: [],
            loaded: false

        };
    }

    componentDidMount() { /*se lance apres le render*/
        AxiosCenter.getAllTypePrimes()
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
        })

    }


    submit = (values, actions) => {
        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        values.employeId = this.props.employeId;
        console.log(values);
        AxiosCenter.createPrime(values)
            .then((response) => {
                const prime = response.data
                console.log(prime)    
                notify("success");           
                actions.resetForm();
            }).catch((error) => {
            console.log(error)
            notify("error");
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
                        <Formik
                            onSubmit={this.submit}
                            initialValues={{/* a prendre dans le back, deux accodales liste d'expression */
                                annee: "",  //Props reçu du composant parent
                                employeId: "", //Props reçu du composant parent
                                etatVariablePaieId: 1,
                                id: null,
                                mois: "", //Props reçu du composant parent
                                montant: 0,
                                type: "",
                                typePrimeId: 1

                            }}
                            validationSchema={this.primeSchema}
                        >
                            {({
                                values,
                                  handleSubmit
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBRow between around>
                                        <div>
                                            <Field
                                                name="typePrimeId"
                                                label="Type :"
                                                list={this.state.listeTypePrime}
                                                component={ComposantSelect}
                                            />
                                            <ErrorMessage name="typePrimeId" component={ComposantErreur}/>
                                        </div>
                                        <div>
                                            <Field
                                                name="montant"
                                                label="Montant*"
                                                component={ComposantNumber}
                                            />
                                            <ErrorMessage name="montant" component={ComposantErreur}/>
                                        </div>
                                    </MDBRow>
                                    {/*<pre>{JSON.stringify(values, null, 4)}</pre>*/}
                                    <MDBRow center>
                                        {/* ligne3 */}
                                        <MDBBtn
                                            type="submit"
                                            color="teal accent-3"
                                            rounded
                                            size="sm"
                                        >Enregistrer
                                        </MDBBtn>
                                        <ToastContainer
                                                    hideProgressBar={false}
                                                    newestOnTop={true}
                                                    autoClose={2500}
                                        />
                                    </MDBRow>
                                </Form>
                            )}
                        </Formik>
                    </MDBContainer>
                </div>
            </div>
        )

    }
}

export default CreatePrime;