import React from "react";
import "./style2.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import SupprimerEmploye from "./Supprimer_employe";
import {
  MDBCardTitle,
  MDBCardHeader,
  MDBContainer,
  MDBCard,
  MDBBtn,
  MDBRow,
  MDBCardBody,
} from "mdbreact";

class DetailEmploye extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employe: {},
    };
  }

  componentDidMount() {
    const idEmploye = this.props.match.params.id;
    console.log(idEmploye);
    AxiosCenter.getWrapperEmploye(idEmploye)
      .then((response) => {
        const employe = response.data;
        console.log(employe);
        this.setState({ employe: employe });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const title = "Gestion Social";
    const title1 = "Information Employé";
    const employe = this.state.employe;
    const entreprise = employe.raisonSociale;
    const idSociete = employe.idSociete;
    return (
      <div className="App">
        <div className="employes">
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
            <div>
              <MDBRow>
                <MDBCardBody>
                  <MDBCard>
                    <br />
                    <div className="ligne1">
                      <p className="elt1">
                        <label className="gras">Matricule :</label> &nbsp;
                        {employe.matricule}
                      </p>
                      <p className="elt2">
                        <label className="gras">
                          Numero de Sécurité Sociale :
                        </label>{" "}
                        &nbsp;
                        {employe.numeroSecuriteSociale}
                      </p>
                    </div>
                    <div className="ligne2">
                      <p className="elt1">
                        <label className="gras">Civilité : </label> &nbsp;
                        {employe.civilite}
                      </p>
                      <p className="elt">
                        <label className="gras">Nom : </label>&nbsp;
                        {employe.nomUsage}
                      </p>
                      <p className="elt">
                        <label className="gras">Prénom(s) :</label>&nbsp;{" "}
                        {employe.prenom}
                      </p>
                    </div>
                    <div className="ligne3">
                      <p className="elt1">
                        <label className="gras">Né(e) le : </label>&nbsp;
                        {employe.dateNaissance}
                      </p>
                      <p className="elt">
                        <label className="gras">à : </label>&nbsp;
                        {employe.villeNaissance}
                      </p>
                      <p className="elt">
                        <label className="gras">Département :</label>&nbsp;
                        {employe.departementNaissance}
                      </p>
                      <p className="elt">
                        <label className="gras">Pays : </label>&nbsp;
                        {employe.paysNaisance}
                      </p>
                    </div>
                    <div className="ligne4">
                      <p className="elt1">
                        <label className="gras">Situation Familiale : </label>
                        &nbsp;{employe.situationFamiliale}
                      </p>
                      <p className="elt">
                        <label className="gras">Enfants à charge :</label>
                        &nbsp;{employe.enfantsACharge}
                      </p>
                    </div>
                  </MDBCard>
                </MDBCardBody>
              </MDBRow>
              <MDBRow>
                <MDBCardBody>
                  <MDBCard>
                    <br />
                    <div className="ligne1">
                      <p className="elt1">
                        <label className="gras">Adresse : N° </label>&nbsp;
                        {employe.numeroRue}
                      </p>
                      <p className="elt">
                        <label className="gras">Libellé : </label>&nbsp;
                        {employe.nomRue}
                      </p>
                    </div>
                    <div className="ligne2">
                      <p className="elt1">
                        <label className="gras">Code Postal : </label>&nbsp;
                        {employe.codePostal}
                      </p>
                      <p className="elt">
                        <label className="gras">Ville : </label>&nbsp;
                        {employe.ville}
                      </p>
                      <p className="elt">
                        <label className="gras">Pays :</label>&nbsp;
                        {employe.pays}
                      </p>
                    </div>
                    <div className="ligne3">
                      <p className="elt1">
                        <label className="gras">Telephone Fixe : </label>&nbsp;
                        {employe.telephoneFix}
                      </p>
                      <p className="elt">
                        <label className="gras">Fax : </label>&nbsp;
                        {employe.fax}
                      </p>
                      <p className="elt">
                        <label className="gras">Mobile : </label>&nbsp;
                        {employe.telephonePortable}
                      </p>
                      <p className="elt1">
                        <label className="gras">Email : </label>&nbsp;
                        {employe.email}
                      </p>
                    </div>
                  </MDBCard>
                </MDBCardBody>
              </MDBRow>
              <MDBRow>
                <MDBCardBody>
                  <MDBCard>
                    <br />
                    <div className="ligne1">
                      <p className="elt1">
                        <label className="gras">Date Embauche : </label>&nbsp;
                        {employe.dateEmbauche}
                      </p>
                      <p className="elt">
                        <label className="gras">Type Contrat : </label>&nbsp;
                        {employe.typeContrat}
                      </p>
                      <p className="elt">
                        <label className="gras">Société : </label>&nbsp;
                        {entreprise}
                      </p>
                    </div>
                    <div className="ligne2">
                      <p className="elt1">
                        <label className="gras">Poste :</label>&nbsp;
                        {employe.statut}
                      </p>
                      <p className="elt">
                        <label className="gras">Categorie : </label>&nbsp;
                        {employe.categorie}
                      </p>
                    </div>
                    <div className="ligne3">
                      <p className="elt1">
                        <label className="gras">Salaire Mensuel : </label>&nbsp;
                        {employe.salaireBrutMensuelle}
                      </p>
                      <p className="elt">
                        <label className="gras">Salaire Horaire :</label>&nbsp;
                        {employe.salaireHoraire}
                      </p>
                      <p className="elt">
                        <label className="gras">Heures Mensuelles : </label>
                        &nbsp;
                        {employe.heuresMensuelle}
                      </p>
                    </div>
                  </MDBCard>
                </MDBCardBody>
              </MDBRow>
            </div>
            <div>
              <hr></hr>
            </div>
            <MDBRow around between>
              <MDBBtn
                rounded
                size="sm"
                color="teal accent-3"
                onClick={() => {
                  this.props.history.push("/updateEmploye/" + employe.id);
                }}
              >
                Mise à jour
              </MDBBtn>

              <SupprimerEmploye employe={employe} />

              <MDBBtn
                rounded
                size="sm"
                color="teal accent-3"
                onClick={() => {
                  this.props.history.push("/listEmployes/" + employe.societeId);
                }}
              >
                Retour
              </MDBBtn>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default DetailEmploye;
