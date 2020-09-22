import React from "react";
import "../DeclarationOfEmployment.scss";
import {MDBBtn, MDBCardHeader, MDBCardTitle, MDBContainer, MDBRow} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading";

class CreateDeclarationOfEmployment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            society: {}
        }
    }

    componentDidMount() {
        /*set society*/
        AxiosCenter.getSocietyById(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    society: response.data,
                    loaded: true
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const title = "Gestion Social";
        const title1 = "Soumettre une Déclaration Préalable d'Embauche";
        const companyName = this.state.society.raisonSociale;

        if (!this.state.loaded) return <Loading/>;
        else return (
            <div className="App">
                <div className="dpae">
                    <MDBContainer>
                        <MDBCardHeader color="default-color">
                            <MDBCardTitle tag="h1">{title}</MDBCardTitle>

                            <MDBCardTitle tag="h3">{companyName}</MDBCardTitle>
                        </MDBCardHeader>
                        <hr/>
                        <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
                            {title1}
                        </MDBCardHeader>
                        <hr/>
                        {/*formulaire*/}
                        <hr/>
                        <MDBRow around between>
                            {UserService.isSociety() ? (
                                <MDBBtn
                                    disabled={true}
                                    color="teal accent-3"
                                    rounded
                                    size="sm"
                                    type="submit"
                                >
                                    Soumettre
                                </MDBBtn>
                            ) : null}
                            <MDBBtn
                                color="teal accent-3"
                                rounded
                                size="sm"
                                type="reset"
                                /*onClick={handleReset}
                                disabled={!dirty || isSubmitting}*/
                            >
                                Réinitialiser
                            </MDBBtn>
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
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }

}

export default CreateDeclarationOfEmployment;