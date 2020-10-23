import React from "react";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import Loading from "../../../shared/component/Loading";

export default class AmendmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amendments: [],
            loaded: false,
        }
        this.amendmentList = this.amendmentList.bind(this);
    }

    componentDidMount() {
        AxiosCenter.getAllAmendmentByContratId(this.props.match.params.id).then((result) => {
            this.setState({amendments: result.data, loaded: true})
        })
    }

    amendmentList() {
        if(this.state.amendments.length > 0 && !null) {
            const amendments = this.state.amendments.map((amendment) => (
                    <div key={amendment.id} className="alert alert-success" role="alert">
                        <h5>{amendment.id} - {amendment.reference} : {amendment.dateDeCreation} - {(amendment.signe === true)? "Signé le :":"En attente de signature"} {amendment.dateDeSignature}</h5>
                    </div>
                )
            )
            return (
                <div>
                    {amendments}
                </div>
            );
        }
        return(<div className="alert alert-danger" role="alert"><h5>Il semblerait qu'aucun avenant ne soit rattaché à ce contrat</h5></div>)

    }

    render() {
        if (!this.state.loaded) {
            return <Loading/>
        }
        return <this.amendmentList/>
    }
}