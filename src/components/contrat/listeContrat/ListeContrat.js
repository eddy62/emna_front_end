import React from 'react';
import ContratService from '../service/ContratService';
import { Link } from 'react-router-dom';
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
        console.log('coucou ' + id)//123
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
                      <h5>  {contrat.contratTitre} - {contrat.employerNom} - {contrat.employerPrenom} --  Validé

                        <Link to={"/detailcontrat/"+contrat.employerId}>
                            <button type="button" className="btn btn-outline-success">Voir le contrat</button>
                        </Link>
                        <button type="button" className="btn btn--danger">Supprimer</button></h5>
                    </div>
                )
            }else{
                return(
                    <div key={contrat.employerId} className="alert alert-danger" >
                        {console.log(contrat.contratSigner)}
                       <h5> {contrat.contratTitre} - {contrat.employerNom} - {contrat.employerPrenom}  -- En attente d'une signature


                           <input type="file"id="document" name="document" accept="image/pdf"/>
                        <Link to={"/detailcontrat/"+contrat.employerId}>
                            <button type="button" className="btn btn-outline-danger">Voir le contrat</button>
                        </Link>



                           <button type="button" className="btn btn--danger">Supprimer</button>
                       </h5>
                    </div>
                );
            }

        });

        return (
            <div>
                <h1>Liste des Contrats</h1>
                {Contrats}
                <Link to={"/contrat/"}>
                    <button type="button" className="btn btn-outline-success">Retour</button>
                </Link>
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
