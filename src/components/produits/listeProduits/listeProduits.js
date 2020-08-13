import React from 'react';
import { MDBDataTable, MDBCardHeader, MDBCardTitle, MDBContainer, MDBBtn } from 'mdbreact';
import AxiosCenter from '../../../shared/services/AxiosCenter';
import { Link } from "react-router-dom";

class ListeProduits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeProduits: [],
            loaded: false,
            data: {}
        }
    }

    componentDidMount() {
        AxiosCenter.getCurrentUser()
            .then((response) => {
                const idUser = response.data.id
                const roleUser = response.data.authorities

                console.log("data " + response.data)
                this.setState({
                    idUser: idUser,
                    roleUser: roleUser
                });
            })
            .catch((error) => {
                console.log(error);
            });

        AxiosCenter.getProduit()
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

    render() {
        return (
            <MDBContainer>
                <div>
                    <MDBCardHeader color="default-color">La Liste Des Produits</MDBCardHeader>
                    <MDBCardTitle tag="h1">Société Nom: </MDBCardTitle>
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.state.data}
                    />
                </div>
                <div className="justify-content-center align-items-center">
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