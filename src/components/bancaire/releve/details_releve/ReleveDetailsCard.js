import {MDBCard,MDBCardBody,MDBCardTitle,MDBCol} from "mdbreact";
import ReleveSolde from "./DetailsReleveSoldeParaph";
import React from "react";

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
                                <ReleveSolde releveId={props.releve.id}/>
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