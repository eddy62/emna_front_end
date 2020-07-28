
import React, { Component } from 'react';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'
import * as axios from 'axios';
import DetailsClientFournisseur from './detailsClientFournisseur';
// import ModalPage from './DetailsClientFournisseur';





class ListerClientFournisseur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clients:
        [
          {
            "idSociete": null,
            "id": 1,
            "nom": "AUCHAN SUPERMARCHE",
            "siren": 410,
            "telephone": "(977) 311-0055 x571",
            "email": "auchan@gmail.com",
            "idAdresse": 1,
            "numeroRue": "200",
            "boitePostale": "virtual",
            "nomRue": " RUE DE LA RECHERCHE",
            "codePostal": "59650",
            "ville": "Villeneuve-d'Ascq"
          },
          {
            "idSociete": null,
            "id": 2,
            "nom": "ivory transmit Salad",
            "siren": 58214,
            "telephone": "(688) 062-6690",
            "email": "Kenyatta77@yahoo.com",
            "idAdresse": 2,
            "numeroRue": "432",
            "boitePostale": "copying",
            "nomRue": "redundant Awesome Metal Chips Personal Loan Account",
            "codePostal": "59170",
            "ville": "CROIX"
          },
          {
            "idSociete": null,
            "id": 3,
            "nom": "SHETAK",
            "siren": 565,
            "telephone": "929-817-0424 x8121",
            "email": "SHETAK@yahoo.com",
            "idAdresse": 3,
            "numeroRue": "9",
            "boitePostale": "Central",
            "nomRue": "RUE DES FUSILLES",
            "codePostal": "0600",
            "ville": "CANNES"
          },
          {
            "idSociete": null,
            "id": 4,
            "nom": "Concrete",
            "siren": 195,
            "telephone": "302-850-4210",
            "email": "Concrete@gmail.com",
            "idAdresse": 4,
            "numeroRue": "90",
            "boitePostale": "Tactics Borders Object-based",
            "nomRue": "Small Fresh Chicken indexing",
            "codePostal": "13400",
            "ville": "Aubagne"
          },
          {
            "idSociete": null,
            "id": 5,
            "nom": "SOMARVRAC",
            "siren": 333,
            "telephone": "420-656-0346 x17661",
            "email": "SOMARVRAC@gmail.com",
            "idAdresse": 5,
            "numeroRue": "12",
            "boitePostale": "Metal bluetooth Rhode Island",
            "nomRue": "CHEMIN BASSIN PLAT",
            "codePostal": "97410",
            "ville": "Saint-Pierre"
          },
          {
            "idSociete": null,
            "id": 6,
            "nom": "LA FOURMI",
            "siren": 607,
            "telephone": "213-597-6970 x477",
            "email": "Fourmi@hotmail.com",
            "idAdresse": 6,
            "numeroRue": "97",
            "boitePostale": "Isle",
            "nomRue": "transmitter National",
            "codePostal": "59157",
            "ville": "LEERS"
          },
          {
            "idSociete": null,
            "id": 7,
            "nom": "Corporate",
            "siren": 730,
            "telephone": "719-650-3006 x6809",
            "email": "Lourdes_Little23@hotmail.com",
            "idAdresse": 7,
            "numeroRue": "87",
            "boitePostale": "Savings Account Soft",
            "nomRue": "AVENUE MARC SANGIER ",
            "codePostal": "59000",
            "ville": "Lille"
          },
          {
            "idSociete": null,
            "id": 8,
            "nom": "GAP SUD",
            "siren": 609,
            "telephone": "1-422-083-7614 x4941",
            "email": "Ila.Dicki@yahoo.com",
            "idAdresse": 8,
            "numeroRue": "777",
            "boitePostale": "AVENUE JEAN MOULIN",
            "nomRue": "AVENUE JEAN MOULIN",
            "codePostal": "82000",
            "ville": "MONTAUBAN"
          },
          {
            "idSociete": null,
            "id": 9,
            "nom": "MAGELI",
            "siren": 433,
            "telephone": "(342) 342-9221",
            "email": "Mageli43@gmail.com",
            "idAdresse": 9,
            "numeroRue": "654",
            "boitePostale": "Integration quantify",
            "nomRue": "wireless Central Down-sized",
            "codePostal": "59730",
            "ville": "Mons en Baroeul"
          },
          {
            "idSociete": null,
            "id": 10,
            "nom": "invoice Identity Licensed Fresh Gloves",
            "siren": 300,
            "telephone": "(725) 158-4493 x318",
            "email": "Katharina88@gmail.com",
            "idAdresse": 10,
            "numeroRue": "09",
            "boitePostale": "bypassing",
            "nomRue": "bandwidth unleash",
            "codePostal": "59800",
            "ville": "Lille"
          }
        ],

    }
  }



  componentDidMount() {
    axios.get(`http://localhost:8080/api/api/client-fournisseurs`, {
      headers: {
        // Authorization: "Basic " + "Og=="
        Authorization: "Bearer" + " eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTk2MDE1NzI2fQ.06jj-aRti9IiaA1dWDiQgqOzVQCoumycrXd3P_l7-0gZV9vuDikPxn8_VB_Ou_-_72aGT2dZeEsmRQIXVGb0vA"
      }
    })
      .then(response => {
        console.log(response)
        // this.setState.clients = response.data;
      })
  }

  // componentDidMount() {
  //     AxiosCenter.getClientFournisseur().then(response => {
  //       this.state.clients = response.data ;
  //   }).catch(error => {
  //       console.log(error)
  //   })
  // }


  render() {
    return (

      <div className="container">
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

                < tr key={index} >
                  <td scope="row">{c.nom}</td>
                  <td scope="row">{c.siren}</td>
                  <td scope="row">{c.email}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <DetailsClientFournisseur client={c} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (<h1 className="text-center"> Pas des Client ... </h1>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListerClientFournisseur;


