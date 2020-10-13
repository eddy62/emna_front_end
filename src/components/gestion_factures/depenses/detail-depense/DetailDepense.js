import React from "react";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import {MDBCardHeader, MDBCardTitle, MDBContainer, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import Loading from "../../../../shared/component/Loading";
import BackBtn from "../../../../shared/component/buttons/BackBtn";

export default class DetailDepense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depense: {},
            loaded: false
        }
    }

    componentDidMount() {
        AxiosCenter.getDepense(this.props.match.params.id).then((res) => {
            const depense = res.data;
            this.setState({
                depense,
                loaded: true,
            });
        });
    }

    detailsDepense = (props) => {
        return (
            <div className="containerDetailsReleve">
                <MDBContainer>
                    <div>
                        <MDBCardHeader color="default-color">
                            <MDBCardTitle tag="h1" >
                                Détail de la depense
                            </MDBCardTitle>
                            <br/>
                        </MDBCardHeader>
                    </div>
                    <div>
                        <MDBTable>
                            <MDBTableHead className="MDBCardTitle">
                                <tr>
                                    <td><strong>Numéro</strong></td>
                                    <td><strong>Fournisseur</strong></td>
                                    <td><strong>Date</strong></td>
                                    <td><strong>Prix</strong></td>
                                    <td><strong>Etat Depense</strong></td>
                                    <td><strong>Moyen de paiement</strong></td>
                                    <td><strong>Raison</strong></td>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>{props.detailsdepense.numero}</td>
                                    <td>{props.detailsdepense.fournisseurNom}</td>
                                    <td>{props.detailsdepense.date}</td>
                                    <td>{props.detailsdepense.prix} €</td>
                                    <td>{props.detailsdepense.etatDepenseLibelle}</td>
                                    <td>{props.detailsdepense.moyenDePaiement}</td>
                                    <td>{props.detailsdepense.raison}</td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                        <br/>
                    </div>
                    <BackBtn history={this.props.history}/>
                </MDBContainer>
            </div>
        );
    };

    render() {
        if (!this.state.loaded) return <Loading/>
        return <this.detailsDepense detailsdepense={this.state.depense}/>;
    }
}
