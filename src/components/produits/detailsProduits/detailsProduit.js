
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
import DeleteProduit from "../deleteProduit/deleteProduit";
import UserService from "../../../shared/services/UserService";

class DetailsProduit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {},
            loaded: false,
            idProduit: this.props.match.params.id,
            userId: UserService.getUserId(),
        };
    }

    componentDidMount() {
        console.log("userid " + this.state.userId)
        AxiosCenter.getProduitById(this.state.idProduit, this.state.userId)
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
                                <div className="text-centre" color="teal lighten-5" >

                                    <dl >
                                        <dt >Nom</dt>
                                        <dd >{this.state.produit.nom}.</dd>
                                        <dt >Reference</dt>
                                        <dd >{this.state.produit.reference}.</dd>
                                        <dt >Tva</dt>
                                        <dd >{this.state.produit.tva + "%"}.</dd>
                                        <dt >Unité</dt>
                                        <dd >{this.state.produit.unite}.</dd>
                                        <dt >Prix</dt>
                                        <dd >{this.state.produit.prix + "€"}</dd>
                                        <dt >Description</dt>
                                        <dd >{this.state.produit.description}</dd>
                                    </dl>
                                </div>
                            </MDBCard>
                        </MDBCardBody>
                    </MDBRow>
                </div>
                <div className="row d-flex justify-content-center">
                    <Link to="/produits">
                        <MDBBtn size="sm" rounded color="teal accent-3">
                            Retour
                      </MDBBtn>
                    </Link>
                    <Link to={`/produit/update/${this.state.produit.id}`} >
                        <MDBBtn size="sm" rounded color="primary">
                            <span className="d-none d-md-inline">
                                Modifier </span>
                        </MDBBtn>
                    </Link>
                    <div className="row d-flex justify-content-center">
                        <DeleteProduit produit={this.state.produit} />
                    </div>
                </div>
            </MDBContainer>

        );
    }
}

export default DetailsProduit;