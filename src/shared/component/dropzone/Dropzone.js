import React, {useEffect, useRef, useState} from 'react';
import AxiosCenter from "../../services/AxiosCenter";
import "./Dropzone.css"
import {MDBBtn} from "mdbreact";

const Dropzone = (props) => {
    const fileInputRef = useRef();
    const modalImageRef = useRef();
    const modalRef = useRef();
    const progressRef = useRef();
    const uploadRef = useRef();
    const uploadModalRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let filteredArr = selectedFiles.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        setValidFiles([...filteredArr]);

    }, [selectedFiles]);

    const preventDefault = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
            activedBtn();
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('Type de fichier non autorisé');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }

    }

    const validateFile = (file) => {
        const validTypes = props.typeFichiers;
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }

        return true;
    }

    const fileSize = (size) => {
        if (size === 0) {
            return '0 Bytes';
        }
        const k = 5120;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {
        const index = validFiles.findIndex(e => e.name === name);
        const index2 = selectedFiles.findIndex(e => e.name === name);
        const index3 = unsupportedFiles.findIndex(e => e.name === name);
        validFiles.splice(index, 1);
        selectedFiles.splice(index2, 1);
        setValidFiles([...validFiles]);
        setSelectedFiles([...selectedFiles]);
        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }

    }

    const openImageModal = (file) => {
        const reader = new FileReader();
        modalRef.current.style.display = "block";
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
        }
    }

    const closeModal = () => {
        modalRef.current.style.display = "none";
        modalImageRef.current.style.backgroundImage = 'none';
    }

    const uploadFiles = async () => {
        uploadModalRef.current.style.display = 'block';
        uploadRef.current.innerHTML = 'Téléchargement de fichiers...';
        for (let i = 0; i < validFiles.length; i++) {
            const formData = new FormData();
            formData.append('files', validFiles[i]);
            formData.append('key', '');
            AxiosCenter.uploadFiles(props.url, formData, (progressEvent) => {
                    const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                    progressRef.current.innerHTML = `${uploadPercentage}%`;
                    progressRef.current.style.width = `${uploadPercentage}%`;

                    if (uploadPercentage === 100) {
                        uploadRef.current.innerHTML = 'Fichier(s) téléchargé';
                        validFiles.length = 0;
                        setValidFiles([...validFiles]);
                        setSelectedFiles([...validFiles]);
                        setUnsupportedFiles([...validFiles]);

                    }
                },
            ).catch(() => {
                uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
                progressRef.current.style.backgroundColor = 'red';
            })
        }
    }

    const closeUploadModal = () => {
        uploadModalRef.current.style.display = 'none';
    }

    const send = () => {
        if (props.send && unsupportedFiles.length === 0 && validFiles.length) {
            uploadFiles();
        }
    }

    const activedBtn = () => {
        props.activeBtn(unsupportedFiles.length === 0 && validFiles.length > -1)
        // unsupportedFiles.length === 0 && validFiles.length
    }
    return (
        <>
            <div className="container container-dropzone">

                {unsupportedFiles.length ? <p>Veuillez supprimer tous les fichiers non pris en charge.</p> : ''}
                <div className="drop-container"
                     onDragOver={dragOver}
                     onDragEnter={dragEnter}
                     onDragLeave={dragLeave}
                     onDrop={fileDrop}
                     onClick={fileInputClicked}
                >
                    <div className="drop-message">
                        <div className="upload-icon"/>
                        Faites glisser et déposez des fichiers ici ou cliquez pour sélectionner les fichiers
                    </div>
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                </div>
                <div className="file-display-container">
                    {
                        validFiles.map((data, i) =>
                            <div className="file-status-bar" key={i}>
                                <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
                                    <div className="file-type-logo"/>
                                    <div className="file-type">{fileType(data.name)}</div>
                                    <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                    <span className="file-size">({fileSize(data.size)})</span> {data.invalid &&
                                <span className='file-error-message'>({errorMessage})</span>}
                                </div>
                                <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                            </div>
                        )
                    }
                    {unsupportedFiles.length === 0 && validFiles.length ?
                        <div className={'float-right'}>
                            <MDBBtn color="primary" onClick={() => uploadFiles()}>Upload Files</MDBBtn></div> : ''}

                </div>
            </div>
            <div className="modal" ref={modalRef}>
                <div className="overlay"/>
                <span className="close" onClick={(() => closeModal())}>X</span>
                <div className="modal-image" ref={modalImageRef}/>
            </div>

            <div className="upload-modal" ref={uploadModalRef}>
                <div className="overlay"/>
                <div className="close" onClick={(() => closeUploadModal())}>X</div>
                <div className="progress-container">
                    <span ref={uploadRef}/>
                    <div className="progress">
                        <div className="progress-bar" ref={progressRef}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dropzone;
