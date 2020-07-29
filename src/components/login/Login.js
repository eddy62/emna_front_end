import React from "react";
import loginImg from "../../login.svg";
import { Formik } from "formik";
import AxiosCenter from "../../shared/services/AxiosCenter";
import { withRouter } from "react-router-dom";
import TokenService from "../../shared/services/TokenService";

export class Login extends React.Component {
  submit = (values) => {
    AxiosCenter.authenticate(values)
      .then((response) => {
        if (response.status === 200) {
          TokenService.connexion(response.data); //pour le token
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
      <Formik
        onSubmit={this.submit}
        initialValues={{ username: "", password: "" }}
      >
        {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="base-container">
              <div className="header">Login</div>
              <div className="content">
                <div className="image">
                  <img src={loginImg} alt="Logo de connexion" />
                </div>
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Login</label>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                </div>
              </div>
              <div className="footer">
                <button type="submit" className="btn">
                  Se connecter
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

export default withRouter(Login);
