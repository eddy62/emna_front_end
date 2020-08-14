import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import ContratService from "../service/ContratService";
import Loading from "../../../shared/component/Loading";
import {Link} from "react-router-dom";

export default class CreerContrat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            employes: [],
            title: "CDI TEMPS PLEIN",
            employerID: "",
        };

    }

    handleOnChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleOnChangeEmploye = (e) => {
        this.setState({
            employerID: e.target.value
        })
    }

    componentDidMount() {

        const query = new URLSearchParams(this.props.location.search);
        const id = query.get('id')
        ContratService.getEmploye(1).then((resultat) => {
            const employes = resultat.data;
            console.log(employes)
            this.setState({employes, loaded: true});
        })
            .catch((err) => console.log(err));
        console.log(this.state.loaded)
    }

    listerLesEmployes= (props) => {

            const Employes = props.employe.map((employe, index) => {
                return (
                        <option value="{employe.employerId}">{employe.employerNom} {employe.employerPrenom}</option>
                )
            })
        const Articles = props.employe.map((employe, index) => {
            return (
                <div className="form-group">
                    <h5>{employe.articleTitre} :</h5>
                    {employe.clauseReference} <input type="text" className="form-control"/>
                    <button type="button" className="btn btn-light-green">Ajouter une clause</button>
                </div>

            )
        })
            return (

                <div>
                    <h1>Nouveau contrat</h1>

                    <Formik
                        initialValues={{
                            titre: '',
                            dateCreation: '2020-07-29',
                            archive: 'false',
                            signe: 'false',
                        }}
                        onSubmit={fields => {
                            fields.titre = this.state.title;
                            ContratService.postContrat(fields);
                            alert(JSON.stringify(fields, null, 4));

                        }}
                        render={({errors, status, touched}) => (
                            <Form>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1"><h5>Type de contrat :</h5></label>
                                    <select name="titre" className="browser-default custom-select form-control"
                                            id="exampleFormControlSelect1" onChange={(event)=>this.handleOnChange(event)}>
                                        <option value="CDI TEMPS PLEIN">CDI TEMPS PLEIN</option>
                                        <option value="CDI TEMPS PARTIEL">CDI TEMPS PARTIEL</option>
                                        <option value="CDD TEMPS PLEIN">CDD TEMPS PLEIN</option>
                                        <option value="CDD TEMPS PARTIEL">CDD TEMPS PARTIEL</option>
                                    </select>
                                </div>

                                {console.log(Employes)}
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1"><h5>L'employé :</h5></label>

                                    <select name="employerID" className="browser-default custom-select form-control"
                                            id="exampleFormControlSelect1" onChange={(event)=>this.handleOnChangeEmploye(event)}>
                                        {Employes}
                                    </select>
                                </div>
                                    {Articles}
                                <hr/><hr/><hr/>
                                <button type="button" className="btn btn-light-green float-left">Ajouter un article</button>
                                <hr/><hr/><hr/><hr/><hr/>
                                <div className="clearfix">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success mr-2 float-right">Creer le contrat</button>
                                    <Link to={"/contrat/"}>
                                        <button type="button" className="btn btn-outline-success float-left">Retour</button>
                                    </Link>
                                </div>
                                </div>
                                <hr/>
                            </Form>


                        )}

                    />
                </div>

            );

    }


    render() {
        console.log(this.state.loaded)
        if (this.state.loaded) {
                return (
                    <this.listerLesEmployes employe={this.state.employes} onChange={this.handleOnChange}/>
                );

        } else {
            return (
                <Loading/>
            );
        }

    }
}


