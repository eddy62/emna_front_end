import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import AxiosCenter from "../../shared/services/AxiosCenter";



const ViewUser = () => {
    const [user, setUser] = useState({
        //informations générales
        activated: false,
        authorities: [
            "ROLE_ADMIN"
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
        login: ""
    });

    const { id } = useParams();
    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {

        try{
            const result = await AxiosCenter.getUser(id);
            setUser(result.data)
        }catch(err) {
            console.log(err)
        }
       
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
                    <li className="list-group-item"> <span class="font-weight-bold"> Nom :</span>  {user.lastName}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Prénom :</span>  {user.firstName}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Email :</span> {user.email}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Login : </span>  {user.login}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Rôle :</span> {user.authorities[0]}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Langue :</span>  {user.langKey}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Date De Création :</span>  {user.createdDate}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Créé Par :</span> {user.createdBy}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Dernière modification :</span>  {user.lastModifiedDate}</li>
                    <li className="list-group-item"> <span class="font-weight-bold"> Activé :</span>{user.activated ? <button className="btn btn-success btn-sm"> Activé </button> : <button className="btn btn-danger btn-sm">Désactivé</button>}</li>

                </ul>
            </div>
        </div>
    )
}


export default ViewUser;