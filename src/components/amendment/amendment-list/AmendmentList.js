import React from "react";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import Loading from "../../../shared/component/Loading";
import DragFileUpload from "../../../shared/component/drag-n-drop/DragFileUpload";
import UploadFileBtn from "../../../shared/component/drag-n-drop/UploadFileBtn";
import Dropzone from "../../../shared/component/dropzone/Dropzone";
import BtnDropzone from "../../../shared/component/dropzone/BtnDropzone";

export default class AmendmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amendments: [],
            loaded: false,
        }
        this.amendmentList = this.amendmentList.bind(this);
    }

    componentDidMount() {
        AxiosCenter.getAllAmendmentByContratId(this.props.match.params.id).then((result) => {
            this.setState({amendments: result.data, loaded: true})
        })
    }

    amendmentList() {
        if (this.state.amendments.length > 0 && !null) {
            const amendments = this.state.amendments.map((amendment) => (
                    <div key={amendment.id}
                         className={(amendment.signe === true) ? "alert alert-success" : "alert alert-danger"} role="alert">
                        <h5 className="clearfix">{amendment.id} - {amendment.reference} : {amendment.dateDeCreation} - {(amendment.signe === true) ? "Signé le :" : "En attente de signature"} {amendment.dateDeSignature}
                            {(amendment.signe !== true) &&
                            <div className="float-right">
                               <BtnDropzone id={amendment.id} title={"Upload Amendment"}/>
                            </div>
                            }
                        </h5>


                    </div>
                )
            )
            return (
                <div>
                    {amendments}
                </div>
            );
        }
        return (
            <div className="alert alert-danger" role="alert"><h5>Il semblerait qu'aucun avenant ne soit rattaché à ce
                contrat</h5></div>)

    }

    render() {
        if (!this.state.loaded) {
            return <Loading/>
        }
        return <this.amendmentList/>
    }
}
