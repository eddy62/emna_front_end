import React from "react";
import "./style2.scss";
import { Link } from "react-router-dom";
import {
  MDBCardTitle,
  MDBCardHeader,
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";

class ListEmployes extends React.Component {
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
        listeEmployes: [
          {
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
            telephonePortable: "string",
            telephoneFix: "string",
            fax: "string",
            numeroSecuriteSociale: "string",
            //emploi
            categorie: "Cadre",
            statut: "Project Owner",
            dateEmbauche: "2020-07-27",
            dateFinContrat: "01-01-3000",
            heuresMensuelle: 151.66,
            salaireBrutMensuelle: 0,
            salaireHoraire: 0,
            typeContrat: "CDI",
            //adresse
            idAdresse: 1,
            numeroRue: "22",
            nomRue: "Rue des bois blancs",
            boitePostale: "",
            codePostal: "59000",
            ville: "Lille",
          },
          {
            //identité
            id: 1,
            matricule: "EMP002",
            civilite: "Monsieur",
            categorie: "Cadre",
            nomNaissance: "Potier",
            nomUsage: "Rousseau",
            prenom: "Nathan",
            dateNaissance: "2000-07-27",
            villeNaissance: "Londre",
            departementNaissance: "00",
            paysNaisance: "ANGLETERRE",
            email: "rous.nat@gmail.com",
            telephonePortable: "string",
            telephoneFix: "string",
            fax: "string",
            numeroSecuriteSociale: "string",
            //emploi
            dateEmbauche: "2020-07-27",
            dateFinContrat: "01-01-3000",
            heuresMensuelle: 151.66,
            salaireBrutMensuelle: 0,
            salaireHoraire: 0,
            statut: "string",
            typeContrat: "CDD",
            //adresse
            idAdresse: 1,
            numeroRue: "22",
            nomRue: "Rue des bois blancs",
            boitePostale: "",
            codePostal: "59000",
            ville: "Lille",
          },
          {
            //identité
            id: 2,
            matricule: "EMP003",
            civilite: "Monsieur",
            categorie: "Cadre",
            nomNaissance: "Potier",
            nomUsage: "Rousseau",
            prenom: "Nathan",
            dateNaissance: "2000-07-27",
            villeNaissance: "Londre",
            departementNaissance: "00",
            paysNaisance: "ANGLETERRE",
            email: "rous.nat@gmail.com",
            telephonePortable: "string",
            telephoneFix: "string",
            fax: "string",
            numeroSecuriteSociale: "string",
            //emploi
            dateEmbauche: "2020-07-27",
            dateFinContrat: "01-01-3000",
            heuresMensuelle: 151.66,
            salaireBrutMensuelle: 0,
            salaireHoraire: 0,
            statut: "string",
            typeContrat: "CDI",
            //adresse
            idAdresse: 1,
            numeroRue: "22",
            nomRue: "Rue des bois blancs",
            boitePostale: "",
            codePostal: "59000",
            ville: "Lille",
          },
          {
            //identité
            id: 3,
            matricule: "EMP004",
            civilite: "Monsieur",
            categorie: "Cadre",
            nomNaissance: "Potier",
            nomUsage: "Rousseau",
            prenom: "Nathan",
            dateNaissance: "2000-07-27",
            villeNaissance: "Londre",
            departementNaissance: "00",
            paysNaisance: "ANGLETERRE",
            email: "rous.nat@gmail.com",
            telephonePortable: "string",
            telephoneFix: "string",
            fax: "string",
            numeroSecuriteSociale: "string",
            //emploi
            dateEmbauche: "2020-07-27",
            dateFinContrat: "01-01-3000",
            heuresMensuelle: 151.66,
            salaireBrutMensuelle: 0,
            salaireHoraire: 0,
            statut: "string",
            typeContrat: "CDD",
            //adresse
            idAdresse: 1,
            numeroRue: "22",
            nomRue: "Rue des bois blancs",
            boitePostale: "",
            codePostal: "59000",
            ville: "Lille",
          },
          {
            //identité
            id: 4,
            matricule: "EMP005",
            civilite: "Monsieur",
            categorie: "Cadre",
            nomNaissance: "Potier",
            nomUsage: "Rousseau",
            prenom: "Nathan",
            dateNaissance: "2000-07-27",
            villeNaissance: "Londre",
            departementNaissance: "00",
            paysNaisance: "ANGLETERRE",
            email: "rous.nat@gmail.com",
            telephonePortable: "string",
            telephoneFix: "string",
            fax: "string",
            numeroSecuriteSociale: "string",
            //emploi
            dateEmbauche: "2020-07-27",
            dateFinContrat: "01-01-3000",
            heuresMensuelle: 151.66,
            salaireBrutMensuelle: 0,
            salaireHoraire: 0,
            statut: "string",
            typeContrat: "CDD",
            //adresse
            idAdresse: 1,
            numeroRue: "22",
            nomRue: "Rue des bois blancs",
            boitePostale: "",
            codePostal: "59000",
            ville: "Lille",
          },
          {
            //identité
            id: 5,
            matricule: "EMP006",
            civilite: "Monsieur",
            categorie: "Cadre",
            nomNaissance: "Potier",
            nomUsage: "Rousseau",
            prenom: "Nathan",
            dateNaissance: "2000-07-27",
            villeNaissance: "Londre",
            departementNaissance: "00",
            paysNaisance: "ANGLETERRE",
            email: "rous.nat@gmail.com",
            telephonePortable: "string",
            telephoneFix: "string",
            fax: "string",
            numeroSecuriteSociale: "string",
            //emploi
            dateEmbauche: "2020-07-27",
            dateFinContrat: "01-01-3000",
            heuresMensuelle: 151.66,
            salaireBrutMensuelle: 0,
            salaireHoraire: 0,
            statut: "string",
            typeContrat: "CDD",
            //adresse
            idAdresse: 1,
            numeroRue: "22",
            nomRue: "Rue des bois blancs",
            boitePostale: "",
            codePostal: "59000",
            ville: "Lille",
          },
        ],
      },
      isLogginActive: true,
    };
  }

  tableau = (props) => {
    const columns = [
      {
        label: "Matricule",
        field: "matricule",
        sort: "asc",
      },
      {
        label: "Nom",
        field: "nom",
        sort: "asc",
      },
      {
        label: "Prénom",
        field: "prenom",
        sort: "asc",
      },
      {
        label: "Date Embauche",
        field: "dateEmbauche",
        sort: "asc",
      },
      {
        label: "Date Sortie",
        field: "dateSortie",
        sort: "asc",
      },
      {
        label: "Type Contrat",
        field: "typeContrat",
        sort: "asc",
      },
    ];

    let rows = [];
    this.state.societe.listeEmployes.forEach((employe) => {
      let addemploye = {
        matricule: employe.matricule,
        nom: employe.nomUsage,
        prenom: employe.prenom,
        dateEmbauche: employe.dateEmbauche,
        dateSortie: employe.dateFinContrat,
        typeContrat: employe.typeContrat,
        clickEvent: () => {
          this.props.history.push("/detailEmploye/" + employe.id);
        },
      };
      rows.push(addemploye);
    });
    return (
      <MDBTable theadColor="dark" striped hover btn scrollY maxHeight="300px">
        <MDBTableHead columns={columns} />
        <MDBTableBody rows={rows} />
      </MDBTable>
    );
  };

  render() {
    const title = "Gestion Social";
    const title1 = "Liste des Employes";
    const entreprise = this.state.societe.raisonSociale;
    //const employes = this.state.societe.listeEmployes;
    //console.log(employes);
    return (
      <div className="App1">
        <div className="employes">
          <MDBContainer>
            <div>
              <MDBCardHeader color="default-color">
                <MDBCardTitle tag="h1">{title}</MDBCardTitle>

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
            <div>{this.tableau()}</div>
            <div>
              <hr></hr>
            </div>
            <Link to="/newEmploye">
              <MDBBtn color="teal accent-3" rounded size="sm">
                Enregistrer un Employe
              </MDBBtn>
            </Link>
            <Link to="/socialHome">
              <MDBBtn color="teal accent-3" rounded size="sm">
                Retour
              </MDBBtn>
            </Link>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default ListEmployes;
