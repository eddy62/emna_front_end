import React from "react";
import {MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow} from "mdbreact";

const QuotePrimaryDetails = ({quote}) => (
    <MDBCard className="border-0">
        <MDBCardBody>
                <MDBRow>
                    <MDBCol md="4">
                        <strong>N°</strong> : {quote.numDevis}
                    </MDBCol>
                    <MDBCol md="4">
                        <strong>Nom</strong> : {quote.nom}
                    </MDBCol>
                    <MDBCol md="4">
                        <strong>Message </strong> : {quote.message}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4">
                        <strong>Date de création </strong> : {quote.dateCreation}
                    </MDBCol>
                    <MDBCol md="4">
                        <strong>Date limite </strong> : {quote.dateLimite}
                    </MDBCol>
                </MDBRow>
        </MDBCardBody>
    </MDBCard>
);

export default QuotePrimaryDetails;