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
  email: Yup.string().required("Veuillez renseigner votre Email"),
});

export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { creationMessage: "" };
  }

  submit = (value) => {
    AxiosCenter.requestPasswordReset(value.email)
      .then((response) => {
        console.log(value.email);
      })
      .catch((error) => {
        console.log("Raté..");
        this.setState({
          connexionMessage: "Login et/ou Mot de passe incorrect",
        });
      });
  };

  render() {
    return (
      <div className="App">
        <Formik
          onSubmit={this.submit}
          initialValues={{
            email: "",
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
                            <strong>Mot de passe oublié ?</strong>
                          </h3>
                          <h6>
                            Saisissez votre adresse email utilisé à l'ouverture
                            de votre compte Emna
                          </h6>
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
                        <h6>
                          Un email vous sera envoyé vous permettant la
                          modification du mot de passe
                        </h6>
                        <br></br>

                        <div className="text-center mb-3">
                          <MDBBtn
                            type="submit"
                            gradient="blue"
                            rounded
                            className="btn-block z-depth-1a"
                          >
                            Recevoir l'email de modification
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

export default withRouter(ForgotPassword);
