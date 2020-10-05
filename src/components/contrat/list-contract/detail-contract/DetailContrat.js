import React from "react";
import ContratService from "../../service/ContratService";
import Loading from "../../../../shared/component/Loading";
import img from "../../../../ressources/images/Contrat.PNG";
import {Link} from "react-router-dom";


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
    /*ContratService.getContratDetail(this.props.match.params.id)
      .then((resultat) => {
        const contrats = resultat.data;
        this.setState({
          contrat: contrats,
          loaded: true,
        });
      })
      .catch((err) => console.log(err));*/
    this.setState({
      loaded: true
    })
  }

  detailContrats(props) {
    console.log(props);
    return (
       <div><img src={img} alt="logo lr" />
         <Link to={"/listcontrat"}>
           <button type="button" className="btn btn-outline-mdb-color float-left">Retour</button>
         </Link>
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
