import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from 'mdbreact';
import {Link} from "react-router-dom";

import ListOfInvoices from './ListOfInvoices';
import ListOfOperations from './ListOfOperations';
import ReleveDetailsCard from "../../details_releve/ReleveDetailsCard";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import Axios from "../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../shared/component/Loading";
import UserService from "../../../../../shared/services/UserService";

class BankReconciliation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            factures: {},
            releve: [],
            isCheckBoxVisible: false,
            selectedFactures: [],
            loaded: false,
        };
    }

    changeCheckboxVisible = () => {
        this.setState({isCheckBoxVisible: true});
    }

    addOrRemoveSelectedFacture = (facture, event) => {
        if (event.target.checked) {
            this.setState(
                {selectedFactures: [...this.state.selectedFactures, facture]}
            );
        } else {
            let indexRemove = this.state.selectedFactures.indexOf(facture);
            this.setState(
                {
                    selectedFactures: this.state.selectedFactures.filter((_, i) => i !== indexRemove)
                }
            )
        }
    }

    refreshBankReconciliation = () => {
        this.setState({loaded: false, selectedFactures: []})
        this.componentDidMount()
    }

    componentDidMount() {
        AxiosCenter.getStatementById(this.props.match.params.id)
            .then((res) => {
                const releve = res.data;
                this.setState({
                    releve,
                    releveId: this.props.match.params.id,
                });
                Axios.getInvoicesByStatement(this.state.releveId).then((res) => {
                    const factures = res.data;
                    this.setState({factures, loaded: true});
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        if (!this.state.loaded) return <Loading/>
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
                            <ListOfOperations idReleve={this.state.releve.id}
                                              changeCheckboxVisible={this.changeCheckboxVisible}
                                              isCheckBoxVisible={this.state.isCheckBoxVisible}
                                              selectedFactures={this.state.selectedFactures}
                                              countInvoicesSum={this.countInvoicesSum}
                                              bankRefreshComponentDidMount={this.refreshBankReconciliation}/>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard>
                            <ListOfInvoices idReleve={this.state.releve.id}
                                            isCheckBoxVisible={this.state.isCheckBoxVisible}
                                            selectedFactures={this.state.selectedFactures}
                                            addOrRemoveSelectedFacture={this.addOrRemoveSelectedFacture}
                                            factures={this.state.factures}
                            />
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                <MDBBtn color=" teal lighten-2" rounded size="sm">
                    <Link to={"/relevevalide"} className='d-flex justify-content-center'>
                        <span id="color-button">Retour</span>
                    </Link>
                </MDBBtn>

                {
                    (UserService.isAdmin() || UserService.isAccountant()) &&
                    <MDBBtn onClick={
                        () => {
                            this.changeCheckboxVisible()
                        }
                    }
                            color=" teal lighten-2" rounded size="sm">
                        <span>Rapprocher</span>
                    </MDBBtn>
                }
            </MDBContainer>
        );
    }
}

export default BankReconciliation;
