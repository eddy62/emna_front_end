import React from "react";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import axioscenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import Loading from "../../../shared/component/Loading";

class CreerDepense extends React.Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    axioscenter.getInfosForCreationFacture(UserService.getSocietyId()).then((resarray) => {
      this.setState({
        clients: resarray[1].data,
        numfact: resarray[0].data +1,
        loaded: true
      })
    })
  }

  submit = (values) => {
    let documents = values.documents;
    values.documents = null;
    axioscenter.uploadDepense(values, documents);
  };


  render() {
    if (this.state.loaded === false) return <Loading />
    const initialValues = {
      documents: []
    };
    return (
      <div
        className="container-fluid p-5 bg-light
        d-flex flex-column justify-content-center"
      >
        {" "}
        <h1>Nouvelle Dépense</h1>
        <Formik onSubmit={this.submit} initialValues={initialValues} validationSchema={this.userSchema}>
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="bg-white border p-5 d-flex flex-column"
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                <label>Fournisseur</label>
                <input
                  type="text"
                  name="client"
                  list="clients"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.client}
                />
                <datalist id="clients">
                  {this.state.clients.map((client) => (
                    <option value={client.nom} label={client.nom} key={client.id}></option>
                  ))}
                </datalist>
                </div>
                <div className="form-group col-md-6">
                <label>Moyen de Paiement</label>
                <select
                  name="moyenDePaiement"
                  className=" form-control browser-default custom-select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.moyenDePaiement}
                >
                    <option label="Séléctionner un moyen de paiement"></option>
                    <option value="Chèque" label="Chèque"></option>
                    <option value="Espèces" label="Espèces"></option>
                    <option value="Carte Bancaire" label="Carte Bancaire"></option>
                    <option value="Virement" label="Virement"></option>
                </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="date">Date:</label>
                  <input
                    id="date"
                    type="Date"
                    name="date"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="prix">Prix Total :</label>
                  <input
                    type="number"
                    name="prixTTC"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.prixTTC}
                  />
                </div>
                </div>
              <div className="form-group">
                <label>Raison de la dépense :</label>
                <input
                  type="text"
                  name="message"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                />
              </div>
              <div className="form-group">
                <label>Séléctionner la facture (Obligatoire)</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={(ev) => {
                    values.documents = ev.target.files;
                  }}
                  multiple
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                href="/accueildepenses"
              >
                Enregistrer
              </button>
              
            </Form>
          )}
        </Formik>
        
      </div>
    );
  }
}

export default CreerDepense;
