import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from 'mdbreact';
import {Link} from "react-router-dom";

import ListOfInvoices from './ListOfInvoices';
import ListOfOperations from './ListOfOperations';
import ReleveDetailsCard from "../../details_releve/ReleveDetailsCard";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../shared/component/Loading";

class BankReconciliation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            releve: [],
        };
    }

    componentDidMount() {
        AxiosCenter.getStatementById(this.props.match.params.id)
            .then((res) => {
                const releve = res.data;
                this.setState({
                    releve,
                    releveId: this.props.match.params.id,
                    loaded: true,
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        if (!this.state.loaded) return <Loading />
        return (
            <MDBContainer>
                <MDBCardHeader color="default-color">
                    <MDBCardTitle tag="h1">Rapprochement bancaire</MDBCardTitle>
                    <br/>
                </MDBCardHeader>
                <ReleveDetailsCard releve={this.state.releve}/>
                <MDBRow className='py-5'>
                    <MDBCol>
                        <MDBCard>
                            <ListOfOperations/>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard>
                            <ListOfInvoices idReleve={this.state.releve.id}/>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <Link to={"/menurelevenon"} className='d-flex justify-content-center'>
                    <MDBBtn color=" teal lighten-2" rounded size="sm">
                        <span id="color-button">Retour</span>
                    </MDBBtn>
                </Link>
            </MDBContainer>
        );
    }
}

export default BankReconciliation;