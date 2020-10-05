import React from 'react';
import {MDBCardHeader, MDBCardTitle, MDBContainer, MDBDataTable} from 'mdbreact';
import AxiosCenter from '../../../shared/services/AxiosCenter';
import UserService from '../../../shared/services/UserService';
import BackBtn from "../../../shared/component/buttons/BackBtn";

class ListeProduits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            societeId: UserService.getSocietyId(),
            nomSociete: this.props.societeNom,
            listeProduits: [],
            loaded: false,
            data: {},

        }
    }

    componentDidMount() {
        if (UserService.isSociety() || UserService.isAdmin()) {
            AxiosCenter.getProduct(this.state.societeId)
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
                                this.props.history.push("/produits/detail/" + element.id);
                            },
                        };
                        rows.push(produits);
                    });
                    this.setState({
                        listeProduits: listeProduits,
                        data: {columns, rows},
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
                    <MDBCardHeader color="default-color">Gestion Produits </MDBCardHeader>
                    <MDBCardTitle tag="h1"> {this.state.nomSociete} </MDBCardTitle>
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.state.data}
                    />
                </div>
                <div className="row d-flex justify-content-center">
                    <BackBtn history={this.props.history}/>
                </div>
            </MDBContainer>);
    }
}

export default ListeProduits;