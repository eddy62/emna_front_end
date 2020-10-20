import React from "react";
import AxiosCenter from "../../../../shared/services/AxiosCenter"
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    MDBBtn,
    MDBCardHeader,
    MDBCardTitle,
    MDBContainer,
    MDBRow, MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";
import {toast} from "react-toastify";

export default class ConsultDeclarationOfEmployment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            society: {},
            listeEmployes: [],
            idEmployeSelected: undefined,
            listDpae: [],
            yearSelected: new Date().getFullYear(),
            firstMonthSelected: 1,
            secondMonthSelected: new Date().getMonth() + 1,
            period: [
                { id: 1, text: "Janvier" },
                { id: 2, text: "Février" },
                { id: 3, text: "Mars" },
                { id: 4, text: "Avril" },
                { id: 5, text: "Mai" },
                { id: 6, text: "Juin" },
                { id: 7, text: "Juillet" },
                { id: 8, text: "Août" },
                { id: 9, text: "Septembre" },
                { id: 10, text: "Octobre" },
                { id: 11, text: "Novembre" },
                { id: 12, text: "Décembre" }
            ],
            year: [
                { item: new Date().getFullYear() },
                { item: new Date().getFullYear() - 1 },
                { item: new Date().getFullYear() - 2 },
                { item: new Date().getFullYear() - 3 },
                { item: new Date().getFullYear() - 4 },
                { item: new Date().getFullYear() - 5 },
            ]
        }

        /*

                this.handleClick = this.handleClick.bind(this);*/
    }

    get () {};


    /*Methode qui récupère les dpae*/
    getAllDpaeByEmployeIdMonthStartMonthEnd = () => {
        AxiosCenter.getAllDpaeByEmployeIdMonthStartMonthEnd(this.state.idEmployeSelected, this.state.yearSelected, this.state.firstMonthSelected,this.state.secondMonthSelected)
            /*AxiosCenter.getAllPaySlip()*/
            .then((response) => {
                const listDpae = response.data;
                this.setState({
                    listDpae,
                    loaded:true
                }, () => {console.log(this.state.listDpae)})
            });
    };

    componentDidMount() {
        //Récupération de l'id de la société
        const idSociete = this.props.match.params.id;
        AxiosCenter.getSocietyById(idSociete)
            .then((response) => {
                const society = response.data;
                this.setState({ society });
            })
            .catch((error) => {
                console.log(error);
            });

        //Récupération de la liste des employés à travers l'id de la société
        AxiosCenter.getAllEmployesBySociety(idSociete)
            .then((response) => {
                const listeEmployes = response.data;
                this.setState({ listeEmployes: listeEmployes });
            });
    }

    //Méthode permettant de setter le State des selects qui sont transmis aux composants enfant
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value },  () => {
            if(this.state.yearSelected ==  (new Date().getFullYear()) && this.state.firstMonthSelected >  new Date().getMonth() + 1){
                this.state.firstMonthSelected = 1;
            }
            if(this.state.yearSelected ==  (new Date().getFullYear()) && this.state.secondMonthSelected >  new Date().getMonth() + 1){
                this.state.secondMonthSelected =  new Date().getMonth() + 1;
            }
            if (this.state.idEmployeSelected != undefined ) {
                this.getAllDpaeByEmployeIdMonthStartMonthEnd();
            }

        })
    };



    render() {
        return (
            <div className="container">
                <MDBContainer>
                    <div className="titre">
                        <MDBCardHeader color="default-color">
                            <MDBCardTitle tag="h2">Raison Sociale {this.state.society.civilite}</MDBCardTitle>
                        </MDBCardHeader>
                    </div>

                    <div className="selects">

                        <Formik initialValues={{
                            idEmploye: "",
                            yearSelected: "",
                            firstMonthSelected: "",
                            secondMonthSelected: "",
                        }}
                                onSubmit={this.submit}
                            //validationSchema={absenceSchema(this.state)}
                        >

                            {({
                                  handleSubmit
                              }) => (
                                <Form onSubmit={handleSubmit}
                                      className="w-100"
                                >

                                    <MDBRow>
                                        {/*<form className="d-flex flex-row p-4"
                                    style={{width: "100%", justifyContent: "space-around"}}>*/}
                                        <div>
                                            <label>Nom de l'employé</label>
                                            <select
                                                name="idEmployeSelected"
                                                className="browser-default custom-select"
                                                onChange={this.changeHandler}

                                            >
                                                <option disabled selected>Choisissez employé</option>
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
                                            <label>Mois du</label>
                                            <select
                                                name="firstMonthSelected"
                                                className="browser-default custom-select"
                                                onChange={this.changeHandler}
                                            >
                                                <option disabled defaultValue={this.state.firstMonthSelected}>Choisissez un mois</option>
                                                {this.state.period.map((p, index) => (
                                                    <option key={index} selected={p.id === this.state.firstMonthSelected}
                                                            value={p.id}
                                                            disabled={(((this.state.yearSelected ==  (new Date().getFullYear()) && p.id > new Date().getMonth() + 1)  )) ? (true) : (false)}>{p.text}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label>Mois au</label>
                                            <select
                                                name="secondMonthSelected"
                                                className="browser-default custom-select"
                                                onChange={this.changeHandler}
                                            >
                                                <option disabled defaultValue={this.state.secondMonthSelected}>Choisissez un mois</option>
                                                {this.state.period.map((p, index) => (
                                                    <option key={index} selected={p.id === this.state.secondMonthSelected}
                                                            value={p.id}
                                                            disabled={(((this.state.yearSelected ==  (new Date().getFullYear())&&p.id > new Date().getMonth() + 1)  )) ? (true) : (false)}>{p.text}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/*</form>*/}
                                    </MDBRow>
                                    <h3 className="card-title mb-4"> DPAE :</h3>
                                    <div>
                                        <MDBTable>
                                            <MDBTableHead>
                                                <tr>
                                                    <th className="font-weight-bold">Date</th>
                                                    <th>Lieu</th>
                                                    <th>Retour URSSAF</th>
                                                    <th>Commentaire</th>
                                                    <th>Lien</th>
                                                    <th className="w-25"></th>
                                                </tr>
                                            </MDBTableHead>
                                            {this.state.listDpae.length ? (
                                                <MDBTableBody>
                                                    {this.state.listDpae.map((dpae, index) => (
                                                        <tr key={index}>
                                                            <td>{dpae.date}</td>
                                                            <td>{dpae.lieu}</td>
                                                            <td>{dpae.retourApiUrssaf}</td>
                                                            <td>{dpae.commentaire}</td>
                                                            <td>
                                                                <MDBBtn color="teal accent-3" rounded size="sm"
                                                                        onClick={() => this.newWindowPdfFile(index)}>VOIR</MDBBtn>
                                                            </td>


                                                        </tr>
                                                    ))}

                                                </MDBTableBody>
                                            ) : (
                                                <MDBTableBody>
                                                    <tr>
                                                        <td colSpan="5">Pas DPAE pour cette période</td>
                                                    </tr>
                                                </MDBTableBody>
                                            )}

                                        </MDBTable>
                                    </div>
                                </Form>


                            )}
                        </Formik>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}