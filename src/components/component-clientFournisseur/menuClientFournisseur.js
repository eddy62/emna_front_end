
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as axios from 'axios';
import ListerClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/listerClientFournisseur.js';
import AddClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/addClientFournisseur.js';
import DetailClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/detailClientFournisseur.js';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'




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
      <div>
        {/* <ListerClientFournisseur />  */}
        <AddClientFournisseur />
        {/* <DetailClientFournisseur client={this.state.selectedClient} /> */}
      </div>
    );
  }
}



export default MenuClientFournisseur;