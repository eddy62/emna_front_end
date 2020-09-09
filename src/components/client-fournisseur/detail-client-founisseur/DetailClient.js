import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBRow,} from "mdbreact";
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

            <MDBContainer>
                <div>
                    <MDBCardHeader color="default-color">
                        Gestion Client Fournisseur
                    </MDBCardHeader>
                    <br></br>
                    <MDBCardTitle tag="h3">  Details: Du Client   {this.state.client.nom}</MDBCardTitle>
                    <hr></hr>

                    <div>
                        <MDBRow>
                            <MDBCardBody>
                                <MDBCard>
                                    <br />
                                    <div className="  row d-flex justify-content-center " >

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
                    <br></br>
                    <div className=" row d-flex justify-content-center ">
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
                    </div>
                </div>
            </MDBContainer>

        );
    }
}

export default Details;
