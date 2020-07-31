import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";



const ViewSociete = () => {

    const [user, setUser] = useState({
        //informations générales
        nom: "",
        prenom: "",
        login: "",
        email: "",
        role: "ROLE_SOCIETE",
        language: "fr",
        active: false,
        civilite: "",
        telephone: "",
        creePar: "Admin",
        dateDeCreation: moment().format("DD-MM-YYYY hh:mm:ss"),


        // Adresse
        numeroDeRue: "",
        codePostal: "",
        nomDeRue: "",
        ville: "",

        //informations professionnel
        emailPro: "",
        siren: "",
        siret: "",
        domaineDActivite: "",
        debutDActivite: "",
        fromeJuridique: "",
        raisonSociale: "",
        fax: "",
        description: ""
    });

    const { id } = useParams();
    useEffect(() => {
        loadUser();
    }, [])

    console.log(user.civilite)
    const loadUser = async () => {
        const result = await axios.get("http://localhost:3002/users/" + id);
        setUser(result.data)
    }
    return (
        <div className="container-fluid">
            <div className="w-75 mx-auto shadow p-4">
                <Link className="btn btn-primary" to="/users">Retournez à l'acceuil</Link>
                
                <h2 className="text-center mb-4"><span class="font-weight-bold">Détails D'une Société</span></h2>

                <hr />
                <div className="row">
                    <div className="col">

                        <ul className="list-group w-30 p-3">
                            <h3 >Infromations générales</h3>
                            <li className="list-group-item"> <span class="font-weight-bold"> Id :</span> {user.id}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Nom :</span>  {user.nom}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Prénom :</span>  {user.prenom}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Email :</span> {user.email}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Login : </span>  {user.login}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Rôle :</span> {user.role}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Civilite :</span> {user.civilite}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Langue :</span>  {user.langue}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Date De Création :</span>  {user.dateDeCreation}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Créé Par</span> {user.creePar}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Dernière modification :</span>  {user.derniereModification}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Activé :</span>{user.active ? <button className="btn btn-success btn-sm"> Activé </button> : <button className="btn btn-danger btn-sm">Désactivé</button>}</li>

                        </ul>
                    </div>



                    <div className="col">
                        <ul className="list-group w-30 p-3">
                            <h3 >Informations Professionnelles</h3>
                            <li className="list-group-item"> <span class="font-weight-bold"> Email Professionnel :</span> {user.emailPro}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Forme Juridique :</span>  {user.formeJuridique}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Domaine D'Activité :</span>  {user.domaineDActivite}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Siren :</span> {user.siren}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Siret : </span>  {user.siret}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Début D'Activité :</span> {user.debutDActivite}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Raison Sociale :</span>  {user.raisonSociale}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Description :</span>  {user.description}</li>

                        </ul>
                    </div>

                    <div className="col ">
                        <ul className="list-group w-30 p-3">
                            <h3 >Adresse</h3>
                            <li className="list-group-item"> <span class="font-weight-bold"> Numéro De Rue :</span> {user.numeroDeRue}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Nom De Rue :</span>  {user.nomDeRue}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Ville :</span>  {user.ville}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Code Postal :</span> {user.codePostal}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Fax : </span>  {user.fax}</li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    )
}


export default ViewSociete;