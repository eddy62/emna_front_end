import React from 'react';
import {Link} from 'react-router-dom';
import Loading from "../../../shared/component/Loading";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";

export default class ListeContrat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            employes: [],
        };
    }

    componentDidMount(){
        AxiosCenter.getAllWrapperEmployesBySociety(UserService.getSocietyId()).then((result) => {
            this.setState({
                employes: result.data,
                loaded:true
            })
        })
    }

    listerLesContrats(props) {
        const employes = props.employes.map((employe, index)=>{
            if(employe.signe){
                return(
                    <div key={employe.id} className="alert alert-success" role="alert">
                      <h5>  {employe.titre} - {employe.nomUsage} {employe.prenom}
                       <button type="button" className="btn btn--danger">Supprimer</button>
                        <Link to={"/detailcontrat/"+employe.id}>
                            <button type="button" className="btn btn-outline-success text-right">Voir le contrat</button>
                        </Link>
                          </h5>
                    </div>
                )
            }else{
                return(
                    <div key={index} className="alert alert-danger" >
                       <h5> {employe.titre} - {employe.nomUsage} {employe.prenom}  - En attente d'une signature
                           <button type="button" className="btn btn--danger text-right">Supprimer</button>
                        <Link to={"/detailcontrat/"+employe.id}>
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
                {employes}
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
                <this.listerLesContrats employes={this.state.employes}/>
            );
        }else{
            return (
                <Loading/>
            );
        }
    }
}
