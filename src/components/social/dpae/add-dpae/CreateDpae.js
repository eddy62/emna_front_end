import React from "react";
import "../CreateDpae.scss";
import {MDBBtn, MDBCardHeader, MDBCardTitle, MDBContainer, MDBRow} from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading";
import DpaeForm from "./DpaeForm";


class CreateDpae extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            society: {},
            employees: [],
            employeeIndex: "default"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        // get society
        AxiosCenter.getSocietyById(this.props.match.params.id)
            .then((responseSociety) => {
                // get employees
                AxiosCenter.getAllWrapperEmployesBySociety(this.props.match.params.id)
                    .then((responseEmployees) => {
                        this.setState({
                            society: responseSociety.data,
                            employees: responseEmployees.data,
                            loaded: true
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = (event) => {
        this.setState({employeeIndex: event.target.value});
    }

    render() {
        const title = "Gestion Social";
        const title1 = "Soumettre une Déclaration Préalable À l'Embauche";
        const companyName = this.state.society.raisonSociale;

        if (!this.state.loaded) return <Loading/>;
        else return (
            <div className="App">
                <div className="dpae">
                    <MDBContainer>
                        <MDBCardHeader color="default-color">
                            <MDBCardTitle tag="h1">
                                {title}
                            </MDBCardTitle>
                            <MDBCardTitle tag="h3">
                                {companyName}
                            </MDBCardTitle>
                        </MDBCardHeader>
                        <hr/>
                        <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
                            {title1}
                        </MDBCardHeader>
                        <hr/>
                        {/*select employé*/}
                        <div>
                            <select className="browser-default custom-select"
                                    value={this.state.employeeIndex}
                                    onChange={this.handleChange}
                            >
                                <option value="default" disabled={true}>Sélectionner un employé avec contrat et sans
                                    DPAE
                                </option>
                                {this.state.employees.map((object, index) => (
                                    <option key={index}
                                            value={index}>{object.matricule + " " + object.nomNaissance + " " + object.prenom}</option>))}
                            </select>
                        </div>
                        {/*<p>{this.state.employeeIndex}</p>*/}
                        <br/>
                        {/*ternaire formulaire dpae ou bouton annuler*/}
                        {((this.state.employeeIndex) && (this.state.employeeIndex !== "default")) ?
                            <DpaeForm
                                society={this.state.society}
                                employee={this.state.employees[this.state.employeeIndex]}
                            />
                            :
                            <MDBRow around between>
                            <MDBBtn
                                color="teal accent-3"
                                rounded
                                size="sm"
                                onClick={() => {
                                    this.props.history.push(
                                        "/socialHome/" + this.state.society.id
                                    );
                                }}
                            >
                                Annuler
                            </MDBBtn>
                        </MDBRow>}
                    </MDBContainer>
                </div>
            </div>
        );
    }

}

export default CreateDpae;