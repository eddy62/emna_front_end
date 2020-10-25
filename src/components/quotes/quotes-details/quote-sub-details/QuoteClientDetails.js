import React from "react";
import {MDBCard, MDBCardBody, MDBCol, MDBRow} from "mdbreact";

const QuoteClientDetails = ({quote}) => (
    <MDBCard className="border-0">
        <MDBCardBody>
            <MDBRow>
                <MDBCol md="4">
                    <b>Nom du client </b> : {quote.clientFournisseurNom}
                </MDBCol>
                <MDBCol md="4">
                    <b>Siret</b> : {quote.clientFournisseurSiret}
                </MDBCol>
                <MDBCol md="4">
                    <b>Tel </b> : {quote.clientFournisseurTelephone}
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="4">
                    <b>Email </b> : {quote.clientFournisseurEmail}
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="4">
                    <b>Addresse </b> : {
                    `${quote.numeroRue}, ${quote.nomRue}, ${quote.boitePostale}, ${quote.codePostal}, ${quote.ville}, ${quote.pays}`
                }
                </MDBCol>
            </MDBRow>
        </MDBCardBody>
    </MDBCard>
);

export default QuoteClientDetails;