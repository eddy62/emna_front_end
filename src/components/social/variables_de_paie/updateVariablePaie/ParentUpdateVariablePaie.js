import React, { Component } from "react";
import "./../style2.scss";
import { MDBContainer, MDBCardHeader, MDBCardTitle, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCol, MDBBtn, MDBCard  } from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading"
import { Link } from "react-router-dom";

export default class ParentUpdateVariablePaie extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          society: {},
          idEmploye: this.props.match.params.id,
          listeEmployes: [],
          yearSelected: new Date().getFullYear(),
          monthSelected: new Date().getMonth()+1,
          period: [
            {id: 1, text: "Janvier"},
            {id: 2, text: "Février"},
            {id: 3, text: "Mars"},
            {id: 4, text: "Avril"},
            {id: 5, text: "Mai"},
            {id: 6, text: "Juin"},
            {id: 7, text: "Juillet"},
            {id: 8, text: "Août"},
            {id: 9, text: "Septembre"},
            {id: 10, text: "Octobre"},
            {id: 11, text: "Novembre"},
            {id: 12, text: "Décembre"}
        ],
        year: [
            {item: new Date().getFullYear()},
            {item: new Date().getFullYear()-1},
            {item: new Date().getFullYear()-2},
            {item: new Date().getFullYear()-3},
            {item: new Date().getFullYear()-4},
            {item: new Date().getFullYear()-5},
        ],
        absenceList: [],
        heureSupList: [],
        primeList: [],
        noteDeFraisList: [],
        avanceRappelSalaireList: []
        };
      }

      componentDidMount() {
        //Récupération de l'id de la société
      const societyId = this.props.match.params.societyId;
      const employeId = this.props.match.params.id;
      this.setState({ societyId, idEmploye: employeId }, () => {
        AxiosCenter.getOneWrapperVariablesDePaie(this.state.idEmploye, this.state.yearSelected, this.state.monthSelected)
        .then((response) => {            
            const absenceList = response.data.wrapperAbsenceList;
            const heureSupList = response.data.heuresSupplementairesDTOList;
            const primeList = response.data.wrapperPrimeList;            
            const noteDeFraisList = response.data.noteDeFraisDTOList;
            const avanceRappelSalaireList = response.data.avanceRappelSalaireDTOList;
                       console.log("Response data");
            console.log(response.data);
            console.log({absenceList});
            console.log({heureSupList});
            console.log({primeList});
            console.log({noteDeFraisList});
            console.log({avanceRappelSalaireList});
            this.setState({
                absenceList: absenceList,
                heureSupList: heureSupList,
                primeList: primeList,
                noteDeFraisList: noteDeFraisList,
                avanceRappelSalaireList: avanceRappelSalaireList,
                loaded:true})
        });
      })

      //Récupération de la liste des employés à travers l'id de la société
      AxiosCenter.getAllWrapperEmployesBySociety(societyId)
      .then((response) => {
          const listeEmployes = response.data;
          this.setState({ listeEmployes: listeEmployes });
      });

      AxiosCenter.getSociete(societyId)
        .then((response) => {
            const society = response.data;
            this.setState({ society });
        })
        .catch((error) => {
            console.log(error);
        });
    }
        //Méthode permettant de setter le State des selects qui sont transmis aux composants enfant
        changeHandler = event => {
            this.setState({ [event.target.name]: event.target.value }, () => {
                AxiosCenter.getOneWrapperVariablesDePaie(this.state.idEmploye, this.state.yearSelected, this.state.monthSelected)
                .then((response) => {         
                    const absenceList = response.data.wrapperAbsenceList;
                    const heureSupList = response.data.heuresSupplementairesDTOList;
                    const primeList = response.data.wrapperPrimeList;            
                    const noteDeFraisList = response.data.noteDeFraisDTOList;
                    const avanceRappelSalaireList = response.data.avanceRappelSalaireDTOList;
                    console.log("changeHandler")
                    console.log({absenceList});
                    console.log({heureSupList});
                    console.log({primeList});
                    console.log({noteDeFraisList});
                    console.log({avanceRappelSalaireList});
                    this.setState({
                        absenceList,
                        heureSupList,
                        primeList,
                        noteDeFraisList,
                        avanceRappelSalaireList,
                        loaded:true
                    })
                });
            })            
        };

            NoteDeFraisTable = () => {
            return (
              <MDBTable>
                <MDBTableHead color="default-color">
                  <tr>
                    <th className="font-weight-bold">Note de frais</th>
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Justificatif(s)</th>
                    <th className="w-25"></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                {this.state.noteDeFraisList.map((frais, index) => (
                    <tr key={index}>
                        <td>{frais.designation}</td>
                        <td>{frais.date}</td>
                        <td>{frais.montant} €</td>
                        <td>{frais.justificatif}</td>
                        {frais.etatVariablePaieId === 1 ? (
                            <td>
                                <MDBBtn color="teal accent-3" rounded size="sm">UPDATE</MDBBtn>
                                <MDBBtn color="danger" rounded size="sm">DELETE</MDBBtn>
                            </td>
                        ) : (
                            <td>Confirmé</td>
                        )}
                    </tr>
                ))}          
                </MDBTableBody>
              </MDBTable>
            );
          }

          AbsenceTable = () => {
            return (
              <MDBTable>
                <MDBTableHead color="default-color">
                  <tr>
                    <th className="font-weight-bold">Absence</th>
                    <th>Du</th>
                    <th>Au</th>
                    <th>Justificatif(s)</th>
                    <th className="w-25"></th>
                  </tr>
                </MDBTableHead>
                
                {this.state.absenceList.length ? (
                    <MDBTableBody>
                        {this.state.absenceList.map((abs, index) => (
                            <tr key={index}>
                                <td>{abs.intitule}</td>
                                <td>{abs.debutAbsence}</td>
                                <td>{abs.finAbsence}</td>
                                <td>{abs.justificatif}</td>
                                {abs.etatVariablePaieId === 1 ? (
                                    <td>
                                        <MDBBtn color="teal accent-3" rounded size="sm">UPDATE</MDBBtn>
                                        <MDBBtn color="danger" rounded size="sm">DELETE</MDBBtn>
                                    </td>
                                ) : (
                                    <td>Confirmé</td>
                                )}
                            </tr>
                        ))}          
                        </MDBTableBody>
                ) : (
                    <MDBTableBody className="w-100 d-flex justify-content-center">
                        <tr>
                            <td colSpan="5">Pas d'absence ce mois</td>
                        </tr>
                    </MDBTableBody>
                )}
              </MDBTable>
            );
          }

          PrimeTable = () => {
              
            console.log(this.state.primeList);
            return (
              <MDBTable>
                <MDBTableHead color="default-color">
                  <tr>
                    <th className="font-weight-bold">Prime</th>
                    <th>Montant</th>
                    <th className="w-25"></th>
                  </tr>
                </MDBTableHead>
                {this.state.primeList.length ? (
                    <MDBTableBody>
                    {this.state.primeList.map((prime, index) => (
                        <tr key={index}>
                            <td>{prime.type}</td>
                            <td>{prime.montant} €</td>
                            {prime.etatVariablePaieId === 1 ? (
                                <td>
                                    <MDBBtn color="teal accent-3" rounded size="sm">UPDATE</MDBBtn>
                                    <MDBBtn color="danger" rounded size="sm">DELETE</MDBBtn>
                                </td>
                            ) : (
                                <td>Confirmé</td>
                            )}
                        </tr>
                    ))}          
                    </MDBTableBody>
                ) : (
                    <MDBTableBody className="w-100 d-flex justify-content-center">
                    <tr>
                        <td colSpan="3">Pas de prime ce mois</td>
                    </tr>
                    </MDBTableBody>
                )}
                
              </MDBTable>
            );
          }

          HeureSuppTable = () => {
            return (
              <MDBTable>
                <MDBTableHead color="default-color">
                  <tr>
                    <th className="font-weight-bold">Nombre d'heures supplémentaires</th>
                    <th>Date</th>
                    <th className="w-25"></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                {this.state.heureSupList.map((hsupp, index) => (
                    <tr key={index}>
                        <td>{hsupp.nombreHeure} heure(s)</td>
                        <td>{hsupp.date}</td>
                        {hsupp.etatVariablePaieId === 1 ? (
                            <td>
                                <MDBBtn color="teal accent-3" rounded size="sm">UPDATE</MDBBtn>
                                <MDBBtn color="danger" rounded size="sm">DELETE</MDBBtn>
                            </td>
                        ) : (
                            <td>Confirmé</td>
                        )}
                    </tr>
                ))}          
                </MDBTableBody>
              </MDBTable>
            );
          }

          RappelAvanceTable = () => {
            return (
              <MDBTable>
                <MDBTableHead color="default-color">
                  <tr>
                    <th className="font-weight-bold">Montant Rappel/Avance sur Salaire</th>
                    <th className="w-25"></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                {this.state.avanceRappelSalaireList.map((avrap, index) => (
                    <tr key={index}>
                        <td>{avrap.montant} €</td>
                        {avrap.etatVariablePaieId === 1 ? (
                            <td>
                                <MDBBtn color="teal accent-3" rounded size="sm">UPDATE</MDBBtn>
                                <MDBBtn color="danger" rounded size="sm">DELETE</MDBBtn>
                            </td>
                        ) : (
                            <td>Confirmé</td>
                        )}
                    </tr>
                ))}          
                </MDBTableBody>
              </MDBTable>
            );
          }


      render() {
        if (!this.state.loaded) return <Loading/>
        else return(
            <div className="App">
                <div className="social">
                    <MDBContainer>
                        <div className="titre">
                            <MDBCardHeader color="default-color">
                                <MDBCardTitle tag="h2">Raison Sociale {this.state.society.civilite}</MDBCardTitle>
                            </MDBCardHeader>
                        </div>
                        {/**SELECTS */}
                        <div className="selects">
                            <MDBRow>
                                <form className="d-flex flex-row p-4" style={{width: "100%", justifyContent: "space-around"}}>
                                        <div>
                                        <label>Nom de l'employé</label>
                                            <select
                                                name="idEmploye"
                                                className="browser-default custom-select"
                                                onChange={this.changeHandler}                                                    
                                            >                                        
                                                {/*<option disabled selected>Choisissez employé</option>*/}
                                                {this.state.listeEmployes.map((employe) => (
                                                    <option key={employe.id} value={employe.id}>{employe.nomUsage}</option>
                                                ))}
                                            </select>
                                        </div>
                                    <div>
                                        <label>Année</label>
                                        <select
                                            name="yearSelected"
                                            className="browser-default custom-select"
                                            onChange={this.changeHandler}
                                        >
                                            <option disabled>Choisissez une année</option>
                                            {this.state.year.map((y, index) => (
                                                <option key={index} value={y.item}>{y.item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label>Mois</label>
                                        <select
                                            name="monthSelected"
                                            className="browser-default custom-select"
                                            onChange={this.changeHandler}
                                        >
                                            <option disabled defaultValue={new Date().getMonth()}>Choisissez un mois</option>
                                            {this.state.period.map((p, index) => (
                                                <option key={index} selected={p.id === this.state.monthSelected} value={p.id}>{p.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>                                                                                      
                            </MDBRow>                              
                        </div>

                        <h3 className="card-title mb-4">Détails des Variables de Paie</h3>
                        {/**CONTENT */}
                                <div style={{display:"flex",flexDirection:"column"}}>                                                                                         
                                    <MDBCard className="mt-1">
                                        {this.NoteDeFraisTable()}
                                    </MDBCard>                                                        
                                    <MDBCard>
                                        {this.AbsenceTable()}
                                    </MDBCard>                                                        
                                    <MDBCard>
                                        {this.PrimeTable()}
                                    </MDBCard>
                                    <MDBCard>
                                        {this.HeureSuppTable()}
                                    </MDBCard>
                                    <MDBCard>
                                        {this.RappelAvanceTable()}
                                    </MDBCard>
                                </div>
                            {/**FOOTER BTN */}
                            <MDBRow between around className="mt-3">
                                <MDBCol md="4">
                                    <Link to="/socialHome/1">
                                        <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm">
                                        Ajouter
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>

                                <MDBCol md="4">
                                        <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm"
                                        onClick={() => {
                                            this.props.history.push(
                                                "/variables_de_paie/addVariablePaie/ParentAddVariablePaie/" + this.state.society.id + "/" + this.state.idNameSelected
                                            );
                                        }}>
                                        Retour
                                        </MDBBtn>
                                </MDBCol>

                                <MDBCol md="4">
                                <Link to="/socialHome/1">
                                        <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm">
                                        Confirmer
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>
                            </MDBRow>

                        </MDBContainer>
                    </div>
                </div>
            )
        }
    }