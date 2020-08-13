import React from "react";
import ContratService from "../service/ContratService";
import Loading from "../../../shared/component/Loading";

export default class DetailContrat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      contrat: [],
      clauseEtArticle: [],
    };
  }

  componentDidMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // const id = query.get('id')
    console.log("ID URL");
    console.log(this.props.match.params.id);
    ContratService.getContratDetail(this.props.match.params.id)
      .then((resultat) => {
        const contrats = resultat.data;
        console.log(contrats.clauseEtArticleList[0].titreArticle);
        this.setState({
          contrat: contrats,
          clauseEtArticle: contrats.clauseEtArticleList,
          loaded: true,
        });
      })
      .catch((err) => console.log(err));
  }

  detailContrats(props) {
    console.log(props);
    return (
      <div>


        <p>Crée le : {props.contrats.contratDateCreation}</p>
        <h1>{props.contrats.contratTitre}</h1>
        <p>
          {props.contrats.infoSocieteRaisonSociale} <br />
          {props.contrats.infoSocieteTelephone} <br />
          {props.contrats.infoSocieterFax} <br />
          {props.contrats.infoSocieterFormeJuridique} <br />
          {props.contrats.infoSocieterSiren} <br />
          {props.contrats.infoSocieterSiret} <br />
          {props.contrats.infoSocieterEmail} <br />
          {props.contrats.infoSocieterAdresseBoitePostale} <br />
          {props.contrats.infoSocieterAdresseCodePostale} <br />
          {props.contrats.infoSocieterAdresseNomRue} <br />
          {props.contrats.infoSocieterAdresseNumeroRue} <br />
          {props.contrats.infoSocieterAdresseVille} <br />
        </p>
        <p>
          {props.contrats.employerMatricule} <br />
          {props.contrats.employerCivilite} <br />
          {props.contrats.employerNomNaissance} <br />
          {props.contrats.employerNomUsage} <br />
          {props.contrats.employerPrenom} <br />
          {props.contrats.employerDateNaissance} <br />
          {props.contrats.employerVilleNaissance} <br />
          {props.contrats.employerDepartementNaissance} <br />
          {props.contrats.employerPaysNaissance} <br />
          {props.contrats.employerNumeroSecuriteSociale} <br />
          {props.contrats.employerEmail} <br />
          {props.contrats.employerTelephonFixe} <br />
          {props.contrats.employerTelephonePortable} <br />
          {props.contrats.employerFax} <br />
          {props.contrats.employerAdresseBoitePostale} <br />
          {props.contrats.employerAdresseCodePostal} <br />
          {props.contrats.employerAdresseNomRue} <br />
          {props.contrats.employerAdresseNumeroRue} <br />
          {props.contrats.employerAdresseVille} <br />
        </p>
          {props.contrats.clauseEtArticleList.map((c, index) => (
              <p key={index}>{c.titreArticle} : <br />{c.descriptionClause}</p>
          ))}
      </div>
    );
  }

  render() {
    if (this.state.loaded) {
      return (
        <this.detailContrats
          contrats={this.state.contrat}
          clausesEtArticles={this.state.clauseEtArticle}
        />
      );
    } else {
      return <Loading />;
    }
  }
}
