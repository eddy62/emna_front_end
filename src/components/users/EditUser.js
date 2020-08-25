import React, { useState, useEffect } from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';
import Select from 'react-select';
import AxiosCenter from '../../shared/services/AxiosCenter';


const EditUser = () => {

    let history = useHistory();
    const { id } = useParams();
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



     const onSubmit = async (e) => {

        try{
            e.preventDefault(); 
            await AxiosCenter.editUser(user);
            if(user.activated){
                history.push("/users/stvu/admins/active")
            }
            else{
                history.push("/users/stvu/admins/desactive")
            }
        } catch(err) {
            console.log(err)
        }
       
    }


     const optionsLangue = [
        { value: 'Fr', label: 'Français' },
        { value: 'An', label: 'Anglais' },
        { value: 'ar-ly', label: 'العربية'}
    ];


    const handleChangeLangue= (langKey) => {
        setUser({ ...user, langKey: langKey.value})
        
      };
    
    const onInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value })
        
    }

    const handleActive = (e) => {
        setUser({ ...user, activated: e.target.checked})

    }

    const loadUser = async () => {
        try{
            const result = await AxiosCenter.getUser(id)
            setUser(result.data)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => {
        loadUser();
    }, []);

    const {firstName, lastName,  login, email, langKey} = user;

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
                            <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}" title="Le nom ne doit contenir que des letters et ne peut pas être un seul lettre." id="lastName" name="lastName" value={lastName} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastName"><span class="font-weight-bold">Prénom</span></label>
                            <input type="text" className="form-control" id="firstNmae" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}" title="Le prénom ne doit contenir que des letters et ne peut pas être un seul lettre." name="firstName" value={firstName} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail"><span class="font-weight-bold"> Email</span></label>
                            <input type="email" className="form-control" id="email" title="Entrez un Email valide SVP!" name="email" value={email} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLogin"><span class="font-weight-bold"> Login </span></label>
                            <input type="text" className="form-control" id="login" name="login" value={login} onChange={e => onInputChange(e)} required />
                        </div>


                        <div className="form-group col-md-6">
                            <label htmlFor="inputLangue"><span class="font-weight-bold">Langue</span></label>
                            <Select
                                options={optionsLangue}
                                value={langKey.value} 
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
                                <input type="checkbox" class="form-check-input" id="active" checked={user.activated} onChange={handleActive} />
                                <label class="form-check-label" htmlFor="active"><span class="font-weight-bold"> Activé</span></label>
                            </div>
                        </div>

                    </div>
                    <Link className="btn btn-outline-danger" to="/users/stvu/admins">Annulez</Link>
                    <button type="submit" href={user.activated ? "/users/stvu/admins/active" : "/users/stvu/admins/desactive"} className="btn btn-primary"> Modifiez </button>


                </div>
            </form>
        </div>

    )
}

export default EditUser;