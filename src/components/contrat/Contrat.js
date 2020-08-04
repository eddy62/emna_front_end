import React from "react";
//import Axios from 'axios';
import { Link } from "react-router-dom";
export default class Contrat extends React.Component {
    render() {
        return(
            <div>
                <h1>GESTION DES CONTRATS</h1>

                <Link to={"/creercontrat"}><div className="card text-white bg-success mb-3" >
                    <div className="card-header"> <h5 >Creer un nouveau contrat</h5></div>
                </div></Link>
                <Link to={"/listcontrat"}><div className="card text-white bg-success mb-3" >
                    <div className="card-header"> <h5 >Voir mes contrats</h5></div>
                </div></Link>
            </div>
            
        );
      }
}
