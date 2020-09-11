import React from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
} from "mdbreact";
import ModifyBonus from "./ModifyBonus";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";

const prime = AxiosCenter.getPrime(9151);


class UpdatePrime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prime: null,
            modalPrime:false,
        }
    }

    togglePrime = () => {
        AxiosCenter.getPrime(9151)
            .then((response) => {
                this.state.prime = response.data
                console.log(prime)
            }).catch((error) => {
            console.log(error)
        })

        this.setState({
            modalPrime: !this.state.modalPrime,
        });
    }



    updatePrime() {
        AxiosCenter.getPrime(9151)
            .then((response) => {
                this.state.prime = response.data;
            });

    }

    render() {

        return (
        this.updatePrime(),
            <MDBContainer>
                <MDBBtn onClick={this.togglePrime}>Update</MDBBtn>
                <MDBModal isOpen={this.state.modalPrime} toggle={this.togglePrime} size="lg">
                    {/*<MDBModalHeader color="default-color" toggle={this.togglePrime}>
                        Modification
                    </MDBModalHeader>*/}
                    <MDBModalBody>
                        <ModifyBonus
                            prime={this.prime}
                            togglePrime={this.togglePrime}
                        />
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        )
    }

}

export default UpdatePrime;