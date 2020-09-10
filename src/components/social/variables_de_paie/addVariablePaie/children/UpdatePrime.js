import React from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
} from "mdbreact";
import ModifyBonus from "./ModifyBonus";

const prime = {
    annee: 2020,
    mois: 9,
    employeId: 3,
    montant: 50,
    etatVariablePaieId: 1,
    id: 1051,
    type: "",
    typePrimeId: "",
}

class UpdatePrime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalPrime:false,
        }
    }

    togglePrime = () => {
        this.setState({
            modalPrime: !this.state.modalPrime,
        });
    }



    componentDidMount() {

    }

    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.togglePrime}>Update</MDBBtn>
                <MDBModal isOpen={this.state.modalPrime} toggle={this.modalPrime} size="lg">
                    <MDBModalHeader color="default-color" toggle={this.togglePrime}>
                        Modification
                    </MDBModalHeader>
                    <MDBModalBody>
                        <ModifyBonus
                            prime={prime}
                            togglePrime={this.togglePrime}
                        />
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default UpdatePrime;