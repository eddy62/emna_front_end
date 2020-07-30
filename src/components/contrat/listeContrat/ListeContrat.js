import React from "react";
import ContratService from "../service/ContratService";
//import Axios from 'axios';
import { Link } from "react-router-dom";
import Loading from "../../../shared/component/Loading";

export default class ListeContrat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      contrats: [],
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get("id");
    console.log("coucou " + id); //123
    ContratService.getContrat(1)
      .then((resultat) => {
        const contrats = resultat.data;
        this.setState({ contrats, loaded: true });
      })
      .catch((err) => console.log(err));
  }

  listerLesContrats(props) {
    const Contrats = props.contrats.map((contrat, index) => {
      if (contrat.contratSigner) {
        return (
          <div
            key={contrat.employerId}
            className="alert alert-success"
            role="alert"
          >
            {contrat.contratTitre} - {contrat.employerNom} -{" "}
            {contrat.employerPrenom} -{" "}
            <Link to={"/detailcontrat/" + contrat.employerId}>
              {" "}
              voir le détail
            </Link>
          </div>
        );
      } else {
        return (
          <div key={contrat.employerId}>
            {console.log(contrat.contratSigner)}
            <p>
              {contrat.contratTitre} - {contrat.employerNom} -{" "}
              {contrat.employerPrenom} -{" "}
              <Link to={"/detailcontrat/" + contrat.employerId}>
                {" "}
                voir le détail
              </Link>
            </p>
          </div>
        );
      }
    });

    return (
      <div>
        <h1>Liste des Contrats</h1>
        {Contrats}
      </div>
    );
  }

  render() {
    if (this.state.loaded) {
      return <this.listerLesContrats contrats={this.state.contrats} />;
    } else {
      return <Loading />;
    }
  }
}
