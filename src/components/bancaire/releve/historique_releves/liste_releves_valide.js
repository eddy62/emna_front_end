import AxiosCenter from "../../../../shared/services/AxiosCenter";
import React from "react";
import Loading from "../../../../shared/component/Loading";
import ReleveConstants from "../releve_constants"
import UserService from '../../../../shared/services/UserService';
import ListReleve from "./ListReleve";

export default class ListeRelevesValide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            releves: [],
            societyId: UserService.getSocietyId(),
            userRole: UserService.getRole()
        };
    }
    componentDidMount() {
        console.log(this.state.societyId)
        if (this.state.userRole == "ROLE_ADMIN"){
            AxiosCenter.getStatementByState(ReleveConstants.RELEVE_ETAT_NON_ARCHIVE)
                .then((res) => {
                    const releves = res.data;
                    this.setState({ releves, loaded: true });
                })
                .catch((err) => console.log(err));
        }else {
            AxiosCenter.getStatementsByStateAndSociety(ReleveConstants.RELEVE_ETAT_NON_ARCHIVE, this.state.societyId)
                .then((res) => {
                    const releves = res.data;
                    this.setState({ releves, loaded: true });
                })
                .catch((err) => console.log(err));
        }
    }

    deleteReleve = (id) => {
        AxiosCenter.deleteReleve(id).then((res) => this.componentDidMount());
    };


    render() {
        if (this.state.loaded) {
            return (
                <ListReleve
                    deleteReleve={this.deleteReleve}
                    releves={this.state.releves}
                    titre={"Liste des relevés"}
                    chemin="/gestionReleves/rapprochementBancaire/"
                    goBack={this.props.history.goBack}
                    isPdf={false}
                />
            );
        } else {
            return <Loading />;
        }
    }
}
