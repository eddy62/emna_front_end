import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import AxiosCenter from "../../../../shared/services/AxiosCenter";
import { MDBBtn } from "mdbreact";
class CreationReleve extends React.Component {
  submit = (values) => {
    AxiosCenter.postReleve(values)
      .then(() => {
        this.props.history.push("/menureleve");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div
        className="container-fluid p-5 bg-light
        d-flex flex-column justify-content-center align-items-center"
      >
        <h1>Création d'opération</h1>
        <Formik onSubmit={this.submit} initialValues={{}}>
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="bg-white border p-5 d-flex flex-column"
            >
              <div className="form-group">
                <label>Date de début:</label>
                <input
                  type="Date"
                  name="dateDebut"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateDebut}
                />
              </div>
              <div className="form-group">
                <label>Date de Fin:</label>
                <input
                  type="Date"
                  name="dateFin"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateFin}
                />
              </div>
              <div className="form-group">
                <label>Banque</label>
                <input
                  type="text"
                  name="banque"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.banque}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Envoyer
              </button>
            </form>
          )}
        </Formik>
        <Link to={"/menureleve"}>
          <MDBBtn className="boutton" color=" teal lighten-2" rounded size="sm">
            <span id="color-button"> Retour</span>
          </MDBBtn>
        </Link>
      </div>
    );
  }
}
export default CreationReleve;
