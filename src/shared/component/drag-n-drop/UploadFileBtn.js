import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import React from 'react';
import DragFileUpload from "./DragFileUpload";
import * as PropTypes from "prop-types";

class UploadFileBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            error: false,
            files: [],
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    updateFiles = (files) => {
        this.setState({files: files})
    }

    submit = () => {
        this.props.submit(this.state.files, this.props.idElement);
    }

    render() {
        return (
            <span>
                <MDBBtn color="info" onClick={this.toggle}>
                    Upload
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle}>
                        {this.props.title}
                    </MDBModalHeader>
                    <MDBModalBody>
                        <DragFileUpload
                            submit={this.submit}
                            files={this.state.files}
                            updateFiles={this.updateFiles}
                            fileFormats={this.props.fileFormats}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Annuler</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </span>
        );
    }
}

UploadFileBtn.propTypes = {
    submit      : PropTypes.func.isRequired,
    title       : PropTypes.string,
    fileFormats : PropTypes.string,
    idElement   : PropTypes.number.isRequired,
};

export default UploadFileBtn;