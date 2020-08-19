import React from "react";
import "./style2.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import Loading from "../../../shared/component/Loading";
import {
  MDBCardTitle,
  MDBCardHeader,
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
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
    AxiosCenter.getSociete(idSociete)
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
        response.data.forEach((employe) => {
          let addemploye = {
            matricule: employe.matricule,
            nom: employe.nomUsage,
            prenom: employe.prenom,
            dateEmbauche: employe.dateEmbauche,
            dateSortie: employe.dateSortie,
            typeContrat: employe.typeContrat,
            clickEvent: () => {
              this.props.history.push("/detailEmploye/" + employe.id);
            },
          };
          console.log(addemploye);
          rows.push(addemploye);
          const listeEmployes = response.data;
          console.log(listeEmployes);
          this.setState({
            listeEmployes: listeEmployes,
            columns: columns,
            rows: rows,
            loaded: true,
          });
        });
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
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndSatutEmploye(
        idSociete,
        option
      );
    }
    if (option === "EMPEND") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndSatutEmploye(
        idSociete,
        option
      );
    }
    if (option === "EMPNEMB") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndSatutEmploye(
        idSociete,
        option
      );
    }
    if (option === "CDD") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndTypeContrat(
        idSociete,
        option
      );
    }
    if (option === "CDI") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndTypeContrat(
        idSociete,
        option
      );
    }
    if (option === "CDDTP") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndTypeContrat(
        idSociete,
        option
      );
    }
    if (option === "CDITP") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndTypeContrat(
        idSociete,
        option
      );
    }
    if (option === "ALTER") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndTypeContrat(
        idSociete,
        option
      );
    }
    if (option === "STAGE") {
      axios = AxiosCenter.getAllWrapperEmployesBySocietyAndTypeContrat(
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
            dateEmbauche: employe.dateEmbauche,
            dateSortie: employe.dateSortie,
            typeContrat: employe.typeContrat,
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

  render() {
    const title = "Gestion Social";
    const title1 = "Liste des Employes";
    const entreprise = this.state.societe.raisonSociale;
    if (this.state.loaded) {
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
                      <option value="EMPEMB">Employés Embauchés</option>
                      <option value="EMPEND"> Employés Sortis</option>
                      <option value="EMPNEMB"> Promesses d'Embauche</option>
                      <option value="CDD">Employés en CDD</option>
                      <option value="CDI">Employés en CDI</option>
                      <option value="CDDTP">Employés en CDD Partiel</option>
                      <option value="CDITP">Employés en CDI Partiel</option>
                      <option value="ALTER">Employés en Alternance</option>
                      <option value="STAGE">Stage</option>
                    </select>
                  </form>
                </MDBCol>
              </div>
              <br />
              <div>
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
                  <MDBTableHead
                    columns={this.state.columns}
                    color="teal lighten-5"
                  />
                  <MDBTableBody rows={this.state.rows} />
                </MDBTable>
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
    } else {
      return <Loading />;
    }
  }
}

export default ListEmployes;
