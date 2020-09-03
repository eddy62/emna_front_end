import React, { Component } from "react";
import { Formik, Field } from "formik";
import "./../style2.scss";
import { Link } from "react-router-dom";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import { MDBCardTitle, MDBCardHeader, MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCollapseHeader, MDBCollapse, MDBCardBody } from "mdbreact";
import Component1 from "./Component1";
import Absence from "./Absence";
import CreateAbsence from "./children/CreateAbsence";
import CreatePrime from "./children/CreatePrime";
import CreateAvanceRappelSalaire from "./children/CreateAvanceRappelSalaire";
import CreateNoteDeFrais from "./children/CreateNoteDeFrais";
import CreateHeuresSupplementaires from "./children/CreateHeuresSupplementaires"

export default class ParentAddVariablePaie extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          listeEmployes: [],
          idNameSelected: '',
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
        ]
        };
        console.log(this.state.monthSelected);
      }
      
      componentDidMount() {
          //Récupération de l'id de la société
        const idSociete = this.props.match.params.id;
        //console.log(idSociete);
        AxiosCenter.getSociete(idSociete)
        .then((response) => {
            const societe = response.data;
            this.setState({ societe: societe });
        })
        .catch((error) => {
            console.log(error);
        });

        //Récupération de la liste des employés à travers l'id de la société
        AxiosCenter.getAllWrapperEmployesBySociety(idSociete)
        .then((response) => {
            const listeEmployes = response.data;
            //console.log(listeEmployes);
            this.setState({ listeEmployes: listeEmployes });
            //console.log(JSON.stringify(this.state.listeEmployes));
        });
        
      }

    //Méthode permettant d'ouvrir les cards des variables de paie
    toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

    //Méthode permettant de setter le State des selects qui sont transmis aux composants enfant
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value }, function () {
        console.log(this.state)
        });
    };
      
    render() {
        const { collapseID } = this.state;
        /*const list = this.state.listeEmployes;
        console.log(list);*/
        console.log(this.state.monthSelected);
        return (
            <div className="App">
                <div className="social">
                    <MDBContainer>
                        <div className="titre">
                            <MDBCardHeader color="default-color">
                                <MDBCardTitle tag="h2">Raison Sociale Société</MDBCardTitle>
                            </MDBCardHeader>
                        </div>

                        <div className="selects">
                            <MDBRow>
                                <form className="d-flex flex-row p-4" style={{width: "100%", justifyContent: "space-around"}}>
                                        <div>
                                            <label>Nom de l'employé</label>
                                            <select
                                                name="idNameSelected"
                                                className="browser-default custom-select"
                                                onChange={this.changeHandler}
                                                
                                            >                                        
                                                <option disabled selected>Choisissez employé</option>
                                                {this.state.listeEmployes.map((employe) => (
                                                    <option value={employe.id}>{employe.nomUsage}</option>
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
                                            {this.state.year.map((y) => (
                                                <option value={y.item}>{y.item}</option>
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
                                            {this.state.period.map((p) => (
                                                <option selected={p.id === this.state.monthSelected} value={p.id}>{p.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>                                                                                      
                            </MDBRow>                              
                        </div>

                        <h3 className="card-title mb-4">Variables Mensuelles de Paie</h3>

                        <div className="content d-flex flex-row">
                            <div className="cardContent">
                                <MDBContainer>
                                    <MDBContainer className="mt-5 mb-5">                                            
                                        <MDBCard className="mt-3">
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse1")} className="bg-transparent">
                                                Absences
                                                <i className={ collapseID==="collapse1" ? "fa fa-angle-up" : "fa fa-angle-down" } />
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse1" isOpen={collapseID}>                            
                                                <MDBCardBody>
                                                {this.state.idNameSelected ? (                                                    
                                                    <CreateAbsence employeId={this.state.idNameSelected} yearSelected={this.state.yearSelected} monthSelected={this.state.monthSelected}/>
                                                ) : (
                                                    <p>Veuillez choisir un employé</p>
                                                )}
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard>
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse2")} className="bg-transparent">
                                                Heures supplémentaires
                                                <i className={ collapseID==="collapse2" ? "fa fa-angle-up" : "fa fa-angle-down" } />
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse2" isOpen={collapseID}>
                                                <MDBCardBody>
                                                {this.state.idNameSelected ? (
                                                <CreateHeuresSupplementaires employeId={this.state.idNameSelected} yearSelected={this.state.yearSelected} monthSelected={this.state.monthSelected}/>
                                                ) : (
                                                    <p>Veuillez choisir un employé</p>
                                                )}
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>


                                        <MDBCard>
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse3")} className="bg-transparent">
                                                Prime
                                                <i className={ collapseID==="collapse3" ? "fa fa-angle-up" : "fa fa-angle-down" } />
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse3" isOpen={collapseID}>
                                                <MDBCardBody>
                                                {this.state.idNameSelected ? (
                                                    <CreatePrime employeId={this.state.idNameSelected} yearSelected={this.state.yearSelected} monthSelected={this.state.monthSelected} />
                                                ) : (
                                                    <p>Veuillez choisir un employé</p>
                                                )}                                                    
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard>
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse4")} className="bg-transparent">
                                                Note de frais
                                                <i className={ collapseID==="collapse4" ? "fa fa-angle-up" : "fa fa-angle-down" } />
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse4" isOpen={collapseID}>
                                                <MDBCardBody>
                                                {this.state.idNameSelected ? (
                                                    <CreateNoteDeFrais employeId={this.state.idNameSelected} yearSelected={this.state.yearSelected} monthSelected={this.state.monthSelected} />
                                                ) : (
                                                    <p>Veuillez choisir un employé</p>
                                                )}                                                    
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard>
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse5")} className="bg-transparent">
                                            Rappel/Avance sur salaire
                                                <i className={ collapseID==="collapse5" ? "fa fa-angle-up" : "fa fa-angle-down" } />
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse5" isOpen={collapseID}>
                                                <MDBCardBody>
                                                {this.state.idNameSelected ? (
                                                    <CreateAvanceRappelSalaire employeId={this.state.idNameSelected} yearSelected={this.state.yearSelected} monthSelected={this.state.monthSelected} />
                                                ) : (
                                                    <p>Veuillez choisir un employé</p>
                                                )}                                                    
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard className="mb-3">
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse6")} className="bg-transparent">
                                            Autre
                                                <i className={ collapseID==="collapse6" ? "fa fa-angle-up" : "fa fa-angle-down" } />
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse6" isOpen={collapseID}>
                                                <MDBCardBody>
                                                {this.state.idNameSelected ? (
                                                    <div></div>
                                                ) : (
                                                    <p>Veuillez choisir un employé</p>
                                                )}
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>
                                    </MDBContainer>
                                </MDBContainer>
                            </div>

                            <div className="btnContent">
                                <div className="btnConainer">
                                    <Link to="">
                                        <MDBBtn color="teal accent-3" rounded size="sm"
                                            onClick={() => {
                                                this.props.history.push(
                                                ""
                                                );
                                            }}
                                            >
                                            Voir Détail
                                        </MDBBtn>
                                    </Link>
                                                        
                                    <Link to="/socialHome/1">
                                        <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm">
                                        Retour Home Social
                                        </MDBBtn>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </MDBContainer>
                </div>
            </div>
        )
    }
}