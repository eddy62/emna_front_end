import React from 'react';
import {Link} from 'react-router-dom';
import Loading from "../../../shared/component/Loading";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UploadFileBtn from "../../../shared/component/drag-n-drop/UploadFileBtn";
import UserService from "../../../shared/services/UserService";
import {toast} from "react-toastify";

class ListeContrat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            employes: [],
        };
    }

    componentDidMount() {
        AxiosCenter.getAllWrapperEmployesBySociety(UserService.getSocietyId()).then((result) => {
            this.setState({
                employes: result.data,
                loaded: true
            })
        })
    }

    getPDFAmendment = (idAmendment) => {
        AxiosCenter.getPDFAmendment(idAmendment)
            .then((res) => {
                const file = new Blob([res.data], {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch((err) => console.log(err));
    }

    onSavingFiles = (files, idContract) => {

        console.log(files)
        AxiosCenter.uploadContract(files, idContract).then(res => {
            toast.success(
                <div className="text-center">
                    <strong>
                        Le contrat a bien été créé !
                    </strong>
                </div>,
                {position: "bottom-right"}
            );
            this.componentDidMount();
        }).catch((err) =>{
            toast.error(
                <div className="text-center">
                    <strong>Y'a une couille dans le potage !</strong>
                    <br/>
                </div>,
                {position: "top-right"}
            );
        });
    }

    listerLesContrats(props) {
       const employes = props.employes.map((employe, index) => {
            if (employe.archive === false) {
                if (employe.signe) {
                    return (
                        <div key={employe.idContrat} className="alert alert-success" role="alert">
                            <h5>  {employe.titre} - {employe.nomUsage} {employe.prenom}
                                <button type="button" className="btn btn--danger">Supprimer</button>
                                <Link to={"/detailcontrat/" + employe.idContrat}>
                                    <button type="button" className="btn btn-outline-success text-right">Voir le
                                        contrat
                                    </button>
                                </Link>
                            </h5>
                        </div>
                    )
                } else {
                    return (
                        <div key={index} className="alert alert-danger">
                            <h5> {employe.titre} - {employe.nomUsage} {employe.prenom} - En attente d'une signature
                                <button type="button" className="btn btn--danger text-right">Supprimer</button>
                                <UploadFileBtn
                                    idElement={employe.idContrat}
                                    title="Chargez votre contrat signé :"
                                    submit={props.onSavingFiles}
                                    fileFormats="application/pdf,.pdf"
                                />
                            </h5>
                        </div>
                    );
                }
            }
        });

        return (
            <div>
                <h1>Liste des Contrats actifs</h1>
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
        if(!this.state.loaded) return <Loading/>
        return <div><this.listerLesContrats
                employes={this.state.employes}
                onSavingFiles={this.onSavingFiles}
                files={this.state.files}
        />
            <button onClick={()=>this.getPDFAmendment(1)}>
                pdf
            </button>
        </div>
    }
}

export default ListeContrat;