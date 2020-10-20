import {toast} from "react-toastify";
import React from "react";

const NotificationService = {

    successRegistration(entityName) {
        return (
            toast.success(
                <div className="text-center">
                    <strong>{entityName} enregistré(e) !</strong>
                </div>,
            )
        )
    },

    failedRegistration(entityName) {
        return (
            toast.error(
                <div className="text-center">
                    <strong>{entityName} NON enregistré(e) !</strong>
                </div>,
            )
        )
    },

    successModification(entityName) {
        return (
            toast.success(
                <div className="text-center">
                    <strong>{entityName} Modifié(e) !</strong>
                </div>,
            )
        )
    },

    failedModification(entityName) {
        return (
            toast.error(
                <div className="text-center">
                    <strong>{entityName} NON Modifié(e) !</strong>
                </div>,
            )
        )
    },

    successDeletion(entityName) {
        toast.success(
            <div className="text-center">
                <strong>{entityName} Supprimé(e) !</strong>
            </div>,
        );
    },

    failedDeletion(entityName) {
        toast.error(
            <div className="text-center">
                <strong>{entityName} NON Supprimée !</strong>
            </div>,
        );
    },

    uploadFileError(entityName) {
        return (
            toast.error(
                <div className="text-center">
                    <strong>{entityName} NON enregistré(e) !
                        <br/>Un problème est survenu lors du téléchargement du fichier.</strong>
                </div>
            )
        )
    },

    wrongFileFormatError(entityName) {
        return (
            toast.error(
                <div className="text-center">
                    <strong>{entityName} NON enregistré(e) !
                        <br/>Format de fichier invalide !
                        <br/>Seuls les formats PDF, PNG, JPEG et JPG sont acceptés.</strong>
                </div>
            )
        )
    },

    employeeWasAbsent(entityName, date) {
        return (
            toast.warning(
                <div className="text-center">
                    <strong>{entityName} NON Enregistré(e) : Le salarié était absent pendant cette date {date} !</strong>
                </div>
            )
        )
    },
}

export default NotificationService;