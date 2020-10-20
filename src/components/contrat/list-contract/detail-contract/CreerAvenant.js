import React from 'react';
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading";
import {
    MDBBtn,
    MDBCardTitle,
    MDBContainer,
    MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";
import {Form} from "formik";
import {ErrorMessage, Field, Formik} from "formik";

import ComposantSelect from "./ComposantSelect";
import InputComponent from "../../../../shared/component/form/InputComponent";


const ComposantTableau = ({listeSaisieArticle}) =>
    listeSaisieArticle.map((item, index) => (
            <tr key={item.article.id}>
                <td >
                    {item.article.titre}
                </td>
                <td>
                    {item.article.intitule}
                </td>
                <td>
                    {item.article.description}
                </td>
                <td>
                    {item.saisie}
                </td>
            </tr>
        )
    )


class CreerAvenant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            articles: [],
            copyArticles: [],
            listeSaisieArticle: [],
            saisie: "",
        }
    }

    submit = (values, actions) => {
    };


    componentDidMount() {
        AxiosCenter.getAllArticles().then((result) => {
            const articlesT = result.data;
            const articles = articlesT.filter(article => article.titre !== "ARTICLE 2")
            this.setState({
                articles,
                copyArticles: articles,
                loaded: true,
            })
        }).catch((err) => console.log(err));
    }


    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));


    getArticleById = (id) => {
        return this.state.articles.filter(article => article.id === id)[0];
    }

    addListeSaisieArticle = async () => {
        let currentArticle = document.getElementById("current-article").value
        let currentSaisie = document.getElementById("current-saisie").value
        let newListe = [...this.state.listeSaisieArticle]
        let article = await this.getArticleById(parseInt(currentArticle))
        newListe.push({article: article, saisie: currentSaisie})
        this.setState({listeSaisieArticle: newListe})
    }


    removeArticlefromCopy = (id) => {
        // YOU KNOW
    }

    addArticleToCopy = () => {
        // TMTC
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        return (
            <MDBContainer>
                <div>
                    <MDBCardTitle tag="h1">Création d'avenant</MDBCardTitle>
                    <hr/>
                    <Formik onSubmit={this.submit}
                            initialValues={{
                                article: "",
                                saisieArticle: ""
                            }}
                    >
                        {({handleSubmit, isSubmitting, values}) => (

                            <Form
                                onSubmit={handleSubmit}
                                className="container-fluid p-5  lighten-5 justify-content-center align-items-center"
                            >
                                <Field
                                    name="article"
                                    id="current-article"
                                    articles={this.state.articles}
                                    component={ComposantSelect}
                                />
                                <Field
                                    name="saisieArticle"
                                    id="current-saisie"
                                    saisie={this.state.Saisie}
                                    component={InputComponent}
                                />
                                <div>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>article</th>
                                                <th>intitulé</th>
                                                <th>description</th>
                                                <th>Saisie d'article</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            <ComposantTableau listeSaisieArticle={this.state.listeSaisieArticle}/>
                                        </MDBTableBody>
                                    </MDBTable>
                                </div>

                                <MDBBtn
                                    onClick={this.addListeSaisieArticle}
                                    rounded
                                    color="primary"
                                >
                                    Ajouter
                                </MDBBtn>
                                <pre>{JSON.stringify(values, null, 4)}</pre>
                            </Form>
                        )}
                    </Formik>
                </div>
            </MDBContainer>
        )
    }
}

export default CreerAvenant;
