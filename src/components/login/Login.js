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
  MDBModalFooter,
} from "mdbreact";
import * as Yup from "yup";
import UserService from "../../shared/services/UserService";
import ErrorMessForm from "./../../shared/component/ErrorMessForm";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Veuillez renseigner votre Login"),

  password: Yup.string().required("Veuillez renseigner votre Mot de passe"),
});

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connexionMessage: "",
    };
  }

  submit = (values) => {
    AxiosCenter.authenticate(values)
      .then((response) => {
        if (response.status === 200) {
          TokenService.connexion(response.data.id_token); //pour le token
          AxiosCenter.getCurrentUser().then((response) => {
            UserService.setUserId(response.data.id);
            UserService.setRole(response.data.authorities[0]);
            this.props.history.push("/");
          });
        }
      })
      .catch((error) => {
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
          initialValues={{ username: "", password: "" }}
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
                            <strong>Bienvenue sur EMNA !</strong>
                          </h3>
                          <h6>Connectez-vous ici</h6>
                        </div>
                        <MDBInput
                          label="Votre login"
                          name="username"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        >
                          <ErrorMessForm
                            error={errors.username}
                            touched={touched.username}
                            right
                          />
                        </MDBInput>
                        <MDBInput
                          label="Votre mot de passe"
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
                        <p className="font-small blue-text d-flex justify-content-end pb-3">
                          <Link to="/forgot/password">
                            <p className="blue-text ml-1">
                              Mot de passe oublié ?
                            </p>
                          </Link>
                        </p>
                        <div className="text-center mb-3">
                          <MDBBtn
                            type="submit"
                            gradient="blue"
                            rounded
                            className="btn-block z-depth-1a"
                          >
                            Se connecter
                          </MDBBtn>
                        </div>
                        <strong style={{ color: "red" }}>
                          {this.state.connexionMessage}
                        </strong>
                      </MDBCardBody>
                      <MDBModalFooter className="mx-5 pt-3 mb-1">
                        <p className="font-small grey-text d-flex justify-content-end">
                          Pas encore de compte chez nous ?
                          <Link to="/register">
                            <p className="blue-text ml-1">Créer un compte</p>
                          </Link>
                        </p>
                      </MDBModalFooter>
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

export default withRouter(Login);
