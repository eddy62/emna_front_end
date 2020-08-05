import React from "react";
import "./style2.scss";
import { Link } from "react-router-dom";
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
      employe: {
        //identité
        id: 0,
        matricule: "EMP001",
        civilite: "Monsieur",
        nomNaissance: "Dupont",
        nomUsage: "Dupont",
        prenom: "TOTO",
        dateNaissance: "1977-02-24",
        villeNaissance: "Lyon",
        departementNaissance: "Rhone",
        paysNaisance: "France",
        email: "dupont@yahoo.com",
        telephonePortable: "06 68 88 53 30",
        telephoneFix: "09 83 62 88 97",
        fax: "09 83 62 88 97",
        numeroSecuriteSociale: "1 77 02 69 000 000 00",
        situationFamiliale: "Célibataire",
        nombreEnfants: 1,
        //emploi
        categorie: "Cadre",
        statut: "Project Owner",
        dateEmbauche: "2020-07-27",
        heuresMensuelle: 151.66,
        salaireBrutMensuelle: 2084.43,
        salaireHoraire: 14.75,
        typeContrat: "CDI",
        //adresse
        idAdresse: 1,
        numeroRue: "22",
        nomRue: "Rue des bois blancs",
        boitePostale: "",
        codePostal: "59000",
        ville: "Lille",
        pays: "FRANCE",
      },
      isLogginActive: true,
    };
  }

  componentDidMount() {
    const idEmploye = this.props.match.params.id;
    console.log(idEmploye);
  }

  render() {
    const title = "Gestion Social";
    const title1 = "Information Employé";
    const entreprise = this.state.societe.raisonSociale;
    const employe = this.state.employe;
    return (
      <div className="App1">
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
                        &nbsp;{employe.nombreEnfants}
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
            <MDBBtn
              color="default"
              rounded
              size="sm"
              onClick="/updateEmploye/:id"
              color="teal accent-3"
            >
              Mise à jour
            </MDBBtn>

            <MDBBtn color="default" rounded size="sm" color="teal accent-3">
              Supprimer
            </MDBBtn>

            <Link to="/listEmployes">
              <MDBBtn color="default" rounded size="sm" color="teal accent-3">
                Retour
              </MDBBtn>
            </Link>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default DetailEmploye;
