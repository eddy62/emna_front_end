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

export class Login extends React.Component {
  submit = (values) => {
    console.log(values);
    AxiosCenter.authenticate(values)
      .then((response) => {
        if (response.status === 200) {
          TokenService.connexion(response.data.id_token); //pour le token
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.log("User non reconnu");
      });
  };

  //   console.log(response);
  // })
  // .catch((error) => {
  //   //error.........
  // });

  render() {
    return (
      <div className="App">
        <Formik
          onSubmit={this.submit}
          initialValues={{ username: "", password: "" }}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBCard>
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
                          getValue={values.username}
                        />
                        <MDBInput
                          label="Votre mot de passe"
                          name="password"
                          group
                          type="password"
                          validate
                          containerClass="mb-0"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          getValue={values.password}
                        />
                        <p className="font-small blue-text d-flex justify-content-end pb-3">
                          <a href="#!" className="blue-text ml-1">
                            Mot de passe oublié ?
                          </a>
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
                      </MDBCardBody>
                      <MDBModalFooter className="mx-5 pt-3 mb-1">
                        <p className="font-small grey-text d-flex justify-content-end">
                          Pas encore de compte chez nous ?
                          <a href="#!" className="blue-text ml-1">
                            Créer un compte
                          </a>
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
