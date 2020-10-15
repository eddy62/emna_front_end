import React from "react";
import * as dateFns from "date-fns";
import {fr} from "date-fns/esm/locale";
import "./gestionEmploye.scss";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import DeleteEmploye from "./DeleteEmploye";
import ArchiveEmploye from "./ArchiveEmploye";
import UserService from "../../../shared/services/UserService";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBContainer, MDBRow,} from "mdbreact";
import Loading from "../../../shared/component/Loading";

class DetailEmploye extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idSociete: UserService.getSocietyId,
            employe: {},
            loaded: false,
        };
    }

    componentDidMount() {
        const idEmploye = this.props.match.params.id;
        console.log(idEmploye);
        AxiosCenter.getWrapperEmployee(idEmploye)
            .then((response) => {
                const employe = response.data;
                console.log(employe);
                this.setState({employe: employe, loaded: true});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (!this.state.loaded) return <Loading/>;
        const title = "Gestion Social";
        const title1 = "Information Employé";
        const employe = this.state.employe;
        const entreprise = employe.raisonSociale;
        const date = employe.dateNaissance;
        console.log(date);
        const newdate = new Date(date);
        console.log(newdate);
        const date2 = dateFns.format(newdate, "dd-MM-yyyy", {locale: fr});
        console.log(date2);
        return (
            <div className="App">
                <div className="employes">
                    <MDBContainer>
                        <div>
                            <MDBCardHeader color="default-color">
                                <MDBCardTitle tag="h1">{title}</MDBCardTitle>
                                <br/>
                                <MDBCardTitle tag="h3">{entreprise}</MDBCardTitle>
                            </MDBCardHeader>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
                            {title1}
                        </MDBCardHeader>
                        <div>
                            <hr></hr>
                        </div>
                        <div>
                            <MDBRow>
                                <MDBCardBody>
                                    <MDBCard>
                                        <br/>
                                        <div className="ligne1">
                                            <p className="elt1">
                                                <label className="gras">Id Employé :</label> &nbsp;
                                                {employe.id}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Matricule :</label> &nbsp;
                                                {employe.matricule}
                                            </p>
                                            <p className="elt2">
                                                <label className="gras">
                                                    Numero de Sécurité Sociale :
                                                </label>{" "}
                                                &nbsp;
                                                {employe.numeroSecuriteSociale}
                                            </p>
                                        </div>
                                        <div className="ligne2">
                                            <p className="elt1">
                                                <label className="gras">Civilité : </label> &nbsp;
                                                {employe.civilite}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Nom : </label>&nbsp;
                                                {employe.nomUsage}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Prénom(s) :</label>&nbsp;{" "}
                                                {employe.prenom}
                                            </p>
                                        </div>
                                        <div className="ligne3">
                                            <p className="elt1">
                                                <label className="gras">Né(e) le : </label>&nbsp;
                                                {dateFns.format(
                                                    new Date(employe.dateNaissance),
                                                    "dd-MM-yyyy",
                                                    {
                                                        locale: fr,
                                                    }
                                                )}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">à : </label>&nbsp;
                                                {employe.villeNaissance}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Département / Pays :</label>
                                                &nbsp;&nbsp;&nbsp;
                                                {employe.departementNaissance}&nbsp; /&nbsp;{" "}
                                                {employe.paysNaissance}
                                            </p>
                                        </div>
                                        <div className="ligne4">
                                            <p className="elt1">
                                                <label className="gras">Situation Familiale : </label>
                                                &nbsp;{employe.situationFamiliale}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Enfants à charge :</label>
                                                &nbsp;{employe.nbEnfantACharge}
                                            </p>
                                        </div>
                                    </MDBCard>
                                </MDBCardBody>
                            </MDBRow>
                            <MDBRow>
                                <MDBCardBody>
                                    <MDBCard>
                                        <br/>
                                        <div className="ligne1">
                                            <p className="elt1">
                                                <label className="gras">
                                                    Adresse : &nbsp;&nbsp;&nbsp; N°
                                                </label>
                                                &nbsp;
                                                {employe.numeroRue}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Libellé : </label>&nbsp;
                                                {employe.nomRue}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Complément/BP : </label>&nbsp;
                                                {employe.boitePostale}
                                            </p>
                                        </div>
                                        <div className="ligne2">
                                            <p className="elt1">
                                                <label className="gras">Code Postal : </label>&nbsp;
                                                {employe.codePostal}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Ville : </label>&nbsp;
                                                {employe.ville}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Pays :</label>&nbsp;
                                                {employe.pays}
                                            </p>
                                        </div>
                                        <div className="ligne3">
                                            <p className="elt1">
                                                <label className="gras">Telephone Fixe : </label>&nbsp;
                                                {employe.telephoneFixe}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Fax : </label>&nbsp;
                                                {employe.fax}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Mobile : </label>&nbsp;
                                                {employe.telephonePortable}
                                            </p>
                                            <p className="elt1">
                                                <label className="gras">Email : </label>&nbsp;
                                                {employe.email}
                                            </p>
                                        </div>
                                    </MDBCard>
                                </MDBCardBody>
                            </MDBRow>
                            <MDBRow>
                                <MDBCardBody>
                                    <MDBCard>
                                        <br/>
                                        <div className="ligne1">
                                            <p className="elt1">
                                                <label className="gras">Société : </label>&nbsp;
                                                {entreprise}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Date Embauche : </label>&nbsp;
                                                {dateFns.format(
                                                    new Date(employe.dateEmbauche),
                                                    "dd-MM-yyyy",
                                                    {
                                                        locale: fr,
                                                    }
                                                )}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Date Fin Contrat : </label>
                                                &nbsp;
                                                {employe.dateSortie != null ? dateFns.format(
                                                    new Date(employe.dateSortie),
                                                    "dd-MM-yyyy",
                                                    {
                                                        locale: fr,
                                                    }
                                                ) : "/"}
                                            </p>
                                        </div>
                                        <div className="ligne2">
                                            {/*<p className="elt1">*/}
                                            {/*  <label className="gras">Type Contrat : </label>&nbsp;*/}
                                            {/*  {employe.intituleTypeContrat}*/}
                                            {/*</p>*/}
                                            <p className="elt">
                                                <label className="gras">Categorie : </label>&nbsp;
                                                {employe.categorie}
                                            </p>
                                        </div>
                                        <div className="ligne3">
                                            <p className="elt1">
                                                <label className="gras">Poste :</label>&nbsp;
                                                {employe.poste}
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Essai :</label>&nbsp;
                                                {employe.periodeEssai}&nbsp;&nbsp;jr(s)
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Statut Employe :</label>&nbsp;
                                                {employe.libelle}
                                            </p>
                                        </div>
                                        <div className="ligne4">
                                            <p className="elt1">
                                                <label className="gras">Salaire Mensuel : </label>&nbsp;
                                                {employe.salaireBrutMensuel}&nbsp;&nbsp;€
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Salaire Horaire :</label>&nbsp;
                                                {employe.salaireHoraire}&nbsp;&nbsp;€ / h
                                            </p>
                                            <p className="elt">
                                                <label className="gras">Heures Mensuelles : </label>
                                                &nbsp;
                                                {employe.nbHeureMensuelle}&nbsp;&nbsp;h
                                            </p>
                                        </div>
                                    </MDBCard>
                                </MDBCardBody>
                            </MDBRow>
                        </div>
                        <div>
                            <hr></hr>
                        </div>

                        <MDBRow around between>
                            <div>
                                {UserService.getRole() === "ROLE_SOCIETY" ? (
                                    <MDBBtn
                                        rounded
                                        size="sm"
                                        color="teal accent-3"
                                        onClick={() => {
                                            this.props.history.push("/updateEmploye/" + employe.id);
                                        }}
                                    >
                                        Mise à jour
                                    </MDBBtn>
                                ) : null}
                            </div>
                            <div>
                                {UserService.getRole() === "ROLE_SOCIETY" &&
                                employe.codeRef === "EMPEND" ? (
                                    <DeleteEmploye employe={employe}/>
                                ) : null}

                                {UserService.getRole() === "ROLE_SOCIETY" &&
                                employe.codeRef !== "EMPEND" ? (
                                    <ArchiveEmploye employe={employe}/>
                                ) : null}
                            </div>
                            <div>
                                <MDBBtn
                                    rounded
                                    size="sm"
                                    color="teal accent-3"
                                    onClick={() => {
                                        this.props.history.push(
                                            "/listEmployes/" + employe.societeId
                                        );
                                    }}
                                >
                                    Retour
                                </MDBBtn>
                            </div>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default DetailEmploye;
