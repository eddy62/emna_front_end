import React, {Component} from "react";
import "../PayrollVariables.scss";
import {MDBBtn, MDBCard, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading"
import {Link} from "react-router-dom";
import TableAbsence from "./table-update/TableAbsence";
import TableBonus from "./table-update/TableBonus"
import TableOvertime from "./table-update/TableOvertime";
import TablePaydayAdvanceReminder from "./table-update/TablePaydayAdvanceReminder";
import TableNoteDefrais from "./table-update/TableExpenseReport";
import {toast} from "react-toastify";
import TableOtherPayrollVariable from "./table-update/TableOtherPayrollVariable";
import stock from "../../../../shared/stockage.js";

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

export default class ParentUpdatePayrollVariables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            society: {},
            idEmploye: this.props.match.params.id,
            listeEmployes: [],
            currentYear: new Date().getFullYear(),
            yearSelected: this.props.match.params.yearSelected,
            monthSelected: this.props.match.params.monthSelected,
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
                {item: new Date().getFullYear() - 1},
                {item: new Date().getFullYear() - 2},
                {item: new Date().getFullYear() - 3},
                {item: new Date().getFullYear() - 4},
                {item: new Date().getFullYear() - 5},
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
            const noteDeFraisList = response.data.wrapperNoteDeFraisList;
            const avanceRappelSalaireList = response.data.avanceRappelSalaireDTOList;
            const autresVariableList = response.data.wrapperAutresVariableList;

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
                //absenceDocumentList,
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
            wrapperAutresVariableList: this.state.autresVariableList.filter(autresVariable => autresVariable.etatVariablePaieId === 1),
            avanceRappelSalaireDTOList: this.state.avanceRappelSalaireList.filter(avanceRappelSalaire => avanceRappelSalaire.etatVariablePaieId === 1),
            heuresSupplementairesDTOList: this.state.heureSupList.filter(heureSup => heureSup.etatVariablePaieId === 1),
            wrapperNoteDeFraisList: this.state.noteDeFraisList.filter(noteDeFrais => noteDeFrais.etatVariablePaieId === 1),
            wrapperPrimeList: this.state.primeList.filter(prime => prime.etatVariablePaieId === 1)
        };
        this.confirmPayrollVariables(wrapperVariablesPaieToConfirm);
    }


    // Envoi au Back de wrapperVariablesPaieToConfirm
    confirmPayrollVariables = (envoi) => {
        AxiosCenter.confirmPayrollVariables(envoi).then((response) => {
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
        window.scrollTo(0, 0)
        //Récupération de l'id de la société
        const societyId = this.props.match.params.societyId;
        const employeId = this.props.match.params.id;
        this.setState({ societyId, idEmploye: employeId }, () => {
            this.getWrapperPayrollVariablesByEmployeIdByYearByMonth()
        })

        //Récupération de la liste des employés à travers l'id de la société
        AxiosCenter.getAllEmployesBySociety(societyId)
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
        this.setState({ [event.target.name]: event.target.value }, async () => {
            const currentMonth = new Date().getMonth() + 1;
            if (this.state.yearSelected === "2020" && this.state.monthSelected > currentMonth){
                await this.setState({
                    monthSelected: currentMonth
                })
            }
            this.getWrapperPayrollVariablesByEmployeIdByYearByMonth();
        })
    };

    reloadParentAfterUpdate() {
        this.getWrapperPayrollVariablesByEmployeIdByYearByMonth();
    }

    handleClick(compName, key) {
        this.setState({render: compName, key});
    }

    dateFormat(date) {
        const dateSplit = date.split('-');
        const year = dateSplit[0];
        const month = dateSplit[1];
        const day = dateSplit[2];
        return day+"/"+month+"/"+year;
    }

    render() {
        if (!this.state.loaded) return <Loading />
        else return (
            <div className="App">
                <div className="social" style={{marginTop: "-50px"}}>
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
                                            value={this.state.yearSelected}
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
                                            value={this.state.monthSelected}
                                        >
                                            <option disabled defaultValue={new Date().getMonth()}>Choisissez un mois  </option>
                                            {this.state.period.map((p, index) => (
                                                <option key={index}
                                                        value={p.id}
                                                        disabled={this.state.yearSelected == this.state.currentYear && p.id > new Date().getMonth() + 1 ? (true) : (false)}>{p.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </MDBRow>
                        </div>
                        {/**FIN SELECTS */}

                        <h3 className="card-title mb-4">Détails des Variables de Paie</h3>
                        {/**CONTENT */}

                        <div style={{display: "flex", flexDirection: "column"}}>
                            <MDBCard>
                                {<TableAbsence reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                                changeHandler={this.changeHandler} absenceList={this.state.absenceList}
                                                handleClick={this.handleClick}
                                                yearSelected={this.state.yearSelected}
                                                monthSelected={this.state.monthSelected}
                                                dateFormat={this.dateFormat}/>}
                            </MDBCard>
                            <MDBCard className="mt-1">
                                {<TableNoteDefrais noteDeFraisList={this.state.noteDeFraisList}
                                                   reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                                   changeHandler={this.changeHandler} handleClick={this.handleClick}
                                                   yearSelected={this.state.yearSelected}
                                                   monthSelected={this.state.monthSelected}
                                                   dateFormat={this.dateFormat}/>}
                            </MDBCard>
                            <MDBCard>
                                {<TableBonus reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                             changeHandler={this.changeHandler} primeList={this.state.primeList}
                                             handleClick={this.handleClick}/>}
                            </MDBCard>
                            <MDBCard>
                                {<TableOvertime reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                                changeHandler={this.changeHandler}
                                                heureSupList={this.state.heureSupList} handleClick={this.handleClick}
                                                dateFormat={this.dateFormat}
                                                yearSelected={this.state.yearSelected}
                                                monthSelected={this.state.monthSelected}/>}
                            </MDBCard>
                            <MDBCard>
                                {<TablePaydayAdvanceReminder reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                                            changeHandler={this.changeHandler}
                                                            avanceRappelSalaireList={this.state.avanceRappelSalaireList}
                                                            handleClick={this.handleClick}
                                                            dateFormat={this.dateFormat}
                                                            yearSelected={this.state.yearSelected}
                                                            monthSelected={this.state.monthSelected}/>}
                            </MDBCard>
                            <MDBCard>
                                {<TableOtherPayrollVariable reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                                             changeHandler={this.changeHandler}
                                                             autresVariablesList={this.state.autresVariableList}
                                                             handleClick={this.handleClick}
                                                             yearSelected={this.state.yearSelected}
                                                             monthSelected={this.state.monthSelected}
                                                             dateFormat={this.dateFormat}/>}
                            </MDBCard>
                        </div>

                        {/**FOOTER BTN */}
                        <MDBRow between around className="mt-3">
                            <MDBCol md="4">
                                <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm"
                                        onClick={() => {
                                            stock.setFiltreAnneeSelected(this.state.yearSelected);
                                            stock.setFiltreMoisSelected(this.state.monthSelected);
                                            stock.setFiltreEmployeSelected(this.state.idEmploye)
                                            this.props.history.push(
                                                "/add-payroll-variables/"
                                                + this.state.society.id + "/" + this.state.idEmploye);
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
                                <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm"
                                        disabled={!this.state.enableBtnConfirmer}
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
