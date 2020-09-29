import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol} from "mdbreact";
import React from "react";
import UserService from "../../../../shared/services/UserService";

const ReleveDetailsCard = (props) => {

    return (
        <div>
            <MDBCol>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle className="MDBCardTitle">
                            <div>
                                <div className="row">
                                    <div className="col-3">
                                        <p>
                                            Relevé bancaire:
                                            <br/>
                                            du {props.releve.dateDebut}
                                            <br/>
                                            au {props.releve.dateFin}{" "}
                                        </p>
                                    </div>
                                    <div className="col-6"/>
                                    <div className="col-3">
                                        Information de la banque :{" "}
                                        {props.releve.banque}
                                    </div>
                                </div>
                                <p>
                                    Solde du compte pour ce mois :
                                    { " " + props.releve.solde + " €" }
                                </p>
                            </div>
                        </MDBCardTitle>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <br/>
        </div>
    );
};

export default ReleveDetailsCard;