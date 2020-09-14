import React, { Component } from "react";
import "./../style2.scss";
import { MDBContainer, MDBCardHeader, MDBCardTitle, MDBRow, MDBCol, MDBBtn, MDBCard } from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading"
import { Link } from "react-router-dom";
import AbsenceComponent from "./children/AbsenceComponent";
import TableNoteDeFrais from "./tableUpdate/TableNoteDeFrais";
import TableAbsence from "./tableUpdate/TableAbsence";
import NoteDeFraisComponent from "./children/NoteDeFraisComponent";
import TablePrime from "./tableUpdate/TablePrime"
import PrimeComponent from "./children/PrimeComponent";
import TableHeureSup from "./tableUpdate/TableHeureSup";
import TableAvanceRappelSalaire from "./tableUpdate/TableAvanceRappelSalaire";
import ModifyAvanceRappelSalaire from "./children/ModifyAvanceRappelSalaire";
import UpdateAbsence from "./children/UpdateAbsence";

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
        avanceRappelSalaireList: [],
        key: '',
        idToDelete: '', 
        modalHeure: false,
        submitForm: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.reloadParentAfterUpdate = this.reloadParentAfterUpdate.bind(this);
    }

    /*Methode qui appel le wrapper variables de paie */
    getOneWrapperVariablesDePaie = () => {
        AxiosCenter.getOneWrapperVariablesDePaie(this.state.idEmploye, this.state.yearSelected, this.state.monthSelected)
        .then((response) => {         
            const absenceList = response.data.wrapperAbsenceList;
            const heureSupList = response.data.heuresSupplementairesDTOList;
            const primeList = response.data.wrapperPrimeList;            
            const noteDeFraisList = response.data.noteDeFraisDTOList;
            const avanceRappelSalaireList = response.data.avanceRappelSalaireDTOList;
            this.setState({
                absenceList,
                heureSupList,
                primeList,
                noteDeFraisList,
                avanceRappelSalaireList,
                loaded:true
            })
            console.log(this.state.absenceList);
        });
    }

    componentDidMount() {
        //Récupération de l'id de la société
        const societyId = this.props.match.params.societyId;
        const employeId = this.props.match.params.id;
        this.setState({ societyId, idEmploye: employeId }, () => {
            this.getOneWrapperVariablesDePaie()
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
            this.getOneWrapperVariablesDePaie();
        })            
    };

    /*getIdToDelete(compName, key) {
            console.log(key);
        this.setState({render:compName, key})        }*/

        /*reloadParentAfterUpdate() {
            this.setState({submitForm: true});       
        }*/

    reloadParentAfterUpdate() {
        this.getOneWrapperVariablesDePaie();
    }

    handleClick(compName, key) {
        console.log(key);
        this.setState({render:compName, key});       
    }
    
    _renderSubComp(){
        switch(this.state.render){
            case 'NoteDeFraisComponent': return <NoteDeFraisComponent object={this.state.noteDeFraisList[this.state.key]}/>
            break;
            case 'AbsenceComponent': return <AbsenceComponent object={this.state.absenceList[this.state.key]}/>
            break;
            case 'PrimeComponent': return <PrimeComponent object={this.state.primeList[this.state.key]}/>
            break;
            case 'ModifyAvanceRappelSalaire': return <ModifyAvanceRappelSalaire avanceRappelSalaireList={this.state.avanceRappelSalaireList[this.state.key]}/>
            break;
        }
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
                        {/**FIN SELECTS */}

                        <h3 className="card-title mb-4">Détails des Variables de Paie</h3>
                        {/**CONTENT */}
                        
                        {this._renderSubComp()}
                        <div style={{display:"flex",flexDirection:"column"}}>                                                                                         
                            <MDBCard className="mt-1">
                                {<TableNoteDeFrais noteDeFraisList={this.state.noteDeFraisList} handleClick={this.handleClick}/>}
                            </MDBCard>                                                        
                            <MDBCard>
                                {<TableAbsence reloadParentAfterUpdate={this.reloadParentAfterUpdate} changeHandler={this.changeHandler} absenceList={this.state.absenceList} handleClick={this.handleClick} />}
                            </MDBCard>                                                        
                            <MDBCard>
                                {<TablePrime reloadParentAfterUpdate={this.reloadParentAfterUpdate} changeHandler={this.changeHandler} primeList={this.state.primeList} handleClick={this.handleClick} />}                                        
                            </MDBCard>
                            <MDBCard>
                                {<TableHeureSup reloadParentAfterUpdate={this.reloadParentAfterUpdate} changeHandler={this.changeHandler} heureSupList={this.state.heureSupList} handleClick={this.handleClick} />}                                        
                            </MDBCard>
                            <MDBCard>
                                {<TableAvanceRappelSalaire reloadParentAfterUpdate={this.reloadParentAfterUpdate} changeHandler={this.changeHandler} avanceRappelSalaireList={this.state.avanceRappelSalaireList} handleClick={this.handleClick} />}
                                

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
                                            "/variables_de_paie/addVariablePaie/ParentAddVariablePaie/" + this.state.society.id + "/" + this.state.idNameSelected);
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