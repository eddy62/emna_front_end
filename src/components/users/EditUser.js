import React, { useState, useEffect } from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';
import axios from "axios";
import moment from "moment";


const EditUser = () => {

    let history = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState({
        //informations générales
        nom: "",
        prenom:"",
        login: "",
        email: "",
        role: "ROLE_ADMIN",
        langue: "fr",
        active: false,
        dateDeCreation: "",
        creePar: "Admin",
        derniereModification: moment().format("DD-MM-YYYY hh:mm:ss")
    });


    
    const onInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value })
        
    }

    const onSubmit = async (e) => {
        e.preventDefault(); 
        await axios.put("http://localhost:3002/users/"+id, user)
        history.push("/users")
    }


    const handleActive = (e) => {
        setUser({ ...user, active: e.target.checked})

    }


    const loadUser = async () => {
        const result = await axios.get("http://localhost:3002/users/" + id);
        setUser(result.data)

    }


    useEffect(() => {
        loadUser();
    }, []);

    const { nom, prenom, login, email, role, langue, active, dateDeCreation,creePar,  derniereModification} = user;

     return (
        <div className="container-fluid">
            <form onSubmit={e => onSubmit(e)}>


                <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4"><span class="font-weight-bold">Modifiez Un Admin</span></h2>

                    <div className="form-row">
                    <div className="form-group col-md-12">
                            <h3 className="mt-3">Informations générales</h3>
                        </div>
                     
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFirstName"><span class="font-weight-bold"> Nom </span></label>
                            <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"  id="firstName" name="nom" value={nom} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastName"><span class="font-weight-bold"> Prénom </span></label>
                            <input type="text" className="form-control" id="lastName" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"  name="prenom" value={prenom} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail"><span class="font-weight-bold"> Email </span></label>
                            <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLogin"><span class="font-weight-bold"> Login </span></label>
                            <input type="text" className="form-control" id="login" name="login" value={login} onChange={e => onInputChange(e)} required />
                        </div>


                        <div className="form-group col-md-6">
                            <label htmlFor="inputLangue"><span class="font-weight-bold"> Langue</span></label>
                            <input type="text" className="form-control" pattern="[A-Za-z]{2,30}" id="langue" name="langue" value={langue} onChange={e => onInputChange(e)} required />
                        </div>

                      

                        <div className="form-group col-md-6">
                            <label for="inputRole"><span class="font-weight-bold"> Rôle </span></label>
                            <input type="text" className="form-control" id="role" name="role" value="ROLE_ADMIN" onChange={e => onInputChange(e)} />
                        </div>



                        <div className="form-group col-md-6">
                            <label for="inputDateDeCreation"><span class="font-weight-bold"> Date de création </span></label>
                            <input type="text" className="form-control" id="dateDeCreation" name="dateDeCreation" value={dateDeCreation} onChange={e => onInputChange(e)} />
                        </div>

                        <div className="form-group col-md-6">
                            <label for="inputCreePar"><span class="font-weight-bold"> Créé par</span></label>
                            <input type="text" className="form-control" pattern="[A-Za-z]{2,30}" id="creePar" name="creePar" value={creePar} onChange={e => onInputChange(e)} />
                        </div>

                        <div className="form-group col-md-4 mt-5" >
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="active" checked={user.active} onChange={handleActive} />
                                <label class="form-check-label" htmlFor="active"><span class="font-weight-bold"> Activé</span></label>
                            </div>
                        </div>
                       
                    </div>
                    <Link className="btn btn-outline-danger" to="/users">Annulez</Link>
                    <button type="submit" href="/users" className="btn btn-primary"> Modifiez </button>

                </div>
            </form>
        </div>


    )
}

export default EditUser;