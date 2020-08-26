import React from "react";
import "./style.scss";
import { Formik } from "formik";
import AxiosCenter from "../../shared/services/AxiosCenter";
import { withRouter } from "react-router-dom";
import TokenService from "../../shared/services/TokenService";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter,
} from "mdbreact";
import * as Yup from "yup";
import UserService from "../../shared/services/UserService";
import ErrorMessForm from "./../../shared/component/ErrorMessForm";

const SignupSchema = Yup.object().shape({
  password: Yup.string().required(
    "Veuillez renseigner votre nouveau mot de passe"
  ),
  confirmPassword: Yup.string().required(
    "Veuillez confirmer votre nouveau mot de passe"
  ),
});

export class ResetPassword extends React.Component {
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
                            <strong>
                              Réinitialisation de votre mot de passe
                            </strong>
                          </h3>
                        </div>
                        <MDBInput
                          label="Nouveau mot de passe"
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
                            Envoyer
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

export default withRouter(ResetPassword);
