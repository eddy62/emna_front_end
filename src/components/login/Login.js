import React from "react";
import loginImg from "../../login.svg";

export class Login extends React.Component {
  render() {
    return (
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="Logo de connexion" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Login</label>
              <input type="text" name="login" placeholder="login" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={console.log("On se connecte par ici !")}
            type="button"
            className="btn"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
