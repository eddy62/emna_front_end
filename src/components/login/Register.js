import React from "react";
import "./style.scss";
import {Formik} from "formik";
import {withRouter} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow,} from "mdbreact";
import * as Yup from "yup";
import ErrorMessForm from "./../../shared/component/ErrorMessForm";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Veuillez renseigner votre Email"),
  forename: Yup.string().required("Veuillez renseigner votre prénom"),
  name: Yup.string().required("Veuillez renseigner votre nom"),
  phone: Yup.string().required("Veuillez renseigner votre numéro de téléphone"),
  password: Yup.string().required("Veuillez renseigner votre Mot de passe"),
  confirmPassword: Yup.string().required(
    "Veuillez confirmer votre Mot de passe"
  ),
});

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { creationMessage: "" };
  }

  submit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <div className="App">
        <Formik
          onSubmit={this.submit}
          initialValues={{
            email: "",
            forename: "",
            name: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBCard className="log">
                      <MDBCardBody className="mx-4">
                        <div className="text-center">
                          <h3 className="dark-grey-text mb-5">
                            <strong>Toujours pas de compte sur EMNA ?</strong>
                          </h3>
                          <h5>Inscrivez-vous ici</h5>
                        </div>
                        <MDBInput
                          label="Email"
                          name="email"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        >
                          <ErrorMessForm
                            error={errors.email}
                            touched={touched.email}
                            right
                          />
                        </MDBInput>
                        <MDBInput
                          label="Prénom"
                          name="forename"
                          group
                          type="text"
                          validate
                          containerClass="mb-0"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.forename}
                        >
                          <ErrorMessForm
                            error={errors.forename}
                            touched={touched.forename}
                            right
                          />
                        </MDBInput>
                        <MDBInput
                          label="Nom"
                          name="name"
                          group
                          type="text"
                          validate
                          containerClass="mb-0"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        >
                          <ErrorMessForm
                            error={errors.name}
                            touched={touched.name}
                            right
                          />
                        </MDBInput>

                        <MDBInput
                          label="Tél"
                          name="phone"
                          group
                          type="text"
                          validate
                          containerClass="mb-0"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                        >
                          <ErrorMessForm
                            error={errors.phone}
                            touched={touched.phone}
                            right
                          />
                        </MDBInput>
                        <MDBInput
                          label="Mot de passe"
                          name="password"
                          group
                          type="password"
                          validate
                          containerClass="mb-0"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        >
                          <ErrorMessForm
                            error={errors.password}
                            touched={touched.password}
                            right
                          />
                        </MDBInput>
                        <MDBInput
                          label="Confirmation mot de passe"
                          name="confirmPassword"
                          group
                          type="password"
                          validate
                          containerClass="mb-0"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                        >
                          <ErrorMessForm
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                            right
                          />
                        </MDBInput>
                        <br></br>
                        <div className="text-center mb-3">
                          <MDBBtn
                            type="submit"
                            gradient="blue"
                            rounded
                            className="btn-block z-depth-1a"
                          >
                            Inscrivez-vous
                          </MDBBtn>
                        </div>
                        <strong style={{ color: "red" }}>
                          {this.state.creationMessage}
                        </strong>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(Register);
