import React from "react";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import {MDBCardHeader, MDBCardTitle, MDBContainer, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {Link} from "react-router-dom";
import Loading from "../../../shared/component/Loading";

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
            console.log("data: " ,res.data)
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
                            <MDBCardTitle>
                                <h1>Détail de la depense</h1>
                            </MDBCardTitle>
                            <br/>
                        </MDBCardHeader>
                    </div>
                    <div>
                        <hr></hr>
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
                                    {/*<td><strong>Liste documents</strong></td>*/}
                                </tr>
                            </MDBTableHead>
                            {console.log("depense: " + props.detailsdepense)}
                            <MDBTableBody>
                                <tr>
                                    <td>{props.detailsdepense.numero}</td>
                                    <td>{props.detailsdepense.nomFournisseur}</td>
                                    <td>{props.detailsdepense.date}</td>
                                    <td>{props.detailsdepense.prix} €</td>
                                    <td>{props.detailsdepense.etatDepense}</td>
                                    <td>{props.detailsdepense.moyenDePaiement}</td>
                                    <td>{props.detailsdepense.raison}</td>
                                    {/*<td>{props.detailsdepense.listeDocuments}</td>*/}
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                        <br/>
                    </div>
                    <Link
                        className="boutton"
                        color=" teal lighten-2"
                        rounded
                        size="sm"
                        onClick={() => props.history.goBack}
                    >
                        <span id="color-button"> Retour</span>
                    </Link>
                </MDBContainer>
            </div>
        );
    };

    render() {
        if (!this.state.loaded) return <Loading/>
        return <this.detailsDepense detailsdepense={this.state.depense}/>;
    }
}
