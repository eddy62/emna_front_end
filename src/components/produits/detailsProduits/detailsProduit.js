
import React, { Component } from "react";
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

class DetailsProduit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {},
            loaded: false,
            idProduit: this.props.match.params.id
        };
    }

    componentDidMount() {
        AxiosCenter.getProduitById(this.state.idProduit)
            .then((response) => {
                const produit = response.data;
                this.setState({
                    produit: produit,
                    loaded: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (

            <div className="">
                <MDBContainer>
                    <div>
                        <MDBCardHeader color="default-color">
                            <MDBCardTitle tag="h3">Gestion Produit</MDBCardTitle>
                        </MDBCardHeader>
                    </div>
                    <div>
                        <hr></hr>
                    </div>
                    <MDBCardHeader tag="h5" color="teal lighten-5" text="black">
                        Details Du Produit:   {this.state.produit.nom}
                    </MDBCardHeader>

                    <div>
                        <MDBRow>
                            <MDBCardBody>
                                <MDBCard>
                                    <br />
                                    <div color="teal lighten-5" >

                                        <dl>
                                            <dt>Nom</dt>
                                            <dd>{this.state.produit.nom}.</dd>
                                            <dt>Reference</dt>
                                            <dd>{this.state.produit.reference}.</dd>
                                            <dt>Tva</dt>
                                            <dd>{this.state.produit.tva + "%"}.</dd>
                                            <dt>Unité</dt>
                                            <dd>{this.state.produit.unite}.</dd>
                                            <dt>Prix</dt>
                                            <dd>{this.state.produit.prix + "€"}</dd>
                                            <dt>Description</dt>
                                            <dd>{this.state.produit.description}</dd>
                                        </dl>
                                    </div>
                                </MDBCard>
                            </MDBCardBody>
                        </MDBRow>
                    </div>
                    <div className="justify-content-center align-items-center">
                        <Link to={`/produits/modifier/${this.state.produit.id}`} >
                            <MDBBtn rounded color="primary">
                                <span className="d-none d-md-inline">
                                    Modifier </span>
                            </MDBBtn>
                        </Link>


                        <Link to="/produits">
                            <MDBBtn rounded color="teal accent-3">
                                Retour
                      </MDBBtn>
                        </Link>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default DetailsProduit;