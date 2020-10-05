import React from 'react';
import ContratService from '../service/ContratService';
import {Link} from 'react-router-dom';
import Loading from "../../../shared/component/Loading";
import AxiosCenter from "../../../shared/services/AxiosCenter";

export default class ListeContrat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            contrats: [],
        };
    }

    componentDidMount(){
        AxiosCenter.getAllContrats().then((result) => {
            this.setState({
                contrats: result.data,
                loaded:true
            })
        })
    }

    listerLesContrats(props) {
        const Contrats = props.contrats.map((contrat, index)=>{
            console.log(contrat)
            if(contrat.signe){
                return(
                    <div key={contrat.employeId} className="alert alert-success" role="alert">
                      <h5>  {contrat.titre} - {contrat.employerNom} {contrat.employerPrenom}
                       <button type="button" className="btn btn--danger">Supprimer</button>
                        <Link to={"/detailcontrat/"+contrat.employeId}>
                            <button type="button" className="btn btn-outline-success text-right">Voir le contrat</button>
                        </Link>
                          </h5>
                    </div>
                )
            }else{
                return(
                    <div key={index} className="alert alert-danger" >
                       <h5> {contrat.titre} - {contrat.employerNom} {contrat.employerPrenom}  - En attente d'une signature
                           <button type="button" className="btn btn--danger text-right">Supprimer</button>
                        <Link to={"/detailcontrat/"+contrat.employeId}>
                              <button type="button" className="btn btn-outline-danger text-right">Voir le contrat</button>
                        </Link>

                               <div className="btn btn-outline-secondary btn-rounded waves-effect text-right  file-field medium">
                                   <span>Upload</span>
                                   <input type="file"/>
                               </div>
                       </h5>
                    </div>
                );
            }

        });

        return (
            <div >
                <h1>Liste des Contrats</h1>
                <hr/>
                {Contrats}
                <Link to={"/contrat/"}>
                    <button type="button" className="btn btn-outline-success">Retour</button>
                </Link>

                <form className="md-form">

                </form>
            </div>
        );
    }

    render() {
        if(this.state.loaded){
            return(
                <this.listerLesContrats contrats={this.state.contrats}/>
            );
        }else{
            return (
                <Loading/>
            );
        }
    }
}
