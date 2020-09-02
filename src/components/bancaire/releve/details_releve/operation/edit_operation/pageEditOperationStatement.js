import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosCenter from "../../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../../shared/component/Loading";
import UserService from "../../../../../../shared/services/UserService";
import{ MDBContainer,MDBBtn,MDBInput,MDBCardTitle } from "mdbreact";

const lexique =
{
  requiredDesc  : "*Descritpion obligatoire",
  requiredDate  : "*Date obligatoire",
  requiredType  : "*Type obligatoire",
  requiredSolde : "*Solde obligatoire et non négatif",
  requireMention: "* Mention obligatoire requis",
  title         : "Modification d'opération",
  operationType : { name: "Type d'operation*", debit: "Débit", credit: "Crédit"},
  date          : "Date*",
  description   : "Description*",
  solde         : "Solde (€)*"
}                                                                                                                                                                                                                                                

const operationSchema = Yup.object().shape(
{
  date          : Yup.date().required(lexique.requiredDate).max(new Date()),
  description   : Yup.string().required(lexique.requiredDesc),
  type          : Yup.string().required(lexique.requiredType),
  solde         : Yup.number().required(lexique.requiredSolde).min(0, lexique.requiredSolde)
});

const ComposantErreur = (props) => (
  <div className="text-danger">{props.children}</div>
);

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="text" {...props} {...field} />
);

const ComposantDate = ({ field, form: { touched, errors }, ...props }) => (
  <MDBInput label={props.label} outline type="date" max={new Date().toISOString().split("T")[0]} {...props} {...field} />
);

class EditOperation extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      operation: {},
      roleUser: UserService.getRole()
    };
  }

  getInitialValues = () => {
    return this.state.operation;
  };

  isTypeSelected = (value) => {
    if (value == this.state.type) return "selected";
  }

  componentDidMount() {
    if (this.state.roleUser === "ROLE_SOCIETY" ||
        this.state.roleUser === "ROLE_ADMIN") {
      const idOperation = this.props.match.params.id;
      AxiosCenter.getOperationById(idOperation)
      .then((response) => {
        const operation = response.data;
        this.setState({ operation: operation, loaded: true });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  submit = (values, actions) => {
    AxiosCenter.updateOperation(values)
      .then((response) => {
        const operation = response.data;
        this.props.history.push("/detailsreleveinvalide/" + operation.releveId);
      })
      .catch((err) => console.log(err));
    actions.setSubmitting(true);
  };

  render() {
    if (!this.state.loaded) return <Loading />;
    return (
      <MDBContainer>
        <div>
        <MDBCardTitle tag="h1">{lexique.title}</MDBCardTitle>
        <hr></hr>
        <Formik
              onSubmit            = {this.submit}
              initialValues       = {this.getInitialValues()}
              validationSchema    = {operationSchema}
              enableReinitialize  = {true}
            >
              {({
                values,
                errors,
                touched,
                dirty,
                isSubmitting,
                handleSubmit,
                handleChange,
                handleBlur,
                handleReset,
              }) => (
                <Form onSubmit={handleSubmit}
                  className="container-fluid p-5  lighten-5 justify-content-center align-items-center"
                >
                <Field
                  name="date"
                  label={lexique.date}
                  value={values.date}
                  component={ComposantDate}
                />
                <ErrorMessage
                  name="date"
                  component={ComposantErreur}

                />

                {/* Description */}
                <div>
                  <Field
                    name="description"
                    label={lexique.description}
                    component={ComposantInput}
                  />
                  <ErrorMessage
                    name="description"
                    component={ComposantErreur}
                  />
                </div>

                {/* Type */}
                <div>
                  <select
                    className="browser-default custom-select"
                    name="type"
                    onChange={handleChange}
                    value={values.type}
                    onBlur={handleBlur}
                  >
                    <option value="debit">{lexique.operationType.debit}</option>
                      <option value="credit">{lexique.operationType.credit}</option>
                  </select>
                  {errors.type && touched.type && (
                    <div className="text-danger">
                      {errors.type}
                    </div>
                  )}
                </div>

                { /* Solde */ }
                <div>
                  <Field
                    name="solde"
                    label={lexique.solde}
                    component={ComposantInput}
                  />
                <ErrorMessage
                  name="solde"
                  component={ComposantErreur}
                />
                </div>

                <div className="row d-flex justify-content-center ">
                <MDBBtn
                      color="teal accent-3"
                      rounded
                      size="sm"
                      type="submit"
                    >
                      Enregistrer
                    </MDBBtn>

                    <MDBBtn
                      color="teal accent-3"
                      rounded
                      size="sm"
                      type="reset"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      RESET
                    </MDBBtn>

                    <MDBBtn
                      color="teal accent-3"
                      rounded
                      size="sm"
                      onClick={() => {
                        this.props.history.push(
                          "/detailsreleveinvalide/" + this.state.operation.releveId
                        );
                      }}
                    >
                      Retour
                    </MDBBtn>
                </div>
                </Form>
              )}
            </Formik>
            </div>
        </MDBContainer>
    );
  }
}
export default EditOperation;
