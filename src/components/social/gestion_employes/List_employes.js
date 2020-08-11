import React from "react";
import "./style2.scss";
import { Link } from "react-router-dom";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import {
  MDBCardTitle,
  MDBCardHeader,
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
} from "mdbreact";

class ListEmployes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      listeEmployes: [],
    };
  }

  componentDidMount() {
    const idSociete = this.props.match.params.id;
    console.log(idSociete);
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
            dateSortie: employe.dateFinContrat,
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

  render() {
    const title = "Gestion Social";
    const title1 = "Liste des Employes";
    const entreprise = "JAKARTA SARL";
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
                <MDBTable
                  theadColor="dark"
                  striped
                  hover
                  btn
                  scrollY
                  maxHeight="300px"
                >
                  <MDBTableHead columns={this.state.columns} />
                  <MDBTableBody rows={this.state.rows} />
                </MDBTable>
              </div>
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
    } else {
      return (
        <div>
          <MDBIcon icon="spinner" pulse size="3x" fixed />
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
  }
}

export default ListEmployes;
