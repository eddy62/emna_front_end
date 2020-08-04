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
                        {contrat.contratTitre} - {contrat.employerNom} - {contrat.employerPrenom} --  Validé
                        <Link to={"/detailcontrat/"+contrat.employerId}> voir le détail </Link>
                        <a href="https://image.slidesharecdn.com/lecontratdetravail-121022073944-phpapp01/95/le-contrat-de-travail-1-638.jpg?cb=1350891621"> <button >
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-square-fill"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"/>
                            </svg>

                        </button></a>
                        <button>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-archive-fill" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM6 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                            </svg>
                        </button>
                    </div>
                )
            }else{
                return(
                    <div key={contrat.employerId} className="alert alert-danger" >
                        {console.log(contrat.contratSigner)}
                        {contrat.contratTitre} - {contrat.employerNom} - {contrat.employerPrenom}  -- En attente d'une signature
                        <Link to={"/detailcontrat/"+contrat.employerId}> voir le détail </Link>

                        <input type="file"
                               id="document" name="document"
                               accept="image/pdf"/>

                        <button >
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-square-fill"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"/>
                            </svg>
                        </button>
                        <button>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-archive-fill" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM6 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                            </svg>
                        </button>
                    </div>
                );
            }

        });

        return (
            <div>
                <h1>Liste des Contrats</h1>
                {Contrats}
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
