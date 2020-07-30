import React from "react";
import { Formik } from "formik";

class ModifierOperation extends React.Component {
  submit = (values) => {
    this.props.modifierOperation(values);
  };

  render() {
    return (
      <div
        className="container-fluid p-5 bg-light
        d-flex flex-column justify-content-center align-items-center"
      >
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
                <label>Id:</label>
                <input
                  type="text"
                  name="id"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.id}
                />
              </div>
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
                  <option value="credit" label="Crédit"></option>
                  <option value="debit" label="Débit"></option>
                </select>
              </div>
              <div className="form-group">
                <label>Rapprocher</label>
                <input
                  type="text"
                  name="rapprocher"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rapprocher}
                />
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
      </div>
    );
  }
}
export default ModifierOperation;
