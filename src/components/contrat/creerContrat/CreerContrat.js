import React from 'react';
import {Form, Formik} from 'formik';
import ContratService from "../service/ContratService";
import Loading from "../../../shared/component/Loading";
import {Link} from "react-router-dom";

export default class CreerContrat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            employes: [],
            title: "CONTRAT A DUREE INDETERMINEE A TEMPS PLEIN",
            employeId: '',
            societeId: '1',
            clauses:
                [],
        };
    }

    handleOnChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleOnChangeEmploye = (e) => {
        this.setState({
            employeId: e.target.value
        })
    }

    handleOnChangeClause = (clause) => {
        var present= false;
        var index=0;
        for(var i = 0; i < this.state.clauses.length; i++){
            present=false;
            if ( this.state.clauses[i] == clause) {
                present=true;
                index=i;
                break;
            }
        }
        if(present){
            const list = this.state.clauses;
            list.splice(index,1);
            this.setState({clauses:list});

        }else{
            this.state.clauses.push(clause);
        }



    }

    componentDidMount() {

        ContratService.getEmploye(1).then((resultat) => {
            const employes = resultat.data;
            console.log(employes)
            this.setState({employes, loaded: true, employeId: employes.employerVMList[0].employerId});
        })
            .catch((err) => console.log(err));
    }

    listerLesEmployes= (props) => {
            const Employes = props.employe.employerVMList.map((employe, index) => {
                return (

                        <option key={employe.employerId} value={employe.employerId}>{employe.employerNom} {employe.employerPrenom}</option>

                )
            })

            const Article = props.employe.articleVMList.map((article, b) =>{
                const Clause = article.listClauses.map((clause, c) => {
                    return (
                        <div key={c}>
                            <div className="form-group">
                                <div id="feedback">
                                    <div className="form-check">

                                        <input type="checkbox" className="form-check-input" name="channel[]"
                                               id={clause.clauseId} value={clause} onChange={(event)=>this.handleOnChangeClause(clause)}/>
                                        <label htmlFor={clause.clauseId}
                                               className="form-check-label">{clause.clauseDesciption}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                return (
                    <div key={b}>
                        <h5>{article.articleTitre} : {article.articleDescription}</h5>
                        {article.articleReference}
                        {Clause}
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
                            employeId: '',
                            societeId: '',
                            clauses: [],
                        }}
                        onSubmit={fields => {
                            fields.titre = this.state.title;
                            fields.employeId = this.state.employeId;
                            fields.societeId = this.state.societeId;
                            fields.clauses = this.state.clauses;
                            ContratService.postContrat(fields);
                            alert(JSON.stringify(fields, null, 4));

                        }}
                        render={({errors, status, touched}) => (
                            <Form>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1"><h5>Type de contrat :</h5></label>
                                    <select name="titre" className="browser-default custom-select form-control"
                                            id="exampleFormControlSelect1" onChange={(event)=>this.handleOnChange(event)}>
                                        <option value="CONTRAT A DUREE INDETERMINEE A TEMPS PLEIN">CONTRAT A DUREE INDETERMINEE A TEMPS PLEIN</option>
                                        <option value="CONTRAT A DUREE INDETERMINEE A TEMPS PARTIEL">CONTRAT A DUREE INDETERMINEE A TEMPS PARTIEL</option>
                                        <option value="CONTRAT A DUREE DETERMINEE A TEMPS PLEIN">CONTRAT A DUREE DETERMINEE A TEMPS PLEIN</option>
                                        <option value="CONTRAT A DUREE DETERMINEE A TEMPS PARTIEL">CONTRAT A DUREE DETERMINEE A TEMPS PARTIEL</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1"><h5>L'employé :</h5></label>

                                    <select name="employerID" className="browser-default custom-select form-control"
                                            id="exampleFormControlSelect1" onChange={(event)=>this.handleOnChangeEmploye(event)}>
                                        {Employes}
                                    </select>
                                </div>

                                        {Article}
                                <hr/><hr/><hr/>
                                <button type="button" className="btn btn-light-green float-left" >Ajouter une clause</button>
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


