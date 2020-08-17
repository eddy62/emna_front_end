import React from "react";
import {Link} from 'react-router-dom';

const SelectToAddUser = () => {
    return (

        <div className="container py-5" >
            <div className="w-100 mx-auto shadow p-5">
              
                <h2 className="text-center mb-4"><span class="font-weight-bold">Choisissez Le Type D'Utilisateur</span></h2>
                <div className="row">

                    <div className="col-12">
                        <div className="card text-center w-100 p-3 " style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 Name="card-title">Utilisateur Admin</h5>
                                <p className="card-text">En sachant qu'un <strong>ADMIN</strong> peut tout faire dans l'application.</p>
                                <Link className="btn btn-primary" to="/users/add">Créez Admin</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="card text-center w-100 p-3 mt-5"  style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">Utilisateur Comptable</h5>
                                <p className="card-text">En sachant qu'un <strong>COMPTABLE</strong> peut créer des sociétés et ne peut pas créer des Admins.</p>
                                <Link className="btn btn-primary" to="/users/add/comptable">Créez Comptable</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card text-center w-100 p-3 mt-5" style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">Utilisateur Société</h5>
                                <p className="card-text">En sachant qu'un Utilisateur <strong>SOCIÉTÉ</strong> ne peut créer ni des comptables ni des sociétés.</p>
                                <Link className="btn btn-primary" to="/users/add/societe">Créez Société</Link>

                            </div>
                        </div>
                    </div>


                </div>
                <Link className="btn btn-outline-danger mt-5" to="/users">Annulez</Link>


            </div>
        </div>
    )
}

export default SelectToAddUser;