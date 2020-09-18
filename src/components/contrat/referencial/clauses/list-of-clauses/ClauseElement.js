import React, {Component} from 'react';

export default class ClauseElement extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.clause.id}</td>
                <td>{this.props.clause.reference}</td>
                <td>{this.props.clause.description}</td>
            </tr>
        );
    }
}
