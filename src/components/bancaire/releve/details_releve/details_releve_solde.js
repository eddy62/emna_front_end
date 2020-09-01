import React from "react";
import AxiosCenter from "../../../../shared/services/AxiosCenter";

export class ReleveSolde extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            solde: 0
        };
    }
    componentDidMount() {
        AxiosCenter.getReleveSoldeById(this.props.releveId)
        .then((res) => {
            const solde = res.data;
            if (solde == null) solde = "N/A";
            this.setState({
                solde,
                loaded: true,
            });
        })
        .catch((err) => console.log(err));
    }

    render () {
        return (
             <p>
                Solde du compte pour ce mois :
                { " " + this.state.solde + " €" }
            </p>
        );
    }
}

export default ReleveSolde;