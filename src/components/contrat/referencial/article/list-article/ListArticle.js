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
            AxiosCenter.getAllArticles(this.props.article).then((res) => {
                const articles = res.data;
                this.setState({articles, loaded: true});
            })
                .catch((err) => console.log(err));

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
                            {this.state.articles.map((article, index) => (
                                <ArticleElement key={article.id} article={article}/>
                            ))}
                        </MDBTableBody>
                        {/*<td>
                            <RedirectionBtn
                                route ={"/createarticle"}
                                msg   = "Creer"
                                color ="default-color"
                            />
                        </td>*/}
                    </MDBTable>
                </div>
            );
        } else {
            return <Loading/>;
        }
    }
}
