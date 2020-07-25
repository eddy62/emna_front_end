
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as axios from 'axios';
import ListerClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/listerClientFournisseur.js';
import AddClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/addClientFournisseur.js';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'




class MenuClientFournisseur extends Component {

    constructor(props) {
        super(props);
        this.state = {
          clients: [],
          selectedClient: null
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
         <ListerClientFournisseur /> 
           {/* <AddClientFournisseur /> */}
      </div>
    );
  }
}



export default MenuClientFournisseur;