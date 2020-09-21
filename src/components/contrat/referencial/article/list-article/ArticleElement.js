import React, {Component} from 'react';
import RedirectionBtn from "../../../../../shared/component/RedirectionBtn";
import {MDBTable} from "mdbreact";
import UserService from "../../../../../shared/services/UserService";
import DeletionConfirmationModal from "../../../../../shared/component/DeletionConfirmationModal";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";

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
                            route={"/articles/edit/" + this.props.article.id}
                            msg="Modifier"
                            color="default-color"
                        />
                    </td>
                }
                {UserService.isAdmin() &&
                    <td>
                        <DeletionConfirmationModal name={this.props.article.titre} deleteConfirm={() => {
                            AxiosCenter.deleteArticle(this.props.article.id);
                        }}/>
                    </td>
                }
            </tr>
        );
    }
}
