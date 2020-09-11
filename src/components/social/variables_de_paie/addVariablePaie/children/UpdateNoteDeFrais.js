import React from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
} from "mdbreact";
import ModifyNoteDeFrais from "./ModifyNoteDeFrais";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";

const noteDeFrais = AxiosCenter.getNoteDeFrais();


class UpdateNoteDeFrais extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prime: null,
            modalPrime:false,
        }
    }

    toggleNoteDeFrais = () => {
        AxiosCenter.getNoteDeFrais()
            .then((response) => {
                this.state.noteDeFrais = response.data
                console.log(noteDeFrais)
            }).catch((error) => {
            console.log(error)
        })

        this.setState({
            modalNoteDeFrais: !this.state.modalNoteDeFrais,
        });
    }



    updateNoteDeFrais() {
        AxiosCenter.getNoteDeFrais(9151)
            .then((response) => {
                this.state.NoteDeFrais = response.data;
            });

    }

    render() {

        return (
            this.updateNoteDeFrais(),
                <MDBContainer>
                    <MDBBtn onClick={this.toggleNoteDeFrais}>Update</MDBBtn>
                    <MDBModal isOpen={this.state.modalNoteDeFrais} toggle={this.toggleNoteDeFrais} size="lg">
                        {/*<MDBModalHeader color="default-color" toggle={this.togglePrime}>
                        Modification
                    </MDBModalHeader>*/}
                        <MDBModalBody>
                            <ModifyNoteDeFrais
                                prime={this.noteDeFrais}
                                togglePrime={this.toggleNoteDeFrais}
                            />
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
        )
    }

}

export default UpdateNoteDeFrais;