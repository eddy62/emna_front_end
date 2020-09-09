import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import Loading from "../../../../../shared/component/Loading";
import {toast} from "react-toastify";

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Note de frais Enregistrée &nbsp;&nbsp;!</strong>
                </div>,
                //{position: "top-right"}
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Note de frais NON Enregistrée &nbsp;&nbsp;!</strong>
                </div>,
                //{position: "top-right"}
            );
            break;
    }
};

const ComponentDesignation = ({field, form: {touched, errors}, ...props}) => (
    <MDBInput
        outline
        type="text"
        {...props}
        {...field}
    />
);

const ComponentDate = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <label style={{fontSize:"0.8rem", color:"#757575", marginLeft:"-80%"}}> {props.label} </label>
        <MDBInput
            outline
            type="date"
            label="Date* :"
            min={props.startdate}
            max={props.enddate}
            {...props}
            {...field}
        />
    </div>
);

const ComponentNumber = ({field, form: {touched, errors}, ...props}) => (
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

// TODO refactoring selon tache upload
const ComponentUpload = ({field, form: {touched, errors}, ...props}) => (
    <div>
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
            <label className="custom-control-label" htmlFor="defaultUnchecked">Justificatif(s)</label>
        </div>
        <MDBBtn disabled={true}
            color="teal accent-3"
            rounded
            size="sm"
            type="submit">
            Upload</MDBBtn>
    </div>
);

const ComponentError = (props) => (
    <div className="text-danger">{props.children}</div>
);



class CreateNoteDeFrais extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            startPeriod: '',
            endPeriod: ''
            

            //endPeriod: new Date().toISOString().slice(0, 10)
        };
    }

    componentDidMount() {
            this.setState({
                    loaded: true,
                    
                })
    }

    submit = (values, actions) => {
        
        console.log(new Date(new Date().setFullYear(this.props.yearSelected,this.props.monthSelected-1, 1)).toISOString().slice(0, 10));
        values.employeId = this.props.employeId;
        values.annee = this.props.yearSelected;
        values.mois = this.props.monthSelected;
        console.log("SUBMIT : " + JSON.stringify(values, null, 4));
        AxiosCenter.createNoteDeFrais(values)
            .then((response) => {
                const noteDeFrais = response.data;
                console.log("POST : " + JSON.stringify(noteDeFrais, null, 4));
                notify("success");
                actions.resetForm();
            }).catch((error) => {
            console.log(error);
            notify("error");
        });
        actions.setSubmitting(true);
        // TODO toast noteDeFrais enregistree
    };

    noteDeFraisSchema = Yup.object().shape({
        designation: Yup.string().required("Désignation obligatoire"),
        date: Yup.date().required("Date obligatoire"),
        montant: Yup.number().required("Montant obligatoire").min("0.01", "Montant positif"),
    });

    updatePeriod() {
        console.log("updatePeriod");
        this.state.startPeriod = new Date(new Date()
            .setFullYear(
                this.props.yearSelected,
                this.props.monthSelected -1,
                1
            )).toISOString().slice(0,10);
            this.state.endPeriod = new Date(new Date()
            .setFullYear(
                this.props.yearSelected,
                this.props.monthSelected ,
                0
            )).toISOString().slice(0,10)
    }

    render() {
        if (!this.state.loaded) return <Loading/> // TODO toast chargement en cours
        else return (
            this.updatePeriod(),
            <MDBContainer>
                <div>
                    <Formik initialValues={{
                        id: null,
                        designation: "",
                        date: "",
                        montant: 0,
                        justificatif: "",
                        mois: this.props.monthSelected,
                        annee: this.props.yearSelected,
                        etatVariablePaieId: 1,
                        employeId: this.props.employeId
                    }}
                            onSubmit={this.submit}
                            validationSchema={this.noteDeFraisSchema}
                    >
                        {({
                              values,
                              handleSubmit
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <MDBCardBody style={{marginTop:"-5%", marginBottom:"-3%"}}>                                                                        
                                    <MDBRow between around>
                                        <MDBCol md="4">
                                            {/* date note de frais */}
                                            <Field
                                                name="date"
                                                startdate={this.state.startPeriod}
                                                enddate={this.state.endPeriod}
                                                component={ComponentDate}
                                            />
                                            <ErrorMessage name="date" component={ComponentError}/>
                                        </MDBCol>
                                        <MDBCol md="4" className="mt-4">
                                            {/* montant */}
                                            <Field
                                                name="montant"
                                                label="Montant*"
                                                component={ComponentNumber}
                                            />
                                            <ErrorMessage name="montant" component={ComponentError}/>
                                        </MDBCol>
                                    </MDBRow>
                                    {/* désignation */}
                                    <MDBRow center style={{marginTop:"-3%"}}>
                                        <MDBCol md="5">
                                            <Field
                                                name="designation"
                                                label="Désignation*"
                                                component={ComponentDesignation}
                                            />
                                            <ErrorMessage name="designation" component={ComponentError}/>
                                        </MDBCol>                                            
                                    </MDBRow>
                                    {/* upload justificatifs */}
                                    <MDBRow space around>
                                        <MDBCol md="4">
                                            <Field
                                                name="justificatifs"
                                                component={ComponentUpload}
                                            />
                                            <ErrorMessage name="justificatifs" component={ComponentError}/>
                                        </MDBCol>
                                    {/*<pre>{JSON.stringify(values, null, 4)}</pre>*/}
                                        <MDBCol md="4" className="mt-4">
                                            <div>
                                                <MDBBtn
                                                    color="teal accent-3"
                                                    rounded
                                                    size="sm"
                                                    type="submit"
                                                >Enregistrer
                                                </MDBBtn>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </Form>
                        )}
                    </Formik>
                </div>
            </MDBContainer>
        )
    }

}

export default CreateNoteDeFrais;
