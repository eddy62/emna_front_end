import React, {Component} from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBRow,} from "mdbreact";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import DeleteProduit from "../delete-produit/DeleteProduit";
import BackBtn from "../../../shared/component/buttons/BackBtn";
import RedirectionBtn from "../../../shared/component/buttons/RedirectionBtn";


class DetailsProduit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {},
            loaded: false,
        };
    }

    componentDidMount() {
        AxiosCenter.getProductById(this.props.match.params.id)
            .then((response) => {
                const produit = response.data;
                this.setState({
                    produit,
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
                    <MDBCardHeader color="default-color">Gestion Produits</MDBCardHeader>
                    <br/>
                    <MDBCardTitle tag="h3"> Details du produit : {this.state.produit.nom}</MDBCardTitle>
                    <hr/>

                    <div>
                        <MDBRow>
                            <MDBCardBody>
                                <MDBCard>
                                    <br/>
                                    <div className="  row d-flex justify-content-center ">

                                        <dl>
                                            <dt>Nom</dt>
                                            <dd>{this.state.produit.nom}.</dd>
                                            <dt>Reference</dt>
                                            <dd>{this.state.produit.reference}.</dd>
                                            <dt>Tva</dt>
                                            <dd>{this.state.produit.tva + "%"}.</dd>
                                            <dt>Prix</dt>
                                            <dd>{this.state.produit.prix + "€"}</dd>
                                            <dt>Unité</dt>
                                            <dd>{this.state.produit.unite}.</dd>
                                            <dt>Description</dt>
                                            <dd>{this.state.produit.description}</dd>
                                        </dl>
                                    </div>
                                </MDBCard>
                            </MDBCardBody>
                        </MDBRow>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <BackBtn history={this.props.history}/>

                        <RedirectionBtn to={`/produits/update/${this.state.produit.id}`}
                                        rounded
                                        color="primary"
                                        txt="Modifier"
                        />
                        <div className="row d-flex justify-content-center">
                            <DeleteProduit produit={this.state.produit}/>
                        </div>
                    </div>
                </div>

            </MDBContainer>

        );
    }
}

export default DetailsProduit;