import React from "react";
import ArticleForm from "../ArticleForm";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import UserService from "../../../../../shared/services/UserService";

export default class CreateArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    createArticle = (values, actions) => {
        AxiosCenter.createArticle(values)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong>
                            Le nouvelle article {response.data.titre + " - " + response.data.intitule} a été créé.
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
        this.setState({
            redirect: !UserService.isAdmin()
        })
    }

    render() {
        if (this.state.redirect) return <Redirect to={"/articles"}/>

        return <ArticleForm title="Creation d'article"
                            article={{}}
                            onSubmit={this.createArticle}
        />
    }
}