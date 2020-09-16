import React, { Component } from "react";
import "./../style2.scss";
import { MDBContainer, MDBCardHeader, MDBCardTitle, MDBRow, MDBCol, MDBBtn, MDBCard } from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading"
import { Link } from "react-router-dom";
import TableAbsence from "./tableUpdate/TableAbsence";
import TablePrime from "./tableUpdate/TablePrime"
import TableHeureSup from "./tableUpdate/TableHeureSup";
import TableAvanceRappelSalaire from "./tableUpdate/TableAvanceRappelSalaire";
import TableNoteDefrais from "./tableUpdate/TableNoteDeFrais";
import {toast} from "react-toastify";

let messageToast = '';

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>{messageToast}</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>{messageToast}</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{messageToast}</strong>
                </div>,
            );
            break;
    }
};

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
        autresVariableList: [],
        key: '',
        idToDelete: '',
        modalHeure: false,
        submitForm: false,
        wrapperVariablesPaie: [],
        enableBtnConfirmer: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.reloadParentAfterUpdate = this.reloadParentAfterUpdate.bind(this);
    }

    /*Methode qui appelle le wrapper variables de paie */
    getWrapperPayrollVariablesByEmployeIdByYearByMonth = () => {
        AxiosCenter.getWrapperPayrollVariablesByEmployeIdByYearByMonth(this.state.idEmploye, this.state.yearSelected, this.state.monthSelected)
        .then((response) => {         
            const absenceList = response.data.wrapperAbsenceList;
            const heureSupList = response.data.heuresSupplementairesDTOList;
            const primeList = response.data.wrapperPrimeList;            
            const noteDeFraisList = response.data.noteDeFraisDTOList;
            const avanceRappelSalaireList = response.data.avanceRappelSalaireDTOList;
            const autresVariableList = response.data.autresVariableDTOList;
            let afficherBoutonConfirmer = false;
            if ((absenceList.find(variablePaie =>  variablePaie.etatVariablePaieId === 1) !== undefined)
                || (heureSupList.find(variablePaie =>  variablePaie.etatVariablePaieId === 1) !== undefined)
                || (primeList.find(variablePaie =>  variablePaie.etatVariablePaieId === 1) !== undefined)
                || (noteDeFraisList.find(variablePaie =>  variablePaie.etatVariablePaieId === 1) !== undefined)
                || (avanceRappelSalaireList.find(variablePaie =>  variablePaie.etatVariablePaieId === 1) !== undefined)
                || (autresVariableList.find(variablePaie =>  variablePaie.etatVariablePaieId === 1) !== undefined))
                {afficherBoutonConfirmer = true;}
            this.setState({
                absenceList,
                heureSupList,
                primeList,
                noteDeFraisList,
                avanceRappelSalaireList,
                autresVariableList,
                enableBtnConfirmer:afficherBoutonConfirmer,
                loaded:true
            })
        });
    };

    /* Méthode de mise à jour de wrapperVariablesPaie[] par les 6 tableaux de variables pour Confirmation */
    setWrapperVariablesPaieForConfirmation = () => {
        const wrapperVariablesPaieToConfirm = {
            wrapperAbsenceList: this.state.absenceList.filter(absence => absence.etatVariablePaieId === 1),
            autresVariableDTOList: [],
            avanceRappelSalaireDTOList: this.state.avanceRappelSalaireList.filter(avanceRappelSalaire => avanceRappelSalaire.etatVariablePaieId === 1),
            heuresSupplementairesDTOList: this.state.heureSupList.filter(heureSup => heureSup.etatVariablePaieId === 1),
            noteDeFraisDTOList: this.state.noteDeFraisList.filter(noteDeFrais => noteDeFrais.etatVariablePaieId === 1),
            wrapperPrimeList: this.state.primeList.filter(prime => prime.etatVariablePaieId === 1)
        };
        // TODO : intégrer autresVariableList
        // ,this.state.autresVariableList.filter(autresVariable => autresVariable.etatVariablePaieId === 1)
        console.log("wrapperVariablesPaieToConfirm");
        console.log(wrapperVariablesPaieToConfirm);
        this.confirmPayrollVariables(wrapperVariablesPaieToConfirm);
    }


    // Envoi au Back de wrapperVariablesPaieToConfirm
    confirmPayrollVariables = (envoi) => {
        AxiosCenter.confirmPayrollVariables(envoi).then((response) => {
            console.log('response.data');
            console.log(response.data);
            console.log(response.status);
            messageToast = response.data;
            switch (response.status) {
                case 201:
                    notify("success");
                    break;
                case 206:
                    notify("warning");
                    break;
                case 400:
                    notify("error");
                    break;
                default:
                    notify("error");
                    break;
            }
            this.reloadParentAfterUpdate();
        }).catch((error) => {
            console.log(error);
            notify("error");
        });
    }

    componentDidMount() {
        //Récupération de l'id de la société
        const societyId = this.props.match.params.societyId;
        const employeId = this.props.match.params.id;
        this.setState({ societyId, idEmploye: employeId }, () => {
            this.getWrapperPayrollVariablesByEmployeIdByYearByMonth()
        })

        //Récupération de la liste des employés à travers l'id de la société
        AxiosCenter.getAllWrapperEmployesBySociety(societyId)
            .then((response) => {
                const listeEmployes = response.data;
                this.setState({ listeEmployes: listeEmployes });
            });

        AxiosCenter.getSocietyById(societyId)
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
            this.getWrapperPayrollVariablesByEmployeIdByYearByMonth();
        })
    };

    reloadParentAfterUpdate() {
        this.getWrapperPayrollVariablesByEmployeIdByYearByMonth();
    }

    handleClick(compName, key) {
        console.log(key);
        this.setState({ render: compName, key });
    }

    render() {
        if (!this.state.loaded) return <Loading />
        else return (
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
                                <form className="d-flex flex-row p-4" style={{ width: "100%", justifyContent: "space-around" }}>
                                    <div>
                                        <label>Nom de l'employé</label>
                                        <select
                                            name="idEmploye"
                                            className="browser-default custom-select"
                                            onChange={this.changeHandler}
                                            value={this.state.idEmploye}
                                        >
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
                                                <option key={index} selected={p.id === this.state.monthSelected} value={p.id} disabled={p.id > new Date().getMonth() + 1 ? (true) : (false)}>{p.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </MDBRow>
                        </div>
                        {/**FIN SELECTS */}

                        <h3 className="card-title mb-4">Détails des Variables de Paie</h3>
                        {/**CONTENT */}

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <MDBCard>
                                {<TableAbsence reloadParentAfterUpdate={this.reloadParentAfterUpdate} changeHandler={this.changeHandler} absenceList={this.state.absenceList} handleClick={this.handleClick} />}
                            </MDBCard>
                            <MDBCard className="mt-1">
                                {<TableNoteDefrais noteDeFraisList={this.state.noteDeFraisList} reloadParentAfterUpdate={this.reloadParentAfterUpdate} changeHandler={this.changeHandler} handleClick={this.handleClick} />}
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
                                <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm"
                                        onClick={() => {
                                            this.props.history.push(
                                                "/variables_de_paie/addVariablePaie/ParentAddVariablePaie/" + this.state.society.id + "/" + this.state.idNameSelected);
                                        }}>
                                    Ajouter
                                </MDBBtn>
                            </MDBCol>

                            <MDBCol md="4">
                                <Link to="/socialHome/1">
                                    <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm">
                                        Retour
                                    </MDBBtn>
                                </Link>
                            </MDBCol>

                            <MDBCol md="4">
                                <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm" disabled={!this.state.enableBtnConfirmer}
                                    onClick={
                                        this.setWrapperVariablesPaieForConfirmation
                                    }>
                                Confirmer
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>

                    </MDBContainer>
                </div>
            </div>
        )
    }
}
