import React, {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {
    MDBBtn, MDBCard, MDBCardBody,
    MDBCardHeader, MDBCardTitle, MDBContainer,MDBInput,
    MDBRow, toast, ToastContainer
} from "mdbreact";
import Loading from "../../../../../shared/component/Loading";



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
                {position: "top-right"}
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Prime NON Enregistrée &nbsp;&nbsp;!</strong>
                </div>,
                {position: "top-right"}
            );
            break;
    }
};


class ModifyBonus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeTypePrime: [],
            loaded: false

        };
    }

    componentDidMount() {
        console.log(this.props.primeList)
        AxiosCenter.getAllTypePrimes()
            .then((response) => {
                const list = response.data
                console.log(list)
                this.setState({
                        listeTypePrime: list,
                        loaded: true
                    }
                )
            }).catch((error) => {
                console.log(error)
        })

    }

    componentWillUnmount() {
        this.props.reloadParentAfterUpdate();
    }


    submit = (values, actions) => {
        AxiosCenter.updatePrime(values)
            .then(() => {
                notify( "success", values.type)
                actions.resetForm();
                this.props.toggleAvance(this.props.index);
            }).catch((error) => {
            console.log(error)
            notify("error", values.type)
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
                            initialValues={{

                                annee: this.props.prime.annee,
                                employeId: this.props.prime.employeId,
                                etatVariablePaieId: this.props.prime.etatVariablePaieId,
                                id: this.props.prime.id,
                                mois: this.props.prime.mois,
                                montant: this.props.prime.montant,
                                type: this.props.prime.type,
                                typePrimeId: this.props.prime.typePrimeId

                            }}
                            validationSchema={this.primeSchema}
                        >
                            {({
                                  values,
                                  handleSubmit
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody>
                                        <MDBCard>
                                            <MDBRow between around>
                                                <div>
                                                    <Field
                                                        name="typePrimeId"
                                                        label="Type:"
                                                        list={this.state.listeTypePrime}
                                                        component={ComposantSelect}
                                                    />
                                                    <ErrorMessage name="typePrimeId" component={ComposantErreur}/>
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
                                                <MDBBtn
                                                    type="submit"
                                                    color="primary"
                                                    rounded
                                                    size="sm"
                                                >Enregistrer
                                                </MDBBtn>
                                                <MDBBtn
                                                    color="teal accent-3"
                                                    rounded
                                                    size="sm"
                                                    onClick={() => this.props.toggleAvance(this.props.index)}
                                                >Annuler
                                                </MDBBtn>
                                                {/*<ToastContainer
                                                    hideProgressBar={false}
                                                    autoClose={2500}
                                                />*/}
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

export default ModifyBonus;