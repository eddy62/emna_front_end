import React from "react";
import * as dateFns from "date-fns";
import { fr } from "date-fns/esm/locale";
import "./gestionEmploye.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import Loading from "../../../shared/component/Loading";
import {
  MDBBtn,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";

class ListEmployes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      societe: {},
      choice: "",
      listeEmployes: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const idSociete = this.props.match.params.id;
    console.log(idSociete);
    AxiosCenter.getSocietyById(idSociete)
      .then((response) => {
        const societe = response.data;
        console.log(societe);
        this.setState({ societe: societe });
      })
      .catch((error) => {
        console.log(error);
      });
    AxiosCenter.getAllWrapperEmployesBySociety(idSociete)
      .then((response) => {
        const liste = response.data;
        console.log(liste);
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
          {
            label: "Statut",
            field: "libelle",
            sort: "asc",
          },
        ];

        let rows = [];
        if (liste.length === 0) {
          this.setState({
            columns: columns,
            loaded: true,
          });
        } else {
          liste.forEach((employe) => {
            let addemploye = {
              matricule: employe.matricule,
              nom: employe.nomUsage,
              prenom: employe.prenom,
              dateEmbauche: dateFns.format(
                new Date(employe.dateEmbauche),
                "dd-MM-yyyy",
                {
                  locale: fr,
                }
              ),
              dateSortie: dateFns.format(
                new Date(employe.dateSortie),
                "dd-MM-yyyy",
                {
                  locale: fr,
                }
              ),
              typeContrat: employe.codeTypeContrat,
              libelle: employe.libelle,
              clickEvent: () => {
                this.props.history.push("/detailEmploye/" + employe.id);
              },
            };
            console.log(addemploye);
            rows.push(addemploye);
            this.setState({
              listeEmployes: liste,
              columns: columns,
              rows: rows,
              loaded: true,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getSelectedList = (option) => {
    console.log(option);
    const idSociete = this.state.societe.id;
    const liste = [];
    let axios = null;
    if (option === "ALL") {
      axios = AxiosCenter.getAllWrapperEmployesBySociety(idSociete);
    }
    if (option === "EMPEMB") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndStatutEmployee(
        idSociete,
        option
      );
    }
    if (option === "EMPEND") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndStatutEmployee(
        idSociete,
        option
      );
    }
    if (option === "EMPNEMB") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndStatutEmployee(
        idSociete,
        option
      );
    }
    if (option === "CDD") {
      axios = AxiosCenter.getAllWrapperEmployeesBySocietyAndTypeContract(
        idSociete,
        option
      );
    }
    if (option === "CDI") {
      axios = AxiosCenter.getAllWrapperEmployeesBySocietyAndTypeContract(
        idSociete,
        option
      );
    }
    if (option === "CDDTP") {
      axios = AxiosCenter.getAllWrapperEmployeesBySocietyAndTypeContract(
        idSociete,
        option
      );
    }
    if (option === "CDITP") {
      axios = AxiosCenter.getAllWrapperEmployeesBySocietyAndTypeContract(
        idSociete,
        option
      );
    }
    if (option === "ALTER") {
      axios = AxiosCenter.getAllWrapperEmployeesBySocietyAndTypeContract(
        idSociete,
        option
      );
    }
    if (option === "STAGE") {
      axios = AxiosCenter.getAllWrapperEmployeesBySocietyAndTypeContract(
        idSociete,
        option
      );
    }
    console.log(axios);
    axios
      .then((response) => {
        const rows = [];
        response.data.forEach((employe) => {
          rows.push({
            matricule: employe.matricule,
            nom: employe.nomUsage,
            prenom: employe.prenom,
            dateEmbauche: dateFns.format(
              new Date(employe.dateEmbauche),
              "dd-MM-yyyy",
              {
                locale: fr,
              }
            ),
            dateSortie: dateFns.format(
              new Date(employe.dateSortie),
              "dd-MM-yyyy",
              {
                locale: fr,
              }
            ),
            typeContrat: employe.intituleTypeContrat,
            libelle: employe.libelle,
            clickEvent: () => {
              this.props.history.push("/detailEmploye/" + employe.id);
            },
          });
          liste.push(employe);
        });
        this.setState({
          listeEmployes: liste,
          rows: rows,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ choice: event.target.value }, () => {
      const choix = this.state.choice;
      console.log(choix);
      this.getSelectedList(choix);
    });
  }

  maListe = (props) => {
    return (
      <MDBTable
        responsive
        theadColor="dark"
        striped
        hover
        btn
        bordered
        scrollY
        maxHeight="300px"
      >
        <MDBTableHead columns={this.state.columns} color="teal lighten-5" />
        <MDBTableBody rows={this.state.rows} />
      </MDBTable>
    );
  };

  render() {
    const title = "Gestion Social";
    const title1 = "Liste des Employes";
    const entreprise = this.state.societe.raisonSociale;
    if (!this.state.loaded) return <Loading />;
    return (
      <div className="App">
        <div className="employes">
          <MDBContainer>
            <div>
              <MDBCardHeader color="default-color">
                <MDBCardTitle tag="h1">{title}</MDBCardTitle>

                <MDBCardTitle tag="h3">{entreprise}</MDBCardTitle>
              </MDBCardHeader>
            </div>
            <div>
              <hr />
            </div>
            <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
              {title1}
            </MDBCardHeader>
            <div>
              <hr></hr>
            </div>
            <div>
              <MDBCol md="6">
                <form>
                  <select
                    className="browser-default custom-select"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <option value="ALL">Tous les Employés</option>
                    <option value="EMPEMB">Les Employés Embauchés</option>
                    <option value="EMPEND"> Les Employés Sortis</option>
                    <option value="EMPNEMB">
                      Les Employés en attente d'Embauche
                    </option>
                    <option value="CDD">Les Employés en CDD</option>
                    <option value="CDI">Les Employés en CDI</option>
                    <option value="CDDTP">Les Employés en CDD Partiel</option>
                    <option value="CDITP">Les Employés en CDI Partiel</option>
                    <option value="ALTER">Les Employés en Alternance</option>
                    <option value="STAGE">Les Employés en Stage</option>
                  </select>
                </form>
              </MDBCol>
            </div>
            <br />
            <div>
              <this.maListe maListe={this.state.listeEmployes} />
            </div>
            <div>
              <hr></hr>
            </div>
            <MDBRow around between>
              {UserService.getRole() === "ROLE_SOCIETY" ? (
                <MDBBtn
                  color="teal accent-3"
                  rounded
                  size="sm"
                  onClick={() => {
                    this.props.history.push(
                      "/newEmploye/" + this.state.societe.id
                    );
                  }}
                >
                  Enregistrer un Employe
                </MDBBtn>
              ) : null}
              <MDBBtn
                color="teal accent-3"
                rounded
                size="sm"
                onClick={() => {
                  this.props.history.push(
                    "/socialHome/" + this.state.societe.id
                  );
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

export default ListEmployes;
