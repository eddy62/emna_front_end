import AxiosCenter from "../../../../shared/services/AxiosCenter";
import React from "react";
import Loading from "../../../../shared/component/Loading";
import ReleveConstants from "../releve_constants"
import UserService from '../../../../shared/services/UserService';
import ListReleve from "./ListReleve";

export default class ListeRelevesInvalide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      releves: [],
      societyId: UserService.getSocietyId()
    };
  }
  componentDidMount() {
    AxiosCenter.getStatementsByStateAndSociety(ReleveConstants.RELEVE_ETAT_INVALIDE, this.state.societyId)
      .then((res) => {
        const wrapperReleves = res.data;
        this.setState({ releves: wrapperReleves, loaded: true });
      })
      .catch((err) => console.log(err));
  }

  deleteReleve = (id) => {
    AxiosCenter.deleteStatement(id).then((res) => this.componentDidMount());
  };

  render() {
    if (this.state.loaded) {
      return (
        <ListReleve
          deleteReleve={this.deleteReleve}
          releves={this.state.releves}
          titre={"Relevés en cours"}
          chemin="/detailsreleveinvalide/"
          goBack={this.props.history.goBack}
          isPdf={false}
        />
      );
    } else {
      return <Loading />;
    }
  }
}
