import React, {Component} from 'react';
import {MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../shared/component/Loading";
import ArticleElement from "./ArticleElement";
import RedirectionBtn from "../../../../../shared/component/RedirectionBtn";
import UserService from "../../../../../shared/services/UserService";

export default class ListOfArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleUser: UserService.getRole(),
            articles: {},
            loaded: false,
        }
    }

    componentDidMount() {
        AxiosCenter.getAllArticles().then((res) => {
            const articles = res.data;
            this.setState({articles, loaded: true});
        })
            .catch((err) => console.log(err));

    }

    deleteConfirm = (id) => {
        this.deleteArticle(id);
    }

    deleteArticle = (id) => {
        AxiosCenter.deleteArticle(id)
            .then(() => this.componentDidMount());
    }

    render() {
        if (this.state.loaded) {
            return (
                <div>
                    <MDBCardTitle className="card-title text-center py-2">
                        Liste des articles
                    </MDBCardTitle>
                    <MDBTable striped scrollY maxHeight="500px">
                        <MDBTableHead>
                            <tr>
                                <td><strong>Titre</strong></td>
                                <td><strong>Intitulé</strong></td>
                                <td><strong>Description</strong></td>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                this.state.articles.map((article) => (
                                    <ArticleElement key={article.id} article={article}
                                                    deleteConfirm={this.deleteConfirm}/>
                                ))
                            }
                        </MDBTableBody>
                    </MDBTable>
                    {
                        UserService.isAdmin() &&
                        <td>
                            <RedirectionBtn
                                route={"/articles/create"}
                                msg="Ajouter un nouvel article"
                                color="default-color"
                            />
                        </td>
                    }
                </div>
            );
        } else {
            return <Loading/>;
        }
    }
}
