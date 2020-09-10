import React, { Component } from 'react';
import AxiosCenter from '../../../../../shared/services/AxiosCenter';
import UserService from '../../../../../shared/services/UserService';
import Loading from '../../../../../shared/component/Loading';
import { MDBContainer, MDBCardTitle, MDBInput, MDBBtn } from 'mdbreact';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const StartDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

const EndDateComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" {...props} {...field} />
);

const ErrorComponent = (props) => (
  <div className="text-danger">{props.children}</div>
);

const InputComponent = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="text" {...props} {...field} />
);

export default class EditStatement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false, 
      statement: {},
      roleUser: UserService.getRole()
    }
  }

  getInitialValues = () => {
    return this.state.statement;
  }

  componentDidMount() {
    if (this.state.roleUser === "ROLE_SOCIETY" || 
        this.state.roleUser === "ROLE_ADMIN") {
          const idStatement = this.props.match.params.id;
          AxiosCenter.getReleveById(idStatement)
          .then((response) => {
            const statement = response.data;
            this.setState({ statement: statement, loaded: true });
          })
          .catch((error) => {
            console.log(error);
          })
        }
  }

  submit = (values) => {
    AxiosCenter.updateReleve(values)
      .then((response) => {
        const statement = response.data;
        this.props.history.push("/detailsreleveinvalide/" + statement.id);
      })
      .catch((err) => console.log(err));
  };

  editStatementSchema = Yup.object().shape({
    dateDebut: Yup.date().required("Date obligatoire"),
    dateFin: Yup.date().required("Date obligatoire").min(
      Yup.ref('dateDebut'),
      "La date de fin doit être ultérieure à la date de début"
    ),
    banque: Yup.string().required("Banque obligatoire"),
  });

  render() {
    if (!this.state.loaded) return <Loading />
    return (
      <MDBContainer>
        <MDBCardTitle tag="h1">Modification Relevé n°{this.props.match.params.id}</MDBCardTitle>
        <hr />
        <Formik
          onSubmit = {this.submit}
          initialValues = {this.getInitialValues()}
          validationSchema = {this.editStatementSchema}
          enableReinitialize  = {true}
        >
          {({values,
          handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} className="container-fluid p-5  lighten-5 justify-content-center align-items-center">
              <Field
                name="dateDebut"
                label="Date de début :"
                value={values.dateDebut}
                component={StartDateComponent}
              />
              <ErrorMessage name="dateDebut" component={ErrorComponent} />
              <Field
                name="dateFin"
                label="Date de fin :"
                value={values.dateFin}
                component={EndDateComponent}
              />
              <ErrorMessage name="dateFin" component={ErrorComponent} />
              <Field
                name="banque"
                label="Banque"
                value={values.banque}
                component={InputComponent}
              />
              <ErrorMessage name="banque" component={ErrorComponent} />
              <div className="row d-flex justify-content-center ">
                <MDBBtn
                  color="teal accent-3"
                  rounded
                  size="sm"
                  onClick={() => {
                    this.props.history.push (
                      "/detailsreleveinvalide/" + this.state.statement.id
                    )
                  }}
                >
                  Retour
                </MDBBtn>
                <MDBBtn
                  color="teal accent-3"
                  rounded
                  size="sm"
                  type="submit"
                >
                  Valider
                </MDBBtn>
              </div>
            </Form>  
          )}
        </Formik>
      </MDBContainer>
    )   
  }
}