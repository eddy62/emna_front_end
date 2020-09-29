import React, { Component } from "react";
import "./../style2.scss";
import { MDBContainer, MDBCardHeader, MDBCardTitle, MDBRow, MDBCol, MDBBtn, MDBCard } from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading"
import { Link } from "react-router-dom";
import TableAbsenceAccountant from "./table-update/TableAbsenceAccountant";
import TableBonusAccountant from "./table-update/TableBonusAccountant"
import TableOvertimeAccountant from "./table-update/TableOvertimeAccountant";
import TablePaydayAdvanceReminderAccountant from "./table-update/TablePaydayAdvanceReminderAccountant";
import TableNoteDefraisAccountant from "./table-update/TableExpenseReportAccountant";
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

export default class ParentUpdatePayrollVariablesAccountants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            society: {},
            idEmploye: 1,
            listeEmployes: [],
            yearSelected: new Date().getFullYear(),
            monthSelected: new Date().getMonth() + 1,
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
            enableBtnValider: false,
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
            let afficherBoutonValider = false;
            if ((absenceList.find(variablePaie =>  variablePaie.etatVariablePaieId === 2) !== undefined)
                || (heureSupList.find(variablePaie =>  variablePaie.etatVariablePaieId === 2) !== undefined)
                || (primeList.find(variablePaie =>  variablePaie.etatVariablePaieId === 2) !== undefined)
                || (noteDeFraisList.find(variablePaie =>  variablePaie.etatVariablePaieId === 2) !== undefined)
                || (avanceRappelSalaireList.find(variablePaie =>  variablePaie.etatVariablePaieId === 2) !== undefined)
                || (autresVariableList.find(variablePaie =>  variablePaie.etatVariablePaieId === 2) !== undefined))
                {afficherBoutonValider = true;}
            this.setState({
                absenceList,
                heureSupList,
                primeList,
                noteDeFraisList,
                avanceRappelSalaireList,
                autresVariableList,
                enableBtnValider:afficherBoutonValider,
                loaded:true
            })
        });
    };

    /* Méthode de mise à jour de wrapperVariablesPaie[] par les 6 tableaux de variables pour Validation */
    setWrapperVariablesPaieForValidation = () => {
        const wrapperVariablesPaieToValidate = {
            wrapperAbsenceList: this.state.absenceList.filter(absence => absence.etatVariablePaieId === 2),
            wrapperAutresVariableList: this.state.autresVariableList.filter(autresVariable => autresVariable.etatVariablePaieId === 2),
            avanceRappelSalaireDTOList: this.state.avanceRappelSalaireList.filter(avanceRappelSalaire => avanceRappelSalaire.etatVariablePaieId === 2),
            heuresSupplementairesDTOList: this.state.heureSupList.filter(heureSup => heureSup.etatVariablePaieId === 2),
            wrapperNoteDeFraisList: this.state.noteDeFraisList.filter(noteDeFrais => noteDeFrais.etatVariablePaieId === 2),
            wrapperPrimeList: this.state.primeList.filter(prime => prime.etatVariablePaieId === 2)

        };

        this.validatePayrollVariables(wrapperVariablesPaieToValidate);
    }


    // Envoi au Back de wrapperVariablesPaieToValidate
    validatePayrollVariables = (envoi) => {
        AxiosCenter.validatePayrollVariables(envoi).then((response) => {
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
        const societyId = this.props.match.params.id;

        AxiosCenter.getSocietyById(societyId)
            .then((response) => {
                this.setState({ society: response.data, loaded: true });
            })
            .catch((error) => {
                console.log(error);
            });

        //Récupération de la liste des employés à travers l'id de la société
        AxiosCenter.getAllWrapperEmployesBySociety(societyId)
            .then((response) => {
                const listeEmployes = response.data;
                this.setState({ listeEmployes: listeEmployes });
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
        this.setState({render: compName, key});
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
                                            name="idNameSelected"
                                            className="browser-default custom-select"
                                            onChange={this.changeHandler}
                                            defaultValue={'DEFAULT'}

                                        >
                                            <option value="DEFAULT" >Choisissez employé</option>
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
                                            <option disabled defaultValue={new Date().getMonth()}>Choisissez un mois
                                            </option>
                                            {this.state.period.map((p, index) => (
                                                <option key={index} selected={p.id === this.state.monthSelected}
                                                        value={p.id}
                                                        disabled={p.id > new Date().getMonth() + 1 ? (true) : (false)}>{p.text}</option>
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
                            {/*// TODO AJOUTER LES FILTRES DES LISTES*/}
                            <MDBCard>
                                {<TableAbsenceAccountant reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                               changeHandler={this.changeHandler} absenceList={this.state.absenceList.filter(absence => absence.etatVariablePaieId > 1)}
                                               handleClick={this.handleClick}/>}
                            </MDBCard>
                            <MDBCard className="mt-1">
                                {<TableNoteDefraisAccountant noteDeFraisList={this.state.noteDeFraisList.filter(noteDeFrais => noteDeFrais.etatVariablePaieId > 1)}
                                                   reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                                   changeHandler={this.changeHandler} handleClick={this.handleClick}/>}
                            </MDBCard>
                            <MDBCard>
                                {<TableBonusAccountant reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                             changeHandler={this.changeHandler} primeList={this.state.primeList.filter(prime=> prime.etatVariablePaieId > 1)}
                                             handleClick={this.handleClick}/>}
                            </MDBCard>
                            <MDBCard>
                                {<TableOvertimeAccountant reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                                changeHandler={this.changeHandler}
                                                heureSupList={this.state.heureSupList.filter(heureSup => heureSup.etatVariablePaieId > 1)}
                                                handleClick={this.handleClick}/>}
                            </MDBCard>
                            <MDBCard>
                                {<TablePaydayAdvanceReminderAccountant reloadParentAfterUpdate={this.reloadParentAfterUpdate}
                                                             changeHandler={this.changeHandler}
                                                             avanceRappelSalaireList={this.state.avanceRappelSalaireList.filter(avanceRappelSalaire => avanceRappelSalaire.etatVariablePaieId > 1)}
                                                             handleClick={this.handleClick}/>}
                            </MDBCard>
                        </div>

                        {/**FOOTER BTN */} <MDBRow between around className="mt-3">


                            <MDBCol md="4">
                                <Link to="/socialHome/1">
                                    <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm">
                                        Retour
                                    </MDBBtn>
                                </Link>
                            </MDBCol>

                            <MDBCol md="4">
                                <MDBBtn className="mt-5" color="teal accent-3" rounded size="sm"
                                        disabled={!this.state.enableBtnValider}
                                        onClick={
                                            this.setWrapperVariablesPaieForValidation
                                        }>
                                    Valider
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>

                    </MDBContainer>
                </div>
            </div>
        )
    }
}
