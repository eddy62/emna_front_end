import React from "react"
import "./FileUpload.css"
import $ from 'jquery';
import {
    MDBCardBody,
    MDBCardText,
    MDBIcon,
} from "mdbreact";

class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            inputText: "",
            advancedUpload: false
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
            advancedUpload: isAdvancedUpload,
            inputText: this.getInputText(isAdvancedUpload),
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
            .on('drop', (e) => this.setFiles(e));
    }

    setFiles = (event) => {
        this.props.updateFiles(event)
        this.setState({inputText: this.getInputText(this.state.advancedUpload)})
    }

    getInputText = (advancedUpload) => {
        let file = this.props.files[0]
        let text = "Choisir un fichier";
        if (file) return <strong>{file.name}</strong>

        return  <span>
                    <strong>{text}</strong> {advancedUpload && " ou le déposer ici"}
                </span>
    }

    render() {
        return (
            <div className={this.state.advancedUpload ? "box has-advanced-upload" : "box"}
                 id="f-upload"
            >
                <MDBCardBody>
                    <MDBIcon icon="file-upload" size="5x"/>
                    <MDBCardText>
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
            </div>
        );
    }
}

export default FileUpload;