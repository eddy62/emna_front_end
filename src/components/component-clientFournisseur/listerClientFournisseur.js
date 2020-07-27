
import React, { Component } from 'react';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'
import DetailClientFournisseur from 'C:/gitStage/EMNA/emna_front_end/src/components/component-clientFournisseur/detailClientFournisseur.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




class ListerClientFournisseur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clients: [
        {
          "id": 1,
          "nom": "Rubber UIC-Franc Peso Uruguayo Uruguay Peso en Unidades Indexadas",
          "siren": 32600,
          "telephone": "(977) 311-0055 x571",
          "email": "Dorcas.Cassin@gmail.com",
          "adresseId": 1,
          "societeId": 1
        },
        {
          "id": 2,
          "nom": "ivory transmit Salad",
          "siren": 58214,
          "telephone": "(688) 062-6690",
          "email": "Kenyatta77@yahoo.com",
          "adresseId": 2,
          "societeId": 2
        },
        {
          "id": 3,
          "nom": "Ball Park",
          "siren": 56531,
          "telephone": "929-817-0424 x8121",
          "email": "Annabel80@yahoo.com",
          "adresseId": null,
          "societeId": null
        },
        {
          "id": 4,
          "nom": "Concrete",
          "siren": 19566,
          "telephone": "302-850-4210",
          "email": "Anita_Watsica@gmail.com",
          "adresseId": null,
          "societeId": null
        },
        {
          "id": 5,
          "nom": "Digitized Moroccan Dirham",
          "siren": 33389,
          "telephone": "420-656-0346 x17661",
          "email": "Graciela.Baumbach@gmail.com",
          "adresseId": null,
          "societeId": null
        },
        {
          "id": 6,
          "nom": "Fields adapter",
          "siren": 6072,
          "telephone": "213-597-6970 x477",
          "email": "Ezra.Oberbrunner96@hotmail.com",
          "adresseId": null,
          "societeId": null
        },
        {
          "id": 7,
          "nom": "Corporate",
          "siren": 73029,
          "telephone": "719-650-3006 x6809",
          "email": "Lourdes_Little23@hotmail.com",
          "adresseId": null,
          "societeId": null
        },
        {
          "id": 8,
          "nom": "Czech Koruna metrics reboot",
          "siren": 60918,
          "telephone": "1-422-083-7614 x4941",
          "email": "Ila.Dicki@yahoo.com",
          "adresseId": null,
          "societeId": null
        },
        {
          "id": 9,
          "nom": "card ivory",
          "siren": 25098,
          "telephone": "(342) 342-9221",
          "email": "Everette43@gmail.com",
          "adresseId": null,
          "societeId": null
        },
        {
          "id": 10,
          "nom": "invoice Identity Licensed Fresh Gloves",
          "siren": 12236,
          "telephone": "(725) 158-4493 x318",
          "email": "Katharina88@gmail.com",
          "adresseId": null,
          "societeId": null
        }
      ],
      selectedClient: null,
      showedClient: false

    }
  }

  // componentDidMount() {
  //     AxiosCenter.getClientFournisseur().then(response => {
  //       this.state.clients = response.data ;
  //   }).catch(error => {
  //       console.log(error)
  //   })
  // }

  voirClient(client) {
    this.setState.selectedClient = client;
    this.setState.showedClient = true;
  }

  render() {
    return (

      <Router>

        <div className="container">
          <h2>La liste de client fournisseur </h2>
          <table className="table  table-striped table-bordered table-hover table-sm">
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
                  <tr>
                    <td scope="row">{c.nom}</td>
                    <td scope="row">{c.siren}</td>
                    <td scope="row">{c.email}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Link to="/3">
                          <button type="button" className="btn btn-info">
                            <span className="d-none d-md-inline">
                              Detail
                            </span>
                          </button>
                        </Link>
                        <button type="button" className="btn btn-primary">

                          <span className="d-none d-md-inline">
                            Moddifier
                        </span>
                        </button>
                        <button className="btn btn-danger" >
                          <span className="d-none d-md-inline">
                            Supprimer
                        </span>
                        </button>
                      </div>
                    </td>
                  </tr>



                ))
              ) : (<h1 className="text-center"> Pas des Client ... </h1>)}


            </tbody>
          </table>
          <Route path="/3" client={this.props.c} component={DetailClientFournisseur} />
        </div>
      </Router>

    )
  }
}

export default ListerClientFournisseur;



