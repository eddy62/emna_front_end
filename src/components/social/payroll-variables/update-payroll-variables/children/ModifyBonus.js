import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBInput, MDBRow,} from "mdbreact";
import {toast} from "react-toastify";
import Loading from "../../../../../shared/component/Loading";


const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
);

const ComposantNumber = ({field, ...props}) => (
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

const ComposantSelect = ({field, ...props}) => (
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
                    <strong>Prime Modifiée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Prime NON Modifiée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Prime NON Modifiée &nbsp;&nbsp;!</strong>
                </div>,
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
        AxiosCenter.getAllBonusTypes()
            .then((response) => {
                const list = response.data
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
        AxiosCenter.updateBonus(values)
            .then(() => {
                notify("success", values.type)
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
                    <MDBContainer>
                        <div>
                            <MDBCardHeader color={"teal accent-4"}>
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
                                typePrimeId: this.props.prime.typePrimeId
                            }}
                            validationSchema={this.primeSchema}
                        >
                            {({
                                  handleSubmit
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <MDBCardBody>
                                        <MDBRow between around>
                                                <Field
                                                    name="typePrimeId"
                                                    label="Type:"
                                                    list={this.state.listeTypePrime}
                                                    component={ComposantSelect}
                                                />
                                                <ErrorMessage name="typePrimeId" component={ComposantErreur}/>
                                                <Field
                                                    name="montant"
                                                    label="Montant*"
                                                    component={ComposantNumber}
                                                />
                                                <ErrorMessage name="montant" component={ComposantErreur}/>
                                        </MDBRow>
                                        <MDBRow center>
                                            <MDBBtn
                                                type="submit"
                                                color="teal accent-3"
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
                                        </MDBRow>
                                    </MDBCardBody>
                                </Form>
                            )}
                        </Formik>
                    </MDBContainer>
                </div>
        )
    }
}

export default ModifyBonus;