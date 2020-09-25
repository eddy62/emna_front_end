import React, {Component} from 'react';
import {MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import Axios from "../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../shared/component/Loading";
import StatementOperation from "../StatementOperation";
import {Link} from "react-router-dom";

export default class ListOfOperations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            operations: {},
            loaded: false,
        }
    }

    componentDidMount() {
        Axios.getOperationsByReleveId(this.props.idReleve).then((res) => {
            const operations = res.data;
            this.setState({operations, loaded: true});
        });
    }

    render() {
        if (!this.state.loaded) return <Loading/>

        return (
            <div>
                <MDBCardTitle className="card-title text-center py-2">
                    Liste des opérations
                </MDBCardTitle>
                <MDBTable striped scrollY maxHeight="500px">
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
