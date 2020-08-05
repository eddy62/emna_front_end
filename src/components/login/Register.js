import React from "react";
import loginImg from "../../login.svg";

export class Register extends React.Component {
  // TO DO
  render() {
    return (
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="Logo de connexion" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="email" name="email" placeholder="email" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Créer un compte
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
