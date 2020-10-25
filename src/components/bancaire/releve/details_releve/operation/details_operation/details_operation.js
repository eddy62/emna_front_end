import React, {Component} from "react";
import AxiosCenter from "../../../../../../shared/services/AxiosCenter";

import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBDataTable,} from "mdbreact";
import BackBtn from "../../../../../../shared/component/buttons/BackBtn";
import * as dateFns from "date-fns";
import {fr} from "date-fns/esm/locale";

export default class DetailsOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            operation: [],
            invoicesList: [],
            data: {}
        };
    }

    componentDidMount() {
        AxiosCenter.getInvoicesByOperationId(14).then((response) => {
            const columns = [
                {
                    label: 'Num',
                    field: 'numfact',
                    sort: 'asc',

                },
                {
                    label: 'Nom',
                    field: 'nom',
                    sort: 'asc',
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc',
                },
                {
                    label: 'Message',
                    field: 'message',
                    sort: 'asc',
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc',
                },
                {
                    label: 'Echeance',
                    field: 'dateEcheance',
                    sort: 'asc',
                },
                {
                    label: 'Paiement',
                    field: 'paiement',
                    sort: 'asc',
                },
            ];
            console.log(response.data)
            let rows = [];
            const listInvoices = response.data;
            response.data.forEach(invoices => {
                const invoice = {
                    num: invoices.numfact,
                    nom: invoices.nom,
                    type: invoices.type,
                    message: invoices.message,
                    date: dateFns.format(
                        new Date(invoices.date),
                        "dd-MM-yyyy",
                        {
                            locale: fr,
                        }
                    ),
                    dateEcheance: dateFns.format(
                        new Date(invoices.dateEcheance),
                        "dd-MM-yyyy",
                        {
                            locale: fr,
                        }
                    ),
                    paiement: invoices.moyenDePaiement,


                };
                rows.push(invoice)
                console.log(invoices.type)
            });
            this.setState({
                data: {columns, rows},
                invoicesList: listInvoices
            });
            console.log(this.state.data)
        }).catch(error => console.log(error));

        AxiosCenter.getOperationById(this.props.match.params.id)
            .then((res) => {
                const operation = res.data;
                this.setState({
                    operation,
                    operationId: this.props.match.params.id,
                    loaded: true,
                });
            })
            .catch((err) => console.log(err));
    }

    detailsOperation = (props) => {
        return (
            <div className="containerDetailsReleve">
                <MDBContainer>
                    <div>
                        <MDBCardHeader color="default-color">
                            <MDBCardTitle>
                                <h1>Détail de votre opération</h1>
                            </MDBCardTitle>
                            <br/>
                        </MDBCardHeader>
                    </div>
                    <div>
                        <hr></hr>
                    </div>
                    <div>
                        <MDBCol>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle className="MDBCardTitle">
                                        <div>
                                            <div className="row">
                                                <div className="col-3">
                                                    <p>
                                                        Opération bancaire du:
                                                        {props.detailsoperation.date}
                                                    </p>
                                                </div>
                                                <div className="col-6"></div>
                                                <div className="col-3">
                                                    <p>
                                                        {" "}
                                                        {props.detailsoperation.type} de{" "}
                                                        {props.detailsoperation.solde}€
                                                    </p>
                                                </div>
                                            </div>
                                            <p>
                                                Libellé: {props.detailsoperation.description}
                                                Rapprocher: {props.detailsoperation.rapprocher}
                                            </p>
                                        </div>
                                    </MDBCardTitle>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <br/>
                    </div>

                    <BackBtn history={this.props.history} size={"sm"}>
                        <span id="color-button"> Retour</span>
                    </BackBtn>

                </MDBContainer>
                <this.invoicesList/>
            </div>

        );
    };

    invoicesList = (props) => {
        return (<MDBContainer>
            <div>
                <MDBCardHeader color="default-color">Liste Factures </MDBCardHeader>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={this.state.data}
                />
            </div>
        </MDBContainer>)

    }

    render() {
        return <this.detailsOperation detailsoperation={this.state.operation}/>

    }
}
