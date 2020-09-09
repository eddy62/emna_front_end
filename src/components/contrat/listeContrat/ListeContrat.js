import React from 'react';
import ContratService from '../service/ContratService';
import {Link} from 'react-router-dom';
import Loading from "../../../shared/component/Loading";

export default class ListeContrat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            contrats: [],
        };
    }


    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const id = query.get('id')
        ContratService.getContrat(1).then((resultat) => {
            const contrats = resultat.data;
            this.setState({ contrats , loaded:true});
        })
            .catch((err) => console.log(err));
    }

    listerLesContrats(props) {
        const Contrats = props.contrats.map((contrat, index)=>{
            if(contrat.contratSigner){
                return(
                    <div key={contrat.employerId} className="alert alert-success" role="alert">
                      <h5>  {contrat.contratTitre} - {contrat.employerNom} {contrat.employerPrenom}
                       <button type="button" className="btn btn--danger">Supprimer</button>
                        <Link to={"/detailcontrat/"+contrat.employerId}>
                            <button type="button" className="btn btn-outline-success">Voir le contrat</button>
                        </Link>
                          </h5>
                    </div>
                )
            }else{
                return(
                    <div key={index} className="alert alert-danger" >
                       <h5> {contrat.contratTitre} - {contrat.employerNom} {contrat.employerPrenom}  - En attente d'une signature
                           <button type="button" className="btn btn--danger">Supprimer</button>
                        <Link to={"/detailcontrat/"+contrat.employerId}>
                              <button type="button" className="btn btn-outline-danger">Voir le contrat</button>
                        </Link>
                           <div className="file-field medium">
                               <div className="btn btn-outline-secondary btn-rounded waves-effect float-left">
                                   <span>Upload</span>
                                   <input type="file"/>
                               </div>
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
