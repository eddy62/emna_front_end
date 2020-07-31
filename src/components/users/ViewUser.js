import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";



const ViewUser = () => {
    const [user, setUser] = useState({
        //informations générales
        nom: "",
        prenom: "",
        login: "",
        email: "",
        role: "ROLE_ADMIN",
        langue: "fr",
        active: false,
        dateDeCreation: moment().format("DD-MM-YYYY hh:mm:ss"),
        creePar: "Admin",
        derniereModification: ""
    });

    const { id } = useParams();
    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const result = await axios.get("http://localhost:3002/users/" + id);
        setUser(result.data)
    }
    return (
        <div className="container py-4">
            <div className="w-75 mx-auto shadow p-4">
            <Link className="btn btn-primary" to="/users">Retournez à l'acceuil</Link>
            <h2 className="text-center mb-4"><span class="font-weight-bold">Détails D'un Admin</span></h2>
            <hr />

            <ul className="list-group w-50">
                <h3 >Infromations générales</h3>
                <li className="list-group-item"> <span class="font-weight-bold"> Id :</span> {user.id}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Nom :</span>  {user.nom}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Prénom :</span>  {user.prenom}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Email :</span> {user.email}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Login : </span>  {user.login}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Rôle :</span> {user.role}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Langue :</span>  {user.langue}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Date De Création :</span>  {user.dateDeCreation}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Créé Par</span> {user.creePar}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Dernière modification :</span>  {user.derniereModification}</li>
                <li className="list-group-item"> <span class="font-weight-bold"> Activé :</span>{user.active ? <button className="btn btn-success btn-sm"> Activé </button> : <button className="btn btn-danger btn-sm">Désactivé</button>}</li>
                
            </ul>
        </div>
    </div>
    )
}


export default ViewUser;