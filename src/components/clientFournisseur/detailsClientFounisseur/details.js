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
                                <MDBCardTitle tag="h1">{this.state.client.nom}</MDBCardTitle>
                                <br />
                                <MDBCardTitle tag="h3">{this.state.client.nom}</MDBCardTitle>
                            </MDBCardHeader>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
                            {this.state.client}
                        </MDBCardHeader>
                        <div>
                            <hr></hr>
                        </div>
                        <div>
                            <MDBRow>
                                <MDBCardBody>
                                    <MDBCard>
                                        <br />
                                        <div className="ligne1">
                                            <p className="elt1">
                                                <label className="gras">SIREN: N° </label>&nbsp;
                        {this.state.client.siren}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Numero : </label>&nbsp;
                        {this.state.client.numeroRue}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Rue : </label>&nbsp;
                        {this.state.client.nomRue}
                                            </p>
                                        </div>
                                        <div className="ligne2">
                                            <p className="elt1">
                                                <label className="gras">Code Postal : </label>&nbsp;
                        {this.state.client.codePostal}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Ville : </label>&nbsp;
                        {this.state.client.ville}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Pays :</label>&nbsp;
                        {this.state.client.pays}
                                            </p>
                                        </div>
                                        <div className="ligne3">

                                            <p className="elt">
                                                <label className="gras">Telephone : </label>&nbsp;
                        {this.state.client.telephone}
                                            </p>
                                            <p className="elt1">
                                                <label className="gras">Email : </label>&nbsp;
                        {this.state.client.email}
                                            </p>
                                        </div>
                                    </MDBCard>
                                </MDBCardBody>
                            </MDBRow>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {/* <MDBBtn
                            color="default"
                            rounded
                            size="sm"
                            onClick="/updateEmploye/:id"
                            color="teal accent-3"
                        >
                            Modifier
            </MDBBtn> */}


                        <Link to="/clientFournisseur">
                            <MDBBtn color="default" rounded size="sm" color="teal accent-3">
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
