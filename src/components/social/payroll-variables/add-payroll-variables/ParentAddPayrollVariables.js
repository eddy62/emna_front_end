import React, {Component} from "react";
import "../PayrollVariables.scss";
import {Link} from "react-router-dom";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardTitle,
    MDBCollapse,
    MDBCollapseHeader,
    MDBContainer,
    MDBRow
} from "mdbreact";
import CreateAbsence from "./children/CreateAbsence";
import CreateBonus from "./children/CreateBonus";
import CreatePaydayAdvanceReminder from "./children/CreatePaydayAdvanceReminder";
import CreateExpenseReport from "./children/CreateExpenseReport";
import CreateOvertime from "./children/CreateOvertime";
import CreateOtherPayrollVariable from "./children/CreateOtherPayrollVariable";
import stock from "../../../../shared/stockage.js";

export default class ParentAddPayrollVariables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            society: {},
            listeEmployes: [],
            idNameSelected: stock.getFiltreEmployeSelected() !="" ? stock.getFiltreEmployeSelected() :'DEFAULT',
            currentYear: new Date().getFullYear(),
            yearSelected: stock.getFiltreAnneeSelected() != "" ?  stock.getFiltreAnneeSelected() : new Date().getFullYear(),
            monthSelected: stock.getFiltreMoisSelected() != "" ? stock.getFiltreMoisSelected() : new Date().getMonth() + 1,
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
            keyAbsence: 0,
            keyExpenseReport: 0,
            keyOtherPayrollVariable: 0
        };
    }

    componentDidMount() {

        //Récupération de l'id de la société
        const idSociete = this.props.match.params.id;
        AxiosCenter.getSocietyById(idSociete)
            .then((response) => {
                const society = response.data;
                this.setState({society});
            })
            .catch((error) => {
                console.log(error);
            });

        //Récupération de la liste des employés à travers l'id de la société
        AxiosCenter.getAllEmployesBySociety(idSociete)
            .then((response) => {
                const listeEmployes = response.data;
                this.setState({listeEmployes: listeEmployes});
            });

    }

    //Méthode permettant d'ouvrir les cards des variables de paie
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    //Méthode permettant de setter le State des selects qui sont transmis aux composants enfant
    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value}, async () => {
            const currentMonth = new Date().getMonth() + 1;
            if (this.state.yearSelected === "2020" && this.state.monthSelected > currentMonth){
                await this.setState({
                    monthSelected: currentMonth
                })
            }
        });
    };

    handleReset = (type) => {
        switch (type) {
            case "Absence":
                this.setState(prevState => ({
                    keyAbsence: prevState.keyAbsence + 1
                }));
                break;
            case "ExpenseReport":
                this.setState(prevState => ({
                    keyExpenseReport: prevState.keyExpenseReport + 1
                }));
                break;
            case "OtherPayrollVariable":
                this.setState(prevState => ({
                    keyOtherPayrollVariable: prevState.keyOtherPayrollVariable + 1
                }));
        };
    };


    render() {
        const {collapseID} = this.state;
        return (
            <div className="App">
                <div className="social">
                    <MDBContainer>
                        <div className="titre">
                            <MDBCardHeader color="default-color">
                                <MDBCardTitle tag="h2">Raison Sociale {this.state.society.civilite}</MDBCardTitle>
                            </MDBCardHeader>
                        </div>

                        <div className="selects">
                            <MDBRow>
                                <form className="d-flex flex-row p-4"
                                      style={{width: "100%", justifyContent: "space-around"}}>
                                    <div>
                                        <label>Nom de l'employé</label>
                                        <select
                                            name="idNameSelected"
                                            className="browser-default custom-select"
                                            onChange={this.changeHandler}
                                            value={this.state.idNameSelected}
                                        >
                                            <option value="DEFAULT" disabled>Choisissez employé</option>
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
                                            <option disabled defaultValue={new Date().getMonth()}>Choisissez un mois
                                            </option>
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

                        <h3 className="card-title mb-4">Variables Mensuelles de Paie</h3>

                        <div className="content d-flex flex-row">
                            <div className="cardContent">
                                <MDBContainer>
                                    <MDBContainer className="mt-5 mb-5">
                                        <MDBCard className="mt-3">
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse1")}
                                                               className="bg-transparent">
                                                Absence
                                                <i className={collapseID === "collapse1" ? "fa fa-angle-up" : "fa fa-angle-down"}/>
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse1" isOpen={collapseID}>
                                                <MDBCardBody>
                                                    {this.state.idNameSelected ? (
                                                        <CreateAbsence employeId={this.state.idNameSelected}
                                                                       yearSelected={this.state.yearSelected}
                                                                       monthSelected={this.state.monthSelected}
                                                                       key={this.state.keyAbsence}
                                                                       handleReset={this.handleReset}/>
                                                    ) : (
                                                        <p>Veuillez choisir un employé</p>
                                                    )}
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard>
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse4")}
                                                               className="bg-transparent">
                                                Note de Frais
                                                <i className={collapseID === "collapse4" ? "fa fa-angle-up" : "fa fa-angle-down"}/>
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse4" isOpen={collapseID}>
                                                <MDBCardBody>
                                                    {this.state.idNameSelected ? (
                                                        <CreateExpenseReport employeId={this.state.idNameSelected}
                                                                             yearSelected={this.state.yearSelected}
                                                                             monthSelected={this.state.monthSelected}
                                                                             key={this.state.keyExpenseReport}
                                                                             handleReset={this.handleReset}/>
                                                    ) : (
                                                        <p>Veuillez choisir un employé</p>
                                                    )}
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard>
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse3")}
                                                               className="bg-transparent">
                                                Prime
                                                <i className={collapseID === "collapse3" ? "fa fa-angle-up" : "fa fa-angle-down"}/>
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse3" isOpen={collapseID}>
                                                <MDBCardBody>
                                                    {this.state.idNameSelected ? (
                                                        <CreateBonus employeId={this.state.idNameSelected}
                                                                     yearSelected={this.state.yearSelected}
                                                                     monthSelected={this.state.monthSelected}
                                                                     />
                                                    ) : (
                                                        <p>Veuillez choisir un employé</p>
                                                    )}
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard>
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse2")}
                                                               className="bg-transparent">
                                                Heure(s) Supplémentaire(s)
                                                <i className={collapseID === "collapse2" ? "fa fa-angle-up" : "fa fa-angle-down"}/>
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse2" isOpen={collapseID}>
                                                <MDBCardBody>
                                                    {this.state.idNameSelected ? (
                                                        <CreateOvertime
                                                            employeId={this.state.idNameSelected}
                                                            yearSelected={this.state.yearSelected}
                                                            monthSelected={this.state.monthSelected}/>
                                                    ) : (
                                                        <p>Veuillez choisir un employé</p>
                                                    )}
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard>
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse5")}
                                                               className="bg-transparent">
                                                Rappel/Avance sur Salaire
                                                <i className={collapseID === "collapse5" ? "fa fa-angle-up" : "fa fa-angle-down"}/>
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse5" isOpen={collapseID}>
                                                <MDBCardBody>
                                                    {this.state.idNameSelected ? (
                                                        <CreatePaydayAdvanceReminder employeId={this.state.idNameSelected}
                                                                                     yearSelected={this.state.yearSelected}
                                                                                     monthSelected={this.state.monthSelected}/>
                                                    ) : (
                                                        <p>Veuillez choisir un employé</p>
                                                    )}
                                                </MDBCardBody>
                                            </MDBCollapse>
                                        </MDBCard>

                                        <MDBCard className="mb-3">
                                            <MDBCollapseHeader onClick={this.toggleCollapse("collapse6")}
                                                               className="bg-transparent">
                                                Autre
                                                <i className={collapseID === "collapse6" ? "fa fa-angle-up" : "fa fa-angle-down"}/>
                                            </MDBCollapseHeader>
                                            <MDBCollapse id="collapse6" isOpen={collapseID}>
                                                <MDBCardBody>
                                                    {this.state.idNameSelected ? (
                                                        <CreateOtherPayrollVariable employeId={this.state.idNameSelected}
                                                                                    yearSelected={this.state.yearSelected}
                                                                                    monthSelected={this.state.monthSelected}
                                                                                    key={this.state.keyOtherPayrollVariable}
                                                                                    handleReset={this.handleReset}/>
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
                                    <MDBBtn color="teal accent-3" rounded size="sm"
                                            disabled={!this.state.idNameSelected}
                                            onClick={() => {
                                                this.props.history.push(
                                                    "/modify-payroll-variables/" + this.state.society.id + "/" + this.state.idNameSelected  + "/" + this.state.yearSelected + "/" + this.state.monthSelected
                                                );
                                            }}
                                    >
                                        Voir Détail
                                    </MDBBtn>

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
