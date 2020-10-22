import React from "react";
import "../DeclarationOfEmployment.scss";
import AxiosCenter from "../../../../shared/services/AxiosCenter";

class ContentHtmlDpae extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            codeHtml: null
        }
    }

    componentDidMount() {
        const idDpae = this.props.match.params.id;
        AxiosCenter.getHtmlDpae(parseInt(idDpae))
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
