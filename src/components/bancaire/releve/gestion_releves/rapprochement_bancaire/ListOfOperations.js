import React, {Component} from 'react';
import {MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../shared/component/Loading";
import StatementOperation from "../StatementOperation";
import { withRouter } from "react-router-dom";


class ListOfOperations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operations: {},
            loaded: false,
            url : null
        }

    }

    componentDidMount() {
        AxiosCenter.getOperationsByReleveId(this.props.idReleve).then((res) => {
            const operations = res.data;
            this.setState({operations, loaded: true});
        });
    }

    goToList = (id) => {
    this.props.history.push(`/detailsoperation/${id}`);
    }

    render() {
        if (!this.state.loaded) return <Loading/>

        return (
            <div>
                <MDBCardTitle className="card-title text-center py-2">
                    Liste des opérations
                </MDBCardTitle>
                <MDBTable hover scrollY maxHeight="500px">
                    <MDBTableHead>
                        <tr>
                            <td><strong>Id</strong></td>
                            <td><strong>Date</strong></td>
                            <td><strong>Description</strong></td>
                            <td><strong>Solde</strong></td>
                            <td><strong>Type</strong></td>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.operations.map((operation, index) => (
                            <StatementOperation key={operation.id} operation={operation}
                                                onClick={() => this.goToList(operation.id)}
                                                isCheckBoxVisible={this.props.isCheckBoxVisible}
                                                changeCheckboxVisible={this.props.changeCheckboxVisible}
                                                selectedFactures={this.props.selectedFactures}
                                                bankRefreshComponentDidMount={this.props.bankRefreshComponentDidMount}/>

                        ))}
                    </MDBTableBody>
                </MDBTable>
            </div>
        );

    }
}

export default withRouter(ListOfOperations)

