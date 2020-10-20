import React from 'react';
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCollapse,
    MDBCollapseHeader,
    MDBContainer,
    MDBInput, MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";
import {Form, withFormik} from "formik";
import {ErrorMessage, Field, Formik} from "formik";

import ComposantSelect from "./ComposantSelect";
import InputComponent from "../../../../shared/component/form/InputComponent";


const ComposantTableau = ({listeSaisieArticle}) =>
    listeSaisieArticle.map((item,index) => (
        <tr>
            <td>
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
                loaded: true,
            })
        }).catch((err) => console.log(err));
}


    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));


    getArticleById= (id) => {
        // return this.state.articles.find((article) =>
        //     article.id = id
        // )
        let newListeArticles = [...this.state.articles]
        return newListeArticles.find((article) =>
            article.id = id
        )
    }
    addListeSaisieArticle = () => {
        let currentArticle = document.getElementById("current-article")
        let currentSaisie = document.getElementById("current-saisie")
        let newListe = [...this.state.listeSaisieArticle]
        let article = this.getArticleById(currentArticle.value)
        console.log(this.state.articles)
        newListe.push({article:article,saisie: currentSaisie.value})
        this.setState({listeSaisieArticle: newListe}
        )
    }

    render() {
        if (!this.state.loaded) return <Loading />
        return (
            <MDBContainer>
                <div>
                    <MDBCardTitle tag="h1">Création d'avenant</MDBCardTitle>
                    <hr/>
            <Formik initialValues={{
                article: "",
                saisieArticle: "",
            }
            } onSubmit={this.submit}>
                {({handleSubmit, isSubmitting,values}) => (

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
                               }
                               }
                       </MDBTable>
                   </div>

                   <MDBBtn
                        onClick={
                                this.addListeSaisieArticle
                            }
                        rounded type="submit"
                        color="primary">
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
