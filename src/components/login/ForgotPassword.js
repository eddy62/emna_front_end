import React from "react";
import "./style.scss";
import {Formik} from "formik";
import AxiosCenter from "../../shared/services/AxiosCenter";
import {withRouter} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow,} from "mdbreact";
import * as Yup from "yup";
import ErrorMessForm from "./../../shared/component/ErrorMessForm";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Veuillez renseigner votre Email"),
});

export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSubmitting: false, forgotMessage: "" };
  }

  submit = (values) => {
    AxiosCenter.requestPasswordReset(values).then((response) => {
      if (response.status === 200) {
        this.setState({
          forgotMessage:
            "Demande de réinitialisation enregistrée, pensez à verifier vos emails",
        });
      }
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
                            disabled={isSubmitting}
                          >
                            Recevoir l'email de modification
                          </MDBBtn>
                        </div>
                        <strong style={{ color: "red" }}>
                          {this.state.forgotMessage}
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
