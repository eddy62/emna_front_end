import React from "react";
import { Link } from "react-router-dom";
import {
    MDBCardTitle,
    MDBCardHeader,
    MDBContainer,
    MDBCard,
    MDBBtn,
    MDBRow,
    MDBCardBody,
} from "mdbreact";
import AxiosCenter from "../../../shared/services/AxiosCenter";


class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {},
            loaded: false,
            idClient: this.props.match.params.id
        };
    }

    componentDidMount() {
        AxiosCenter.getClientFournisseur(this.state.idClient)
            .then((response) => {
                const client = response.data;
                console.log(" get client " + response.data)
                this.setState({
                    client: client,
                    loaded: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (
            <div className="App1">
                <div className="employes">
                    <MDBContainer>
                        <div>
                            <MDBCardHeader color="default-color">
                                <MDBCardTitle tag="h3">Gestion Client Fournisseur</MDBCardTitle>
                            </MDBCardHeader>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <MDBCardHeader tag="h5" color="teal lighten-5" text="black">
                            Details: Du Client   {this.state.client.nom}
                        </MDBCardHeader>

                        <div>
                            <MDBRow>
                                <MDBCardBody>
                                    <MDBCard>
                                        <br />
                                        <div color="teal lighten-5" >

                                            <dl>
                                                <dt>Raison sociale</dt>
                                                <dd>{this.state.client.nom}.</dd>
                                                <dt>SIREN</dt>
                                                <dd>{this.state.client.siren}.</dd>
                                                <dt>Email</dt>
                                                <dd>{this.state.client.email}.</dd>
                                                <dt>Téléphone</dt>
                                                <dd>{this.state.client.telephone}.</dd>
                                                <dt>Adresse</dt>
                                                <dd>{this.state.client.numeroRue + " "}{this.state.client.nomRue + "  "}{this.state.client.codePostal + " "}{this.state.client.ville}.</dd>
                                            </dl>
                                        </div>
                                    </MDBCard>
                                </MDBCardBody>
                            </MDBRow>
                        </div>

                        <Link to={`/clientFournisseur/modifier/${this.state.client.id}`} >
                            <MDBBtn rounded color="primary">
                                <span className="d-none d-md-inline">
                                    Modifier </span>
                            </MDBBtn>
                        </Link>


                        <Link to="/client-fournisseur">
                            <MDBBtn rounded color="teal accent-3">
                                Retour
                      </MDBBtn>
                        </Link>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default Details;
