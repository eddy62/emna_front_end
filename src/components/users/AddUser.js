import React, { useState } from 'react';
import { useHistory, Link} from 'react-router-dom';
import Select from 'react-select';
import moment from "moment";
import axios from "axios";


const AddUser = () => {

    let history = useHistory();
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

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleActive = (e) => {
        setUser({ ...user, active: e.target.checked})

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3002/users", user)
        history.push("/users")
    }

    const optionsLangue = [
        { value: 'Fr', label: 'Français' },
        { value: 'An', label: 'Anglais' },
      ];
    const handleChangeLangue= (langue) => {
        setUser({ ...user, langue: langue.value})
        
      };
    const { nom, prenom, login, email, role, langue, active, dateDeCreation, creePar, derniereModification } = user;
    return (
        <div className="container-fluid">
            <form onSubmit={e => onSubmit(e)}>

                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4"><span class="font-weight-bold">Ajoutez Un Admin</span></h2>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <h3 className="mt-3">Informations générales</h3>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFirstName"><span class="font-weight-bold"> Nom </span></label>
                            <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"  id="firstName" name="nom" value={nom} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastName"><span class="font-weight-bold">Prénom</span></label>
                            <input type="text" className="form-control" id="lastName" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"  name="prenom" value={prenom} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail"><span class="font-weight-bold"> Email</span></label>
                            <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLogin"><span class="font-weight-bold"> Login </span></label>
                            <input type="text" className="form-control" id="login" name="login" value={login} onChange={e => onInputChange(e)} required />
                        </div>


                        <div className="form-group col-md-6">
                            <label htmlFor="inputLangue"><span class="font-weight-bold">Langue</span></label>
                            <Select
                                options={optionsLangue}
                                value={langue.value} 
                                onChange={handleChangeLangue}
                                isSearchable= {true}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputRole"><span class="font-weight-bold">Rôle</span></label>
                            <input type="text" className="form-control" id="role" name="role" value="ROLE_ADMIN"  />
                        </div>

                        <div className="form-group col-md-4 mt-5" >
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="active" checked={user.active} onChange={handleActive} />
                                <label class="form-check-label" htmlFor="active"><span class="font-weight-bold"> Activé</span></label>
                            </div>
                        </div>

                    </div>
                    <Link className="btn btn-outline-danger" to="/users/stau">Annulez</Link>
                    <button type="submit" href="/users" className="btn btn-primary"> Créez </button>

                </div>
            </form>
        </div>

    )
}

export default AddUser;