import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import React from 'react';
import FileUpload from "../drag-n-drop/FileUpload";
import {toast} from "react-toastify";

class UploadFileBtn extends React.Component {
    state = {
        modal: false,
        error: false,
        files: [],
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    setError = (bool) => {
        this.setState({uploadError : bool})
    }

    addFile = file => {
        let files = this.state.files.splice('');
        files.push(file);
        this.setState({files})
    }

    setFiles = (event) => {
        this.setState({files : []})
        let files   = event.originalEvent.dataTransfer.files;
        let i       = 0
        let error   = false
        while (!error && i < files.length) {
            let file = files[i];
            if (this.props.fileFormats && !this.props.fileFormats.includes(files[0].type)) {
                toast.error(
                    <div className="text-center">
                        <strong>Mauvais format de fichier &nbsp;&nbsp;!</strong>
                    </div>,
                );
                error = true;
            } else {
                this.addFile(file)
            }
            i++;
        }
    }

    render() {
        return (
            <span>
                <MDBBtn color="info" onClick={this.toggle}>
                    Upload
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle}>
                        Chargez votre contrat signé :
                    </MDBModalHeader>

                    <MDBModalBody>
                        <FileUpload
                            files={this.state.files}
                            error={this.state.error}
                            fileFormats={this.props.fileFormats}
                            updateFiles={this.setFiles}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Annuler</MDBBtn>
                        {
                            (this.state.files.length === 0 ) ?
                                <MDBBtn color="primary" disabled onClick={this.props.onSave}>Enregistrer</MDBBtn> :
                                <MDBBtn color="primary" onClick={() => this.props.onSave(this.state.files[0], this.props.idElement)}>Enregistrer</MDBBtn>
                        }
                    </MDBModalFooter>
                </MDBModal>
            </span>
        );
    }
}

// UploadFileBtn.propTypes = {
//     onSave: PropTypes.func
// }


export default UploadFileBtn;