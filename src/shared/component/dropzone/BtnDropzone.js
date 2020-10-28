import React, {Component} from 'react';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import Dropzone from "./Dropzone";

class BtnDropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            error: false,
            files: [],
            send: false,
            activeBtn: false
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    send = () => {
        this.setState({send: true})
    }

    activeBtn = (active) =>{
        this.setState({activeBtn: active})
    }

    render() {
        return (
            <>
                <MDBBtn color="info" onClick={this.toggle}>
                    Upload
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle}>
                        {this.props.title}
                    </MDBModalHeader>
                    <MDBModalBody>
                        <Dropzone send={this.state.send}
                                  url={`/upload/avenant/${this.props.id}`}
                                  typeFichiers={['application/pdf']}
                                  activeBtn = {this.activeBtn}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Annuler</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}

BtnDropzone.propTypes = {};

export default BtnDropzone;
