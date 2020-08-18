import React from "react";
import "./style2.scss";
import { Link } from "react-router-dom";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import {
  MDBCardTitle,
  MDBCardHeader,
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBRow,
  MDBSpinner,
  MDBCol,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBSelect,
} from "mdbreact";
import { Formik, Form } from "formik";

class ListEmployes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      societe: {},
      listeEmployes: [],
    };
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
  getValueOfSelectOne = (value) => {
    console.log(value);
  };

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
                <hr></hr>
              </div>
              <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
                {title1}
              </MDBCardHeader>
              <div>
                <hr></hr>
              </div>
              <div>
                <MDBCol md="6">
                  <MDBSelect
                    getValue={(value) => this.getValueOfSelectOne(value)}
                  >
                    <MDBSelectInput selected="Tous les Employés" />
                    <MDBSelectOptions search>
                      <MDBSelectOption>Tous les Employés</MDBSelectOption>
                      <MDBSelectOption>Employés Embauchés</MDBSelectOption>
                      <MDBSelectOption>Employés sortis</MDBSelectOption>
                      <MDBSelectOption>Employés en CDD</MDBSelectOption>
                      <MDBSelectOption>Employés en CDI</MDBSelectOption>
                      <MDBSelectOption>Promesses d'Embauche</MDBSelectOption>
                    </MDBSelectOptions>
                  </MDBSelect>
                </MDBCol>
              </div>
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
      return (
        <>
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div>
            <MDBSpinner green crazy big />
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </>
      );
    }
  }
}

export default ListEmployes;
