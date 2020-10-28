import React, {Component} from 'react';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";

class SimpleModal extends Component {
    render() {
        return (
            <MDBModal isOpen={this.props.isOpen}>
                <MDBModalHeader>{this.props.title}</MDBModalHeader>
                <MDBModalBody>
                    {this.props.body}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="primary" onClick={() => {
                        this.props.btnClick()
                    }}>{this.props.btnText}</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    }
}
export default SimpleModal;