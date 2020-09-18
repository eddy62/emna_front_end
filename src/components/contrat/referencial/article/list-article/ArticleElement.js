import React, {Component} from 'react';

export default class ArticleElement extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.article.id}</td>
                <td>{this.props.article.reference}</td>
                <td>{this.props.article.titre}</td>
                <td>{this.props.article.description}</td>
            </tr>
        );
    }
}
