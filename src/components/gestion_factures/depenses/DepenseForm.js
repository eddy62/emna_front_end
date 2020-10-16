import React from "react";
import axioscenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import Loading from "../../../shared/component/Loading";
import {MDBBtn, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import * as Yup from "yup";
import {Field, Formik} from "formik";
import ErrorMessForm from "../../../shared/component/ErrorMessForm";

const ComposantSelect = ({field, form: {touched, errors}, ...props}) => (
    <span>
        <select className="browser-default custom-select md-form md-outline" {...props} {...field}>
            <option defaultValue label="Sélectionnez un fournisseur" key="0"/>
            {
                props.list.map((item) => (
                    <option value={item.id} label={item.nom} key={item.id}/>
                ))
            }
        </select>
    </span>
)

const ComposantSelectPaiment = ({field, form: {touched, errors}, ...props}) => (
    <span>
        <select className="browser-default custom-select md-form md-outline" {...props} {...field}>
            <option defaultValue label="Sélectionnez un moyen de paiment" key="0"/>
            <option value="Chèque" label="Chèque" key="1"/>
            <option value="Espèces" label="Espèces" key="2"/>
            <option value="Carte Bancaire" label="Carte Bancaire" key="3"/>
            <option value="Virement" label="Virement" key="4"/>
        </select>
    </span>
)

const ComposantDate = ({field}) => (
    <MDBInput outline type="date"
              max={new Date().toISOString().split("T")[0]} {...field} />
);

const ComposantInput = ({field, form: {touched, errors}, ...props}) => (
    <MDBInput label={props.label} outline type="text" {...props} {...field} />
);

const lexique = {
    required: "Le champ est obligatoire",
    requiredDate: "La date est requise",
    price: "Le prix doit être composé uniquement de chiffres"
}

const validationSchema = Yup.object().shape({
    clientFournisseurId: Yup.number().typeError(lexique.required).required(lexique.required),
    moyenDePaiement: Yup.string("String").required(lexique.required),
    date: Yup.date().required(lexique.requiredDate).max(new Date().toISOString().split("T")[0]),
    prix: Yup.number().typeError(lexique.price).required(lexique.required),
    raison: Yup.string("String").required(lexique.required),
});

class DepenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        axioscenter.getInfosForCreationFacture(UserService.getSocietyId()).then((resarray) => {
            this.setState({
                clients: resarray[1].data,
                numfact: resarray[0].data +1,
                loaded: true
            })
        })
    }

    getInitialValues = () => {
        return {
            id: this.props.expense.id,
            clientFournisseurId: this.props.expense.clientFournisseurId,
            moyenDePaiement: this.props.expense.moyenDePaiement,
            raison: this.props.expense.raison,
            date: this.props.expense.date,
            prix: this.props.expense.prix
        }
    }

    render() {
        if(!this.state.loaded) return <Loading/>
        return (
            <MDBContainer>
                <MDBCardHeader color="default-color">
                    <MDBCardTitle tag="h1">
                        {this.props.title}
                    </MDBCardTitle>
                </MDBCardHeader>
                <hr/>
                <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
                    {this.props.subTitle}
                </MDBCardHeader>

                <Formik
                    onSubmit={this.props.submit}
                    initialValues={this.getInitialValues()}
                    validationSchema={validationSchema}
                >
                    {({
                          handleSubmit,
                          errors,
                      }) => (
                        <form onSubmit={handleSubmit}
                              className="bg-white border p-5 d-flex flex-column"
                        >
                            <MDBRow>
                                <MDBCol md="6">
                                    <Field
                                        name="clientFournisseurId"
                                        label="Client Fournisseur :"
                                        list={this.state.clients}
                                        component={ComposantSelect}
                                    />
                                    <ErrorMessForm
                                        error={errors.clientFournisseurId}
                                        touched={errors.clientFournisseurId}
                                        left
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <Field
                                        name="moyenDePaiement"
                                        label="Moyen de paiment :"
                                        component={ComposantSelectPaiment}

                                    />
                                    <ErrorMessForm
                                        error={errors.moyenDePaiement}
                                        touched={errors.moyenDePaiement}
                                        left
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="6">
                                    <Field
                                        name="date"
                                        label="Date :"
                                        component={ComposantDate}

                                    />
                                    <ErrorMessForm
                                        error={errors.date}
                                        touched={errors.date}
                                        left
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <Field
                                        name="prix"
                                        label="Prix :"
                                        component={ComposantInput}
                                    />
                                    <ErrorMessForm
                                        error={errors.prix}
                                        touched={errors.prix}
                                        left
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="6">
                                    <Field
                                        name="raison"
                                        label="Raison :"
                                        component={ComposantInput}
                                    />
                                    <ErrorMessForm
                                        error={errors.raison}
                                        touched={errors.raison}
                                        left
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn rounded type="submit" color="primary">
                                Enregistrer
                            </MDBBtn>

                        </form>
                    )}
                </Formik>
                <hr/>
            </MDBContainer>
        )
    }
}

export default DepenseForm;