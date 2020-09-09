import React from "react";
import "./style.scss";
import {Formik} from "formik";
import AxiosCenter from "../../shared/services/AxiosCenter";
import {Redirect, withRouter} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow,} from "mdbreact";
import * as Yup from "yup";
import ErrorMessForm from "./../../shared/component/ErrorMessForm";
import queryString from "query-string";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required("Veuillez renseigner votre nouveau mot de passe")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .matches(
      /[a-zA-Z0-9]/,
      "Le mot de passe ne doit pas contenir de caractères spéciaux"
    ),
  confirmPassword: Yup.string()
    .required("Veuillez confirmer votre nouveau mot de passe")
    .test("match", "Les mots de passe ne correspondent pas.", function (
      confirmPassword
    ) {
      return confirmPassword === this.parent.password;
    }),
});

export class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: "", isSubmitting: false };
  }

  componentDidMount() {
    let params = queryString.parse(this.props.location.search);
    this.setState({
      key: params.key,
    });
  }

  submit = (values) => {
    var myValues = {
      key: this.state.key,
      newPassword: values.password,
    };
    AxiosCenter.finishPasswordReset(myValues).then((response) => {
      if (response.status === 200) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    if (!this.props.location.search.includes("?key")) {
      //this is how I tried to redirect
      return (
        //
        <Redirect to="/login" />
      );
    }
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
                            disabled={isSubmitting}
                          >
                            Envoyer
                          </MDBBtn>
                        </div>
                        <strong style={{ color: "red" }}>
                          {/* {isSubmitting ? "Please wait..." : ""} */}
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
