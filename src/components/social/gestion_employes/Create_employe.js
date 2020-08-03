import React from "react";
import "./style2.scss";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBCardHeader,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCardBody,
  MDBCard,
  MDBInput,
  MDBSelect,
  MDBDatePicker,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";
import { Form } from "formik";

class NewEmploye extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      societe: {
        id: 1,
        civilite: "Monsieur",
        userId: 1,
        comptableId: 1,
        idInfoEntreprise: 1,
        dateDeCreation: "2020-07-27",
        description: "sociéte de de vente de logiciels Java",
        domaineDactivite: "Commerciales",
        email: "jakarta@gmail.com",
        fax: "0954389764",
        formeJuridique: "SARL",
        raisonSociale: "JAKARTA SARL",
        siren: "111 222 333",
        siret: "111 222 333 00444",
        telephone: "0954389765",
        idAdresse: 1,
        boitePostale: "1700",
        codePostal: "59000",
        nomRue: "Avenue des Developpeurs",
        numeroRue: "104",
        ville: "Lille",
        listeEmployes: [{}, {}],
      },

      valide: {
        value: "",
        valid: false,
      },
    };
  }

  render() {
    const title = "Gestion Social";
    const title1 = "Enregister un Nouvel Employé";
    const entreprise = this.state.societe.raisonSociale;
    return (
      <div className="App">
        <div className="newEmp">
          <MDBContainer>
            <div>
              <MDBCardHeader color="default-color">
                <MDBCardTitle tag="h1">{title}</MDBCardTitle>
                <br />
                <MDBCardTitle tag="h3">{entreprise}</MDBCardTitle>
              </MDBCardHeader>
            </div>
            <div>
              <hr></hr>
            </div>
            <MDBCardTitle tag="h4">{title1}</MDBCardTitle>
            <div>
              <hr></hr>
            </div>
            {/* formulaire */}
            <form>
              <div>
                <MDBRow>
                  <MDBCardBody>
                    <MDBCardTitle className="text" tag="h5">
                      Identité
                    </MDBCardTitle>
                    <MDBCard>
                      <MDBRow around between>
                        {/* ligne1 */}
                        <MDBInput label="N° Matricule" outline type="text" />
                        <MDBInput
                          label="N° Sécurité Sociale"
                          outline
                          type="text"
                        />
                      </MDBRow>
                      <MDBRow between around>
                        {/* ligne2 */}
                        <div>
                          <br />
                          <select className="browser-default custom-select">
                            <option>Civilité</option>
                            <option value="1">Monsieur</option>
                            <option value="2">Madame</option>
                          </select>
                        </div>
                        <MDBInput
                          label="Nom de Naissance"
                          outline
                          type="text"
                        />
                        <MDBInput label="Nom d'usage" outline type="text" />
                        <MDBInput label="Prénom" outline type="text" />
                      </MDBRow>
                      <MDBRow between around>
                        {/* ligne3 */}
                        <MDBInput
                          outline
                          label="Date de Naissance"
                          type="date"
                        />

                        <MDBInput
                          label="Ville de Naissance"
                          outline
                          type="text"
                        />
                        <MDBInput label="Département" outline type="text" />
                        <MDBInput label="Pays" outline type="text" />
                      </MDBRow>
                      <MDBRow between around>
                        {/* ligne4 */}
                        <div>
                          <br />
                          <select className="browser-default custom-select">
                            <option>Situation Familiale</option>
                            <option value="1">Célibataire</option>
                            <option value="2">Marié(e)</option>
                            <option value="2">Veuf(ve)</option>
                          </select>
                        </div>
                        <MDBInput
                          label="Enfant(s) à Charge"
                          outline
                          type="number"
                        />
                      </MDBRow>
                    </MDBCard>
                  </MDBCardBody>
                </MDBRow>
                <MDBRow>
                  <MDBCardBody>
                    <MDBCardTitle className="text" tag="h5">
                      Coordonnées
                    </MDBCardTitle>
                    <MDBCard size>
                      <MDBRow around between>
                        {/* ligne1 */}
                        <MDBInput label="N°" outline type="text" />
                        <MDBInput label="Libellé" outline type="text" />
                      </MDBRow>
                      <MDBRow around between>
                        {/* ligne2 */}
                        <MDBInput label="Complément" outline type="text" />
                        <MDBInput label="Code Postal" outline type="text" />

                        <MDBInput label="Ville" outline type="text" />
                        <MDBInput label="Pays" outline type="text" />
                      </MDBRow>
                      <MDBRow around between>
                        {/* ligne3 */}
                        <MDBInput label="Email" outline type="email" />
                        <MDBInput label="Telephone fixe" outline type="text" />
                        <MDBInput label="Fax" outline type="text" />
                        <MDBInput label="Portable" outline type="text" />
                      </MDBRow>
                    </MDBCard>
                  </MDBCardBody>
                </MDBRow>
                <MDBRow>
                  <MDBCardBody>
                    <MDBCardTitle className="text" tag="h5">
                      Informations Emploi
                    </MDBCardTitle>
                    <MDBCard>
                      <br />
                      <MDBRow around between>
                        {/* ligne1 */}
                        <MDBInput
                          label="Sociéte"
                          outline
                          type="text"
                          value={this.state.societe.raisonSociale}
                          disabled="false"
                        />
                        <MDBInput outline label="Date Embauche" type="date" />
                        <MDBInput outline label="Date Sortie" type="date" />

                        <div>
                          <br />
                          <select className="browser-default custom-select">
                            <option>Type Contrat</option>
                            <option value="1">CDD Tps Plein</option>
                            <option value="2">CDD Tps Partiel</option>
                            <option value="3">CDI Tps Plein</option>
                            <option value="4">CDI Tps Partiel</option>
                            <option value="4">Contrat Pro/Alternance</option>
                          </select>
                        </div>
                      </MDBRow>
                      <MDBRow around between>
                        {/* ligne2 */}
                        <div>
                          <br />
                          <select className="browser-default custom-select">
                            <option>Catégorie</option>
                            <option value="1">Employé</option>
                            <option value="2">Agent de Maitrise</option>
                            <option value="3">Assimilé Cadre</option>
                            <option value="4">Stagiaire</option>
                          </select>
                        </div>
                        <MDBInput label="Poste" outline type="text" />
                        <div>
                          <br />
                          <select className="browser-default custom-select">
                            <option>Statut</option>
                            <option value="1">Non Embauche</option>
                            <option value="2">Embauché</option>
                            <option value="3">Stagiaire</option>
                            <option value="4">Cadre</option>
                          </select>
                        </div>
                      </MDBRow>
                      <MDBRow around between>
                        {/* ligne3 */}
                        <MDBInput label="Salaire Horaire" outline type="text" />
                        <MDBInput label="Salaire Mensuel" outline type="text" />
                        <MDBInput
                          label="Heures Mensuelles"
                          outline
                          type="text"
                        />
                      </MDBRow>
                    </MDBCard>
                  </MDBCardBody>
                </MDBRow>
              </div>
              <div>
                <hr></hr>
              </div>

              <MDBBtn color="default" rounded size="sm" type="submit">
                Enregister
              </MDBBtn>

              <Link to="/listEmployes">
                <MDBBtn color="default" rounded size="sm">
                  Retour
                </MDBBtn>
              </Link>
            </form>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default NewEmploye;
