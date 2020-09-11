import React from "react";
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody} from "mdbreact";
import UpdateAbsence from "./children/UpdateAbsence";

class TestAbsence extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggled: false,
            startPeriod: "",
            endPeriod: "",
            absence: {
                id: 1051,
                debutAbsence: "2020-07-01",
                finAbsence: "2020-07-31",
                justificatif: "Arrêt Maladie",
                typeAbsenceId: 1,
                etatVariablePaieId: 1,
                employeId: 10,
                mois: 7,
                annee: 2020
            },
        };
    }

    toggleUpdateAbsence = () => {
        this.setState({
            isToggled: !this.state.isToggled
        });
    }

    render() {
        return (
            <MDBContainer>
                <MDBBtn
                    color="teal accent-3"
                    rounded
                    size="sm"
                    onClick={this.toggleUpdateAbsence}
                >Test
                </MDBBtn>
                <MDBModal isOpen={this.state.isToggled} toggle={this.toggleUpdateAbsence}>
                    <MDBModalBody>
                        <UpdateAbsence
                            absence={this.state.absence}
                            toggleUpdateAbsence={this.toggleUpdateAbsence}
                        />
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        )
    }

}

export default TestAbsence;