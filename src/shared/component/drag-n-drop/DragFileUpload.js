import React from "react"
import "./DragFileUpload.css"
import $ from 'jquery';
import {MDBBtn, MDBCardBody, MDBCardText, MDBIcon} from "mdbreact";
import * as PropTypes from "prop-types";
import {toast} from "react-toastify";
import Loading from "../Loading";

class DragFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            inputText: "",
            isAdvancedUpload: false
        }
    }

    isAdvancedUpload = function () {
        let div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
            && 'FormData' in window &&
            'FileReader' in window;
    }();

    async componentDidMount() {
        let isAdvancedUpload = await this.isAdvancedUpload
        this.setState({
            isAdvancedUpload: isAdvancedUpload,
            inputText: this.getInputText(isAdvancedUpload),
            loaded: true
        })

        let $drag = $('#f-upload')

        $drag.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
        })
            .on('dragover dragenter', function () {
                $drag.addClass('is-dragover');
            })
            .on('dragleave dragend drop', function () {
                $drag.removeClass('is-dragover');
            })
            .on('drop', (e) => this.onFileDropped(e));
    }

    getInputText = (advancedUpload) => {
        let file = this.props.files[0]
        let text = "Choisir un fichier";
        if (file) return <label htmlFor="file">{file.name}</label>
        return <span>
                    <strong>{text}</strong> {advancedUpload && " ou le déposer ici"}
                </span>
    }

    updateText = () => {
        this.setState({inputText: this.getInputText(this.state.isAdvancedUpload)})
    }

    isFormatAccepted = (files) => {
        if (!this.props.fileFormats) return true
        let i = 0
        let file = {};
        while (i < files.length) {
            file = files[i];
            if (!this.props.fileFormats.includes(file.type))
                return false;
            i++;
        }
        return true;
    }

    isMultipleFile = (files) => {
        return files.length > 1
    }

    onFileDropped = (event) => {
        let files = Array.from(event.originalEvent.dataTransfer.files);
        if (this.isMultipleFile(files)) {
            toast.error(
                <div className="text-center">
                    <strong>Un seul fichier à la fois ! &nbsp;&nbsp;!</strong>
                </div>,
            );
        } else if (!this.isFormatAccepted(files)) {
            toast.error(
                <div className="text-center">
                    <strong>Mauvais format de fichier &nbsp;&nbsp;!</strong>
                </div>,
            );
        } else {
            this.setFiles(files)
        }
    }

    setFiles = (files) => {
        this.cancel().then(res => {
            // let filesToUpload = this.props.files.splice('');
            this.props.updateFiles(files);
            this.updateText();
        })
    }

    cancel = async () => {
        await this.props.updateFiles([]);
        this.updateText()
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        return (
            <div className={this.state.isAdvancedUpload ? "box has-advanced-upload" : "box"}
                 id="f-upload"
            >
                <MDBCardBody>
                    <MDBIcon icon="file-upload" size="5x"/>
                    <MDBCardText className="mt-3">
                        <input className="f-input"
                               type="file"
                               name="files[]"
                               id="f-input"
                               data-multiple-caption="{count} files selected"
                               accept={this.props.fileFormats}
                        />
                        <label htmlFor="file">
                            {
                                this.state.inputText
                            }
                            .
                        </label>
                    </MDBCardText>
                </MDBCardBody>
                <MDBBtn color="primary" disabled={this.props.files.length === 0} onClick={this.props.submit}>
                    <MDBIcon icon={"save"}/> Enregistrer
                </MDBBtn>
                <MDBBtn color="alert" disabled={this.props.files.length === 0} onClick={this.cancel}>
                    <MDBIcon icon={"redo"}/> Annuler
                </MDBBtn>
            </div>
        );
    }
}

DragFileUpload.propTypes = {
    submit      : PropTypes.func,
    files       : PropTypes.array.isRequired,
    updateFiles : PropTypes.func.isRequired,
    fileFormats : PropTypes.string,
};

export default DragFileUpload;