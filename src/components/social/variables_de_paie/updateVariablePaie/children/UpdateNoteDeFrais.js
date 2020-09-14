import React from "react";
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody} from "mdbreact";
import ModifyNoteDeFrais from "./ModifyNoteDeFrais";


class UpdateNoteDeFrais extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggled: false,
            minDate: "",
            maxDate: "",
            noteDeFrais: {
                id: 1051,
                designation: "note test",
                date: "2018-03-23",
                montant: 250,
                justificatif: "",
                mois: 3,
                annee: 2018,
                etatVariablePaieId: 1,
                employeId: 4
            },
        };
    }

    toggleNoteDeFrais = () => {
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
                    onClick={this.toggleNoteDeFrais}
                >Test
                </MDBBtn>
                <MDBModal isOpen={this.state.isToggled} toggle={this.toggleNoteDeFrais} size="lg">
                    <MDBModalBody>
                        <ModifyNoteDeFrais
                            noteDeFrais={this.state.noteDeFrais}
                            toggleNoteDeFrais={this.toggleNoteDeFrais}
                        />
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        )
    }

}

export default UpdateNoteDeFrais;