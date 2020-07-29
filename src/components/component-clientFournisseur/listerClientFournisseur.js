
import React, { Component } from 'react';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'
import * as axios from 'axios';
import DetailsClientFournisseur from './detailsClientFournisseur';
import Style from './ClientFournisseur.module.css'

class ListerClientFournisseur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clients: [],

    }
  }



  componentDidMount() {
    axios.get('http://localhost:8080/api/client-fournisseurs/societe/1', {
      headers: {
        Authorization: "Basic " + " YWRtaW46YWRtaW4="
      }
    })
      .then(response => response.data)
      .then(clients => this.setState({ clients }))
      .catch(err => console.log(err))
  }

  // componentDidMount() {
  //   AxiosCenter.getClientFournisseur().then(response => {
  //     this.state.clients = response.data;
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }


  render() {
    return (

      <div className="container">
        <div>
          <table className=" table-striped table-bordered table-hover table-sm">
            <caption>La liste de client fournisseur</caption>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">SIREN</th>
                <th scope="col">Email</th>

              </tr>
            </thead>
            <tbody>
              {this.state.clients && this.state.clients.length ? (
                this.state.clients.map((c, index) => (

                  < tr key={index} >
                    <td scope="row">{c.nom}</td>
                    <td scope="row">{c.siren}</td>
                    <td scope="row">{c.email}</td>
                    <td className="text-right">
                      {/* <DetailsClientFournisseur client={c} /> */}
                    </td>
                  </tr>
                ))
              ) : (<h1 className="text-center"> Pas des Client ... </h1>)}
            </tbody>
          </table>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        qdsfqsdfqsdf

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

    )
  }
}

export default ListerClientFournisseur;


