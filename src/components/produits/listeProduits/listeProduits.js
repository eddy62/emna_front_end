import React from 'react';
import { MDBDataTable, MDBCardHeader, MDBCardTitle, MDBContainer, MDBBtn } from 'mdbreact';
import AxiosCenter from '../../../shared/services/AxiosCenter';
import { Link } from "react-router-dom";
import UserService from '../../../shared/services/UserService';
class ListeProduits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            societeId: UserService.getSocietyId(),
            roleUser: UserService.getRole(),
            nomSociete: this.props.societeNom,
            listeProduits: [],
            loaded: false,
            data: {},

        }
    }

    componentDidMount() {
        if (this.state.roleUser === "ROLE_SOCIETY") {
            AxiosCenter.getProduit(this.state.societeId)
                .then((response) => {
                    const columns = [
                        {
                            label: 'Nom',
                            field: 'nom',
                            sort: 'asc',
                        },
                        {
                            label: 'Reference',
                            field: 'reference',
                            sort: 'asc',
                        },
                        {
                            label: 'Tva',
                            field: 'tva',
                            sort: 'asc',
                        },
                        {
                            label: 'Prix',
                            field: 'prix',
                            sort: 'asc',
                        },
                        {
                            label: 'Unite',
                            field: 'unite',
                            sort: 'asc',
                        }
                    ];

                    let rows = [];
                    const listeProduits = response.data;
                    response.data.forEach(element => {
                        const produits = {
                            nom: element.nom,
                            reference: element.reference,
                            tva: element.tva,
                            prix: element.prix,
                            unite: element.unite,
                            // quantite: element.quantite,
                            clickEvent: () => {
                                this.props.history.push("/produit/detail/" + element.id);
                            },
                        };
                        rows.push(produits);
                    });
                    this.setState({
                        listeProduits: listeProduits,
                        data: { columns, rows },
                        loaded: true,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <MDBContainer>
                <div>
                    <MDBCardHeader color="default-color">La Liste Des Produits</MDBCardHeader>
                    <MDBCardTitle tag="h1"> {this.state.nomSociete} </MDBCardTitle>
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.state.data}
                    />
                </div>
                <div className="row d-flex justify-content-center">
                    <Link to="/client-fournisseur">
                        <MDBBtn rounded color="teal accent-3">
                            Retour
                      </MDBBtn>
                    </Link>
                </div>
            </MDBContainer>);
    }
}



export default ListeProduits;