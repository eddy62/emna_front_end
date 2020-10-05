import React, {Component} from 'react';
import RedirectionBtn from "../../../../../shared/component/buttons/RedirectionBtn";
import UserService from "../../../../../shared/services/UserService";
import DeletionConfirmationModal from "../../../../../shared/component/DeletionConfirmationModal";

export default class ArticleElement extends Component {


    render() {
        return (
            <tr>
                <td>{this.props.article.titre}</td>
                <td>{this.props.article.intitule}</td>
                <td>{this.props.article.description}</td>
                {UserService.isAdmin() &&
                    <td>
                        <RedirectionBtn
                            to={"/articles/edit/" + this.props.article.id}
                            txt="Modifier"
                            color="default-color"
                        />
                    </td>
                }
                {UserService.isAdmin() &&
                    <td>
                        <DeletionConfirmationModal name={this.props.article.titre} deleteConfirm={() => {
                           this.props.deleteArticle(this.props.article.id);
                        }}/>
                    </td>
                }
            </tr>
        );
    }
}
