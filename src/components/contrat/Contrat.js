import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
export default class Contrat extends React.Component {
    render() {
        return(
            <div>
                <h1>GESTION DES CONTRATS</h1>
                <p><Link to={"/creercontrat"}>Creer un nouveau contrat</Link></p>
                <p><Link to={"/listcontrat"}>Ma liste de contrat</Link></p>
            </div>
            
        );
      }
}
