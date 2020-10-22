import React from "react";
import "../DeclarationOfEmployment.scss";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow
} from "mdbreact";
import UserService from "../../../../shared/services/UserService";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading";

class ContentHtmlDpae extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            codeHtml: null
        }
    }

    componentDidMount() {
        // TODO : recevoir id depuis ConsultDeclarationOfEmployement
        AxiosCenter.getHtmlDpae(1)
            .then((response) => {
                this.setState({codeHtml: response.data.html})
            })
    }

    render() {
        return (
            <div className="content" dangerouslySetInnerHTML={{ __html: this.state.codeHtml }}></div>
        );
    }
}

export default ContentHtmlDpae;
