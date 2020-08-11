import React from 'react';
import { MDBDataTable, MDBCardHeader, MDBCardTitle, MDBContainer } from 'mdbreact';
import AxiosCenter from '../../../shared/services/AxiosCenter';

class ListeProduits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: [],
            listeProduits: [],
            loaded: false,
            data: { columns: [], rows: [] }
        }
    }

    componentDidMount() {
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
                    },
                    {
                        label: 'Quantite',
                        field: 'quantite',
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
                        quantite: element.quantite
                    };
                    rows.push(produits);
                });
                console.log(response.data)
                this.setState({
                    listeProduits: listeProduits,
                    columns: columns,
                    rows: rows,
                    data: { columns, rows },
                    loaded: true,
                });

                console.log(this.this.state.data)
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
            </MDBContainer>);
    }
}



export default ListeProduits;