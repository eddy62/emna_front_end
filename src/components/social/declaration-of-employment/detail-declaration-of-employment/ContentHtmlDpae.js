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
        
        AxiosCenter.getHtmlDpae(1)
       
            .then((response) => {
                this.setState({codeHtml: response.data.html})
        console.log(this.state.codeHtml)

        

            })
    }

    render() {
        return (
            <div className="content" dangerouslySetInnerHTML={{ __html: this.state.codeHtml }}></div>
                // var code  = this.state.codeHtml;
                // var parse = require('html-react-parser');
                // parse('<div>code</div>');
        );
    }
}

export default ContentHtmlDpae;
