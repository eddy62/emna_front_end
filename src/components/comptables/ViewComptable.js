import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosCenter from "../../shared/services/AxiosCenter";



const ViewComptable = () => {

    const [user, setUser] = useState({
      //informations générales
      activated: false,
      authorities: [
          "ROLE_ACCOUNTANT"
      ],
      createdBy: "ADMIN",
      createdDate: "",
      email: "",
      firstName: "",
      lastName: "",
      imageUrl: "",
      langKey: "",
      lastModifiedBy: "",
      lastModifiedDate: "",
      login: "",
      civilite: "",


      // Adresse
      numeroRue: "",
      codePostal: "",
      nomRue: "",
      ville: "",
      boitePostale: "",
      pays: "",


      //informations professionnel
      emailPro: "",
      siren: "",
      siret: "",
      domaineDactivite: "",
      dateDeCreation: "",
      formeJuridique: "",
      raisonSociale: "",
      fax: "",
      description: "",
      telephone: "",

    });

    const { id } = useParams();
    useEffect(() => {
        loadUser();
        getComptableID(id)
      
    }, [])

    //methode to find comptable by user before calling! Otherwise it'll show only the user.
    const getComptableID = async (id) => {
        const result =  await AxiosCenter.getComptableByUserId(id)
        return result.data;
    }
   
    const loadUser= () => {
        getComptableID(id).then( async (res) => {
            const result = await AxiosCenter.getComptable(res.id)
            setUser(result.data)
        });   
    }

    const goBack = () => {
        window.history.back();
     }

    return (
        <div className="container-fluid">
            <div className="w-75 mx-auto shadow p-4">
            <button className="btn btn-primary" onClick={goBack}>Retourner</button>
                <h2 className="text-center mb-4"><span class="font-weight-bold">Détails D'un Comptable</span></h2>

                <hr />
                <div className="row">
                    <div className="col">

                        <ul className="list-group w-30 p-3">
                            <h3 >Infromations générales</h3>
                            <li className="list-group-item"> <span class="font-weight-bold"> Id :</span> {user.id}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Nom :</span>  {user.lastName}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Prénom :</span>  {user.firstName}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Email :</span> {user.email}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Login : </span>  {user.login}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Rôle :</span> {user.authorities[0]}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Civilite :</span> {user.civilite}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Langue :</span>  {user.langKey}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Date De Création :</span>  {user.createdDate}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Créé Par :</span> {user.createdBy}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Dernière modification :</span>  {user.lastModifiedDate}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Activé :</span>{user.activated ? <button className="btn btn-success btn-sm"> Activé </button> : <button className="btn btn-danger btn-sm">Désactivé</button>}</li>

                        </ul>
                    </div>



                    <div className="col">
                        <ul className="list-group w-30 p-3">
                            <h3 >Informations Professionnelles</h3>
                            <li className="list-group-item"> <span class="font-weight-bold"> Email Professionnel :</span> {user.emailPro}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Forme Juridique :</span>  {user.formeJuridique}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Domaine D'Activité :</span>  {user.domaineDactivite}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Siren :</span> {user.siren}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Siret : </span>  {user.siret}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Début D'Activité :</span> {user.dateDeCreation}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Raison Sociale :</span>  {user.raisonSociale}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Description :</span>  {user.description}</li>

                        </ul>
                    </div>

                    <div className="col ">
                        <ul className="list-group w-30 p-3">
                            <h3 >Adresse</h3>
                            <li className="list-group-item"> <span class="font-weight-bold"> Numéro De Rue :</span> {user.numeroRue}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Nom De Rue :</span>  {user.nomRue}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Ville :</span>  {user.ville}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Pays :</span>  {user.pays}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Code Postal :</span> {user.codePostal}</li>
                            <li className="list-group-item"> <span class="font-weight-bold"> Fax : </span>  {user.fax}</li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    )
}


export default ViewComptable;