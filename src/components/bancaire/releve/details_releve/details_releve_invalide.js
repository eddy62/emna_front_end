import React from "react";
import {Link} from "react-router-dom";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import ListeOperations from "./operation/liste_operations/liste_operations";
import Loading from "../../../../shared/component/Loading";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer} from "mdbreact";
import UserService from '../../../../shared/services/UserService';
import ReleveDetailsCard from "./ReleveDetailsCard";

export class DetailsReleveInvalide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            releve: [],
        };
    }

    componentDidMount() {
        AxiosCenter.getReleveById(this.props.match.params.id)
            .then((res) => {
                const releve = res.data;
                this.setState({
                    releve,
                    releveId: this.props.match.params.id,
                    loaded: true
                });
            })
            .catch((err) => console.log(err));

    }

    detailsReleve = (props) => {
        return (
            <div className="containerDetailsReleve">
                <MDBContainer>
                    <div>
                        <MDBCardHeader color="default-color">
                            <MDBCardTitle>
                                Détail de votre relevé invalidé
                            </MDBCardTitle>
                            <br/>
                        </MDBCardHeader>
                    </div>
                    <div>
                        <hr/>
                    </div>
                    <ReleveDetailsCard releve={this.state.releve}/>
                </MDBContainer>
            </div>
        );
    };

    validateReleve = () => AxiosCenter.validateReleve(this.props.match.params.id)

    render() {
        if (this.state.loaded) {
            return (
                <div>
                    <MDBContainer>
                        <MDBCol>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle className="MDBCardTitle">
                                        <div>
                                            <this.detailsReleve detailsreleve={this.state.releve}/>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                {" "}
                                                <ListeOperations releveId={this.state.releveId}/>
                                            </div>
                                        </div>
                                        <p>

                                            <MDBBtn
                                                className="boutton"
                                                color=" teal lighten-2"
                                                rounded
                                                size="sm"
                                            >
                                                <Link to={"/releveinvalide/"}>
                                                    <span id="color-button"> Retour</span>
                                                </Link>
                                            </MDBBtn>
                                            {(UserService.getRole() === "ROLE_ADMIN" ||
                                                UserService.getRole() === "ROLE_SOCIETY") &&
                                                <MDBBtn
                                                    className="boutton"
                                                    color=" teal lighten-2"
                                                    rounded
                                                    size="sm"
                                                    disabled={false}
                                                >
                                                    <Link to={"/modification/" + this.props.match.params.id}>
                                                        <span id="color-button">Modifier le relevé</span>
                                                    </Link>
                                                </MDBBtn>
                                            }                                           
                                            {(UserService.getRole() === "ROLE_ADMIN" ||
                                                UserService.getRole() === "ROLE_SOCIETY") &&
                                            <Link to={"/creationoperation/" + this.props.match.params.id}>
                                                <MDBBtn
                                                    className="boutton"
                                                    color=" teal lighten-2"
                                                    rounded
                                                    size="sm"
                                                    disabled={false}
                                                >
                                                    <span id="color-button"> Ajouter une opération</span>
                                                </MDBBtn>
                                            </Link>

                                            }
                                            {(UserService.getRole() === "ROLE_ADMIN" ||
                                                UserService.getRole() === "ROLE_SOCIETY") &&

                                            <Link
                                                to={"/releveinvalide/"}
                                            >
                                                <MDBBtn onClick={this.validateReleve}
                                                        className="boutton"
                                                        color=" teal lighten-2"
                                                        rounded
                                                        size="sm"
                                                >

                                                    <span id="color-button"> Valider</span>
                                                </MDBBtn>
                                            </Link>
                                            }
                                        </p>
                                    </MDBCardTitle>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBContainer>
                </div>
            );
        } else {
            return <Loading/>;
        }
    }
}

export default DetailsReleveInvalide;
