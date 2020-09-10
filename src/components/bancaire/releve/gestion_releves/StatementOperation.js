import React, {Component} from 'react';

export default class StatementOperation extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.operation.id}</td>
                <td>{this.props.operation.date}</td>
                <td>{this.props.operation.description}</td>
                <td>{this.props.operation.solde}</td>
                <td>{this.props.operation.type}</td>
            </tr>
        );
    }
}
