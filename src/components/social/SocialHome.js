import React from "react";
import "./social.scss";
import {Link} from "react-router-dom";
import AxiosCenter from "../../shared/services/AxiosCenter";
import UserService from "../../shared/services/UserService";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdbreact";
import contentHtmlDpae from "./declaration-of-employment/detail-declaration-of-employment/ContentHtmlDpae"

class SocialHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            societe: {},
            isLogginActive: true,
        };
    }

    componentDidMount() {
        AxiosCenter.getWrapperSociety(this.props.match.params.id)
            .then((response) => {
                this.setState({societe: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const title = "Gestion Social";
        // TODO réussir à faire un saut de ligne dans le chaine de title1 et s'en servir dans MDBCardTitle ligne 72
        //const title1 = "Gestion"+String.fromCharCode(13)+String.fromCharCode(10)+"des Employés";
        const text1 = "Enregistrement, Consultation et Modification des données des Employés de la Société";
        const title2 = "Validation Comptable";
        const text2 = "Validation Comptable des Variables de Paie des Employés et des pièces comptables";
        const title3 = "Gestion des Variables de Paie";
        const text3 = "Enregistrement et Modification des Variables de Paie des Employés";
        const title4 = "Gestion des Fiches de Paie";
        const text4 = "Consultation et Téléchargement des Fiches de Paie des Employés";
        const title5 = "Déclaration d'Embauche";
        const text5 = "Déclaration d'Embauche en ligne et Téléchargement d'Attestation d'Embauche";
        const entreprise = this.state.societe.raisonSociale;

        return (
            <div className="App">
                <div className="social">
                    <div>
                        <MDBContainer>
                            <div className="titre">
                                <MDBCardHeader color="default-color">
                                    <MDBCardTitle tag="h1">{title}</MDBCardTitle>
                                    <br/>
                                    <MDBCardTitle tag="h3">{entreprise}</MDBCardTitle>
                                </MDBCardHeader>
                            </div>
                            <div className="titre">
                                <hr/>
                            </div>
                            <div className="menu">
                                <MDBRow around between>
                                    <MDBCol md="3" className="mb-3">
                                        <MDBCard className="cadre1">
                                            <MDBCardBody>
                                                <MDBCardTitle tag="h4">Gestion<br/>des Employés</MDBCardTitle>
                                                <br/>
                                                <MDBCardText>
                                                    {text1}
                                                </MDBCardText>
                                                <br/>
                                                <div className="boutton">
                                                    <MDBBtn
                                                        rounded
                                                        size="sm"
                                                        color="teal accent-3"
                                                        /*disabled={true}*/
                                                        /*l'id de la société est undefined sur le compte accountant*/
                                                        onClick={() => {
                                                            this.props.history.push(
                                                                "/listEmployes/" + this.state.societe.id
                                                            );
                                                        }}
                                                    >
                                                        Consulter
                                                    </MDBBtn>
                                                    <MDBBtn
                                                        rounded
                                                        size="sm"
                                                        style = {{paddingRight: "2.5rem", paddingLeft: "2.5rem"}}
                                                        color="teal accent-3"
                                                        // TODO : lien vers Créer Fiche de paie
                                                        /*disabled={true}*/
                                                        /*l'id de la société est undefined sur le compte accountant*/
                                                        onClick={() => {
                                                            this.props.history.push(
                                                                "/listEmployes/" + this.state.societe.id
                                                            );
                                                        }}
                                                    >
                                                        Créer                                                    </MDBBtn>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    {UserService.isSociety() ? (
                                        <MDBCol md="3" className="mb-3">
                                            <MDBCard className="cadre1">
                                                <MDBCardBody>
                                                    <MDBCardTitle tag="h4">{title5}</MDBCardTitle>
                                                    <br/>
                                                    <MDBCardText>
                                                        {text5}
                                                    </MDBCardText>
                                                    <br/>
                                                    <div>
                                                        <MDBBtn
                                                            rounded
                                                            size="sm"
                                                            color="teal accent-3"
                                                            onClick={() => {
                                                                this.props.history.push(
                                                                    "/consult-declaration-of-employment/" + this.state.societe.id
                                                               );
                                                            }}
                                                        >
                                                            Consulter
                                                        </MDBBtn>
                                                        <MDBBtn
                                                            rounded
                                                            size="sm"
                                                            style = {{paddingRight: "2.5rem", paddingLeft: "2.5rem"}}
                                                            color="teal accent-3"
                                                            onClick={() => {
                                                                this.props.history.push(
                                                                    "/add-declaration-of-employment/" + this.state.societe.id
                                                                );
                                                            }}
                                                        >
                                                            Créer
                                                        </MDBBtn>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    ) : null}
                                    {UserService.isAccountant() ? (
                                        <MDBCol md="3" className="mb-3">
                                            <MDBCard className="cadre1">
                                                <MDBCardBody>
                                                    <MDBCardTitle tag="h4">{title2}</MDBCardTitle>
                                                    <br/>
                                                    <MDBCardText>
                                                        {text2}
                                                    </MDBCardText>
                                                    <br/>
                                                    <div className="boutton">
                                                        <MDBBtn
                                                            color="teal accent-3"
                                                            rounded
                                                            size="sm"
                                                            style = {{paddingRight: "2.5rem", paddingLeft: "2.5rem"}}
                                                            onClick={() => {
                                                                this.props.history.push(
                                                                    "/validation-comptable/update-payroll-variables/ParentUpdatePayrollVariablesAccountants/" + this.state.societe.id
                                                                );
                                                            }}
                                                        >
                                                            Gérer
                                                        </MDBBtn>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    ) : null}
                                </MDBRow>
                                <br/>
                                <MDBRow around between>
                                    {UserService.isSociety() ? (
                                        <MDBCol md="3" className="mb-3">
                                            <MDBCard className="cadre1">
                                                <MDBCardBody>
                                                    <MDBCardTitle tag="h4">{title3}</MDBCardTitle>
                                                    <br/>
                                                    <MDBCardText>
                                                        {text3}
                                                    </MDBCardText>
                                                    <br/>
                                                    <div className="boutton">
                                                        <MDBBtn
                                                            color="teal accent-3"
                                                            rounded
                                                            size="sm"
                                                            onClick={() => {
                                                                this.props.history.push(
                                                                    "/modify-payroll-variables/" + this.state.societe.id + "/1/" + new Date().getFullYear() + "/" + new Date().getMonth()
                                                                );
                                                            }}
                                                        >
                                                            Consulter
                                                        </MDBBtn>
                                                        <MDBBtn
                                                            color="teal accent-3"
                                                            rounded
                                                            size="sm"
                                                            style = {{paddingRight: "2.5rem", paddingLeft: "2.5rem"}}
                                                            onClick={() => {
                                                                this.props.history.push(
                                                                    "/add-payroll-variables/" + this.state.societe.id
                                                                );
                                                            }}
                                                        >
                                                            Créer
                                                        </MDBBtn>                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    ) : null}
                                    {UserService.isSociety() ||
                                    UserService.isAccountant() ? (
                                        <MDBCol md="3" className="mb-3">
                                            <MDBCard className="cadre1">
                                                <MDBCardBody>
                                                    <MDBCardTitle tag="h4">{title4}</MDBCardTitle>
                                                    <br/>
                                                    <MDBCardText>
                                                        {text4}
                                                    </MDBCardText>
                                                    <br/>
                                                    <div className="boutton">
                                                        <MDBBtn
                                                            color="teal accent-3"
                                                            rounded
                                                            size="sm"
                                                            onClick={() => {
                                                                this.props.history.push(
                                                                    "/payslip/ParentPayslip/" + this.state.societe.id
                                                                );
                                                            }}
                                                        >
                                                            Consulter
                                                        </MDBBtn>
                                                        <MDBBtn
                                                            color="teal accent-3"
                                                            rounded
                                                            size="sm"
                                                            style = {{paddingRight: "2.5rem", paddingLeft: "2.5rem"}}
                                                            // TODO : lien vers créer FicheDePaie
                                                            disabled={true}
                                                            onClick={() => {
                                                                this.props.history.push(
                                                                    "/payslip/ParentPayslip/" + this.state.societe.id
                                                                );
                                                            }}
                                                        >
                                                            Créer
                                                        </MDBBtn>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    ) : null}
                                </MDBRow>
                            </div>
                            <div className="titre">
                                <hr/>
                            </div>
                            <Link to="/">
                                <MDBBtn color="teal accent-3" rounded size="sm">
                                    Retour à l'Accueil
                                </MDBBtn>
                            </Link>
                        </MDBContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default SocialHome;
