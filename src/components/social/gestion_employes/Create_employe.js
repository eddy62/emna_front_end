import React from "react";
import "./style2.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import {
  MDBContainer,
  MDBCardHeader,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCardBody,
  MDBCard,
  MDBInput,
  MDBCol,
} from "mdbreact";

class NewEmploye extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      societe: {},
      isLogginActive: true,
      valide: {
        value: "",
        valid: false,
      },
    };
  }

  // componentDidMount() {
  //   const idSociete = this.props.match.params.id;
  //   console.log(idSociete);
  //   AxiosCenter.getWrapperSociete(idSociete)
  //     .then((response) => {
  //       const societe = response.data;
  //       console.log(societe);
  //       this.setState({ societe: societe });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

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
            <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
              {title1}
            </MDBCardHeader>
            <div>
              <hr></hr>
            </div>
            {/* formulaire */}
            <form>
              <div>
                <MDBCardBody>
                  <MDBCardTitle className="text" tag="h5">
                    Identitée
                  </MDBCardTitle>
                  <MDBCard>
                    <MDBRow around between>
                      {/* ligne1 */}
                      <MDBCol md="4" className="mb-3">
                        <MDBInput
                          label="N° Matricule*"
                          outline
                          type="text"
                          id="matricule"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="6" className="mb-3">
                        <MDBInput
                          label="N° Sécurité Sociale*"
                          outline
                          type="text"
                          id="numeroSecuriteSociale"
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow between around>
                      {/* ligne2 */}
                      <MDBCol md="2" className="mb-3">
                        <div>
                          <br />
                          <select
                            className="browser-default custom-select"
                            id="civilite"
                            required
                          >
                            <option>Civilité*</option>
                            <option value="1">Monsieur</option>
                            <option value="2">Madame</option>
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput
                          label="Nom de Naissance"
                          outline
                          type="text"
                          id="nomNaissance"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput
                          label="Nom d'usage*"
                          outline
                          type="text"
                          id="nomUsage"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput
                          label="Prénom(s)"
                          outline
                          type="text"
                          id="prenom"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow between around>
                      {/* ligne3 */}
                      <MDBCol md="2" className="mb-3">
                        <MDBInput
                          outline
                          label="Date Naissance*"
                          type="date"
                          id="dateNaissance"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput
                          label="Ville de Naissance*"
                          outline
                          type="text"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput
                          label="Département"
                          outline
                          type="text"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput label="Pays*" outline type="text" required />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow between around>
                      {/* ligne4 */}
                      <MDBCol md="4" className="mb-3">
                        <div>
                          <br />
                          <select
                            className="browser-default custom-select"
                            required
                          >
                            <option>Situation Familiale*</option>
                            <option value="1">Célibataire</option>
                            <option value="2">Marié(e)</option>
                            <option value="2">Veuf(ve)</option>
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="4" className="mb-3">
                        <MDBInput
                          label="Enfant(s) à Charge*"
                          outline
                          type="number"
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCardBody>
                <MDBCardBody>
                  <MDBCardTitle className="text" tag="h5">
                    Coordonnées
                  </MDBCardTitle>
                  <MDBCard size>
                    <MDBRow around between>
                      {/* ligne1 */}
                      <MDBCol md="2" className="mb-3">
                        <MDBInput label="N°" outline type="text" />
                      </MDBCol>
                      <MDBCol md="9" className="mb-3">
                        <MDBInput
                          label="Libellé*"
                          outline
                          type="text"
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow around between>
                      {/* ligne2 */}
                      <MDBInput
                        label="Complément"
                        outline
                        type="text"
                        required
                      />
                      <MDBInput
                        label="Code Postal*"
                        outline
                        type="text"
                        required
                      />

                      <MDBInput label="Ville*" outline type="text" required />
                      <MDBInput label="Pays*" outline type="text" required />
                    </MDBRow>
                    <MDBRow around between>
                      {/* ligne3 */}
                      <MDBInput label="Email*" outline type="email" required />
                      <MDBInput label="Telephone fixe" outline type="text" />
                      <MDBInput label="Fax" outline type="text" />
                      <MDBInput
                        label="Portable*"
                        outline
                        type="text"
                        required
                      />
                    </MDBRow>
                  </MDBCard>
                </MDBCardBody>
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
                      <MDBInput
                        outline
                        label="Date Embauche*"
                        type="date"
                        required
                      />
                      <MDBInput outline label="Date Sortie" type="date" />

                      <div>
                        <br />
                        <select
                          className="browser-default custom-select"
                          required
                        >
                          <option>Type Contrat*</option>
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
                      <MDBCol md="3" className="mb-3">
                        <div>
                          <br />
                          <select
                            className="browser-default custom-select"
                            required
                          >
                            <option>Catégorie*</option>
                            <option value="1">Employé</option>
                            <option value="2">Agent de Maitrise</option>
                            <option value="3">Assimilé Cadre</option>
                            <option value="4">Stagiaire</option>
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput label="Poste*" outline type="text" required />
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <div>
                          <br />
                          <select
                            className="browser-default custom-select"
                            required
                          >
                            <option>Statut*</option>
                            <option value="1">Non Embauche</option>
                            <option value="2">Embauché</option>
                            <option value="3">Stagiaire</option>
                            <option value="4">Cadre</option>
                          </select>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow around between>
                      {/* ligne3 */}
                      <MDBCol md="3" className="mb-3">
                        <MDBInput
                          label="Salaire Horaire*"
                          outline
                          type="text"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput
                          label="Salaire Mensuel*"
                          outline
                          type="text"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="3" className="mb-3">
                        <MDBInput
                          label="Heures Mensuelles*"
                          outline
                          type="text"
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCardBody>
              </div>
              <p className="small">* Mention Obligatoire</p>
              <div>
                <hr></hr>
              </div>

              <MDBBtn color="teal accent-3" rounded size="sm" type="submit">
                Enregistrer
              </MDBBtn>

              {/* <Link to="/listEmployes"> */}
              <MDBBtn
                color="teal accent-3"
                rounded
                size="sm"
                onClick={() => {
                  this.props.history.push("/listEmployes/" + 1);
                }}
              >
                Retour
              </MDBBtn>
              {/* </Link> */}
            </form>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default NewEmploye;
