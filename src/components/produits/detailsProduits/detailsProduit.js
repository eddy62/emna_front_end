
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
import Style from "../../clientFournisseur/ClientFournisseur.module.css"
import StyleProduit from "../styleProduit.scss"

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

            <div className={StyleProduit.appProduit}>
                <div className={StyleProduit.DetailsProduit}>
                    <MDBContainer>
                        <div>
                            <MDBCardHeader color="default-color">
                                <MDBCardTitle tag="h3">Gestion Produit</MDBCardTitle>
                            </MDBCardHeader>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <MDBCardHeader tag="h5" color="light" text="black">
                            Details Du Produit:   {this.state.produit.nom}
                        </MDBCardHeader>

                        <div>
                            <MDBRow>
                                <MDBCardBody>
                                    <MDBCard>
                                        <br />
                                        <div color="teal lighten-5" >

                                            <dl className={Style.dl}>
                                                <dt className={Style.dt}>Nom</dt>
                                                <dd className={Style.dd}>{this.state.produit.nom}.</dd>
                                                <dt className={Style.dt}>Reference</dt>
                                                <dd className={Style.dd}>{this.state.produit.reference}.</dd>
                                                <dt className={Style.dt}>Tva</dt>
                                                <dd className={Style.dd}>{this.state.produit.tva + "%"}.</dd>
                                                <dt className={Style.dt}>Unité</dt>
                                                <dd className={Style.dd}>{this.state.produit.unite}.</dd>
                                                <dt className={Style.dt}>Prix</dt>
                                                <dd className={Style.dd}>{this.state.produit.prix + "€"}</dd>
                                                <dt className={Style.dt}>Description</dt>
                                                <dd className={Style.dd}>{this.state.produit.description}</dd>
                                            </dl>
                                        </div>
                                    </MDBCard>
                                </MDBCardBody>
                            </MDBRow>
                        </div>

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
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default DetailsProduit;