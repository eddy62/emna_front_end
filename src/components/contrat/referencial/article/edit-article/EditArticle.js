import React from "react";
import {Redirect, Route} from "react-router-dom";
import ArticleForm from "../ArticleForm";
import Loading from "../../../../../shared/component/Loading";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";
import UserService from "../../../../../shared/services/UserService";

export default class EditArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            article: {},
            redirect: false
        }
    }

    editArticle = (values, actions) => {
        AxiosCenter.editArticle(values)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong>
                            L'article {response.data.titre + " - " + response.data.intitule} a été modifié.
                        </strong>
                    </div>,
                    {position: "top-right"}

                );
                this.props.history.push("/articles");
            })
            .catch(() => {
                toast.error(
                    <div className="text-center">
                        <strong>L'article existe déjà !</strong>
                        <br/>
                    </div>,
                    {position: "top-right"}
                );
            });
        actions.setSubmitting(true);
    };

    componentDidMount() {
        if (!UserService.isAdmin()) {
            this.setState({redirect: true})
            return;
        }

        AxiosCenter.getArticleById(this.props.match.params.id).then((res) => {
            const article = res.data;
            this.setState({article, loaded: true});
        })
            .catch((err) => console.log(err));
    }

    render() {
        if (this.state.redirect) return <Redirect to={"/articles"}/>

        if (!this.state.loaded) return <Loading/>
        return <ArticleForm title="Modification d'article" article={this.state.article} onSubmit={this.editArticle}/>
    }
}
