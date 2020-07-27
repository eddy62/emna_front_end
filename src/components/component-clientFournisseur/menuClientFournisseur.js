
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as axios from 'axios';
import ListerClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/listerClientFournisseur.js';
import AddClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/addClientFournisseur.js';
import DetailClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/detailClientFournisseur.js';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




class MenuClientFournisseur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      selectedClient: {
        "id": 10,
        "nom": "Fresh Gloves",
        "siren": 12236,
        "telephone": "(725) 158-4493 x318",
        "email": "Katharina88@gmail.com",

        "idSociete ": 1,

        "idAdresse": null,
        "numeroRue": 58,
        "nomRue": "rue de lille",
        "codePostal": 59670,
        "ville": "Croix"



      }
    }
  }


  componentDidMount() {
    console.log('je suis entre dans le comp')
    AxiosCenter.getClientFournisseur().then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (





      <Router>
        <h1>Gestion société</h1>
        <div>
          <nav>
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <Link to="/1">
                  <button type="button" className="btn btn-success">La Liste Des Mes Associés</button></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/2">
                  <button className="btn btn-success">Céer Une Société </button></Link>
              </li>
            </ul>
          </nav>
          <Route path="/1" component={ListerClientFournisseur} />
          <Route path="/2" component={AddClientFournisseur} />
        </div>
      </Router>
    );
  }
}



export default MenuClientFournisseur;