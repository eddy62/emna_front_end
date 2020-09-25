import AxiosCenter from "../../../../shared/services/AxiosCenter";
import React from "react";
import Loading from "../../../../shared/component/Loading";
import ReleveConstants from "../releve_constants"
import UserService from '../../../../shared/services/UserService';
import ListReleve from "./ListReleve";

export default class ListeRelevesNonArchive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      societyId: UserService.getSocietyId(),
      releves: [],
    };
  }

  componentDidMount() {
    AxiosCenter.getStatementsByStateAndSociety(ReleveConstants.RELEVE_ETAT_NON_ARCHIVE, this.state.societyId)
      .then((res) => {
        const releves = res.data;
        this.setState({ releves, loaded: true });
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.loaded) {
      return (
          <ListReleve
              deleteReleve={this.deleteReleve}
              releves={this.state.releves}
              titre="Rapprochement Bancaire"
              chemin="/detailsreleve/"
              goBack={this.props.history.goBack}
          />
      );
    } else {
      return <Loading />;
    }
  }
}
