import React from "react";
import { Formik } from "formik";
import { BrowserRouter as Link } from "react-router-dom";
import AxiosCenter from "../../../../../../shared/services/AxiosCenter";

class CreationOperation extends React.Component {
  submit = (values) => {
    AxiosCenter.postOperation(values)
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
                <label>Date:</label>
                <input
                  type="Date"
                  name="date"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  type="text"
                  name="type"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}
                >
                  <option value="" label="Selectionner le type"></option>
                  <option value="credit" label="Crédit">
                    Crédit
                  </option>
                  <option value="debit" label="Débit">
                    Débit
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Solde</label>
                <input
                  type="text"
                  name="solde"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.solde}
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
        <Link to={"/menureleve"}>Retour</Link>
      </div>
    );
  }
}
export default CreationOperation;
