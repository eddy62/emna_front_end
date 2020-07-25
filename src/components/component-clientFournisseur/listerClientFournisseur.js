
import React, { Component } from 'react';
import AxiosCenter from 'C:/gitStage/EMNA/emna_front_end/src/shared/services/AxiosCenter'



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
      selectedClient: null
    }
  }

  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //     .then( response => response.data )
  //     .then( users => this.setState({ users }) )
  //     .catch( err => console.log(err))

  //     AxiosCenter.getClientFournisseur().then(response => {
  //       this.state.clients = response.data ;
  //   }).catch(error => {
  //       console.log(error)
  //   })
  // }

  render() {
    return (

    
    //   <div className="w-75 d-flex flex-row flex-wrap align-content-start">
    //     <div className="w-100 d-flex flex-row flex-wrap justify-content-center my-3">
    //   { this.state.clients && this.state.clients.length ? (
    //     this.state.clients.map( (c, index) => (
    //       <div key={ c.id }  className="card m-2" style={ { width: '200px'} }>
           
    //           <ul className="list-group">
    //           <li className="list-group-item" >{ c.nom }</li>
    //             <li className="list-group-item" >{ c.siren }</li>
    //             <li className="list-group-item" >{ c.email }</li>
    //             <li className="list-group-item" >{ c.telephone }</li>
          
              
    //           </ul>
            
    //       </div>
    //     ))
    //   ) : (<h1 className="text-center"> Pas des Client ... </h1>) }
    // </div>
    //   </div>

<div class="container">
   <h2>La liste de client fournisseur </h2>           
   <table class="table">
      <thead>
       <tr>
         <th>Nom</th>
        <th>SIREN</th>
        <th>Email</th>
        <th>TEL</th>
       </tr>
      </thead>
     <tbody>
      { this.state.clients && this.state.clients.length ? (
        this.state.clients.map( (c, index) => (
          
        <tr>
           <td>{ c.nom }</td>
          <td>{ c.siren }</td>
         <td>{ c.email }</td>
         <td>{ c.telephone }</td>
       </tr>

     
      
        ))
      ) : (<h1 className="text-center"> Pas des Client ... </h1>) }
 

    </tbody>
 </table>
</div>

 )
  }
}

export default ListerClientFournisseur;



