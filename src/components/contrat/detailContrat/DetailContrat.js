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
        this.setState({
          contrat: contrats,
          loaded: true,
        });
      })
      .catch((err) => console.log(err));
  }

  detailContrats(props) {
    console.log(props);
    return (
       <div>coucou</div>

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
