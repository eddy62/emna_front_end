import React from 'react';
import {Link} from 'react-router-dom';
import Loading from "../../../shared/component/Loading";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UploadFileBtn from "../../../shared/component/buttons/UploadFileBtn";
import FileUpload from "../../../shared/component/drag-n-drop/FileUpload";

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

    onSavingFiles = (files, idContract) => {
        console.log(files)
        AxiosCenter.uploadContract(files,idContract)
    }

    listerLesContrats(props) {
        const Contrats = props.contrats.map((contrat, index)=>{
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
                    <div key={contrat.employeId} className="alert alert-danger" >
                       <h5> {contrat.titre} - {contrat.employerNom} {contrat.employerPrenom}  - En attente d'une signature
                           <button type="button" className="btn btn--danger text-right">Supprimer</button>
                        <Link to={"/detailcontrat/"+contrat.employeId}>
                              <button type="button" className="btn btn-outline-danger text-right">Voir le contrat</button>
                        </Link>
                           <UploadFileBtn
                               fileFormats="application/pdf,.pdf"
                               onSave={props.onSavingFiles}
                               idElement={contrat.id}
                           />
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
        if(!this.state.loaded) return <Loading/>
        return <this.listerLesContrats contrats={this.state.contrats} onSavingFiles={this.onSavingFiles}/>
    }
}
