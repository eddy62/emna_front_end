import React from "react";
import {MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow} from "mdbreact";

const QuoteClientDetails = ({quote}) => (
    <MDBCard className="border-0">
        <MDBCardBody>
                <MDBRow>
                    <MDBCol md="4">
                        <strong>Nom du client </strong> : {quote.clientFournisseurNom}
                    </MDBCol>
                    <MDBCol md="4">
                        <strong>Siret</strong> : {quote.clientFournisseurSiret}
                    </MDBCol>
                    <MDBCol md="4">
                        <strong>Tel </strong> : {quote.clientFournisseurTelephone}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4">
                        <strong>Email </strong> : {quote.clientFournisseurEmail}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4">
                        <strong>Addresse </strong> : {
                        `${quote.numeroRue}, ${quote.nomRue}, ${quote.boitePostale}, ${quote.codePostal}, ${quote.ville}, ${quote.pays}`
                    }
                    </MDBCol>
                </MDBRow>
        </MDBCardBody>
    </MDBCard>
);

export default QuoteClientDetails;