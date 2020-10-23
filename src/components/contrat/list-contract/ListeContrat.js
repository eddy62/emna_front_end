import React from 'react';
import {Link} from 'react-router-dom';
import Loading from "../../../shared/component/Loading";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UploadFileBtn from "../../../shared/component/drag-n-drop/UploadFileBtn";
import UserService from "../../../shared/services/UserService";
import {toast} from "react-toastify";
import {MDBBtn} from "mdbreact";

class ListeContrat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            employes: [],
        };
    }

    componentDidMount() {
        console.log("here");
        AxiosCenter.getAllWrapperEmployesBySociety(UserService.getSocietyId()).then((result) => {
            this.setState({
                employes: result.data,
                loaded: true
            })
        })
    }

    archiveContract = async (idContrat) => {
        await AxiosCenter.archiveContrat(idContrat).then(res => {
            toast.success(
                <div className="text-center">
                    <strong>
                        Le contrat est archivé !
                    </strong>
                </div>,
                {position: "bottom-right"}
            );
            this.componentDidMount();
        }).catch((err) => {
            toast.error(
                <div className="text-center">
                    <strong>Y'a une autre couille dans le potage !</strong>
                    <br/>
                </div>,
                {position: "top-right"}
            );
        });
    }

    onSavingFiles = (files, idContract) => {
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
        }).catch((err) => {
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
                            <h5 className="clearfix">  {employe.titre} - {employe.nomUsage} {employe.prenom}
                                <div className="float-right">
                                    <button type="button" className="btn btn--danger">Supprimer</button>
                                    <Link to={"/detailcontrat/" + employe.idContrat}>
                                        <button type="button" className="btn btn-outline-success text-right">Voir le
                                            contrat
                                        </button>
                                    </Link>
                                    <MDBBtn onClick={() => props.archiveContract(employe.idContrat)} color={"info"}>
                                        Archiver
                                    </MDBBtn>
                                </div>
                            </h5>
                        </div>
                    )
                } else {
                    return (
                        <div key={index} className="alert alert-danger">
                            <h5 className="clearfix"> {employe.titre} - {employe.nomUsage} {employe.prenom} - En attente
                                d'une signature
                                <div className="float-right">
                                    <button type="button" className="btn btn--danger text-right">Supprimer</button>
                                    <UploadFileBtn
                                        idElement={employe.idContrat}
                                        title="Chargez votre contrat signé :"
                                        submit={props.onSavingFiles}
                                        fileFormats="application/pdf,.pdf"
                                    />
                                </div>
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
        if (!this.state.loaded) return <Loading/>
        return <this.listerLesContrats
            employes={this.state.employes}
            onSavingFiles={this.onSavingFiles}
            files={this.state.files}
            archiveContract={this.archiveContract}
        />
    }
}

export default ListeContrat;
