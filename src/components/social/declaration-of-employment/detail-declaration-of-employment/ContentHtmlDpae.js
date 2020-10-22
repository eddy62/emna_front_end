import React from "react";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import {MDBBtn, MDBContainer, MDBRow} from "mdbreact";

class ContentHtmlDpae extends React.Component {
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

    getPdf = (id) => {
        AxiosCenter.getPdfDpae(id)
            .then((response) => {
                const file = new Blob(
                    [response.data],
                    {type: 'application/pdf'});
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);
           })
    };

        render()
        {
            return (
                <div>
                    <div className="content" dangerouslySetInnerHTML={{__html: this.state.codeHtml}}>
                    </div>
                    <div className="navigate">
                        <MDBContainer>
                            <MDBRow around between>
                                <MDBBtn
                                    color="teal accent-3"
                                    rounded
                                    size="sm"
                                    onClick={() => {
                                        this.props.history.go(-1);
                                    }}
                                >
                                    Retour liste
                                </MDBBtn>
                                <MDBBtn
                                    color="teal accent-3"
                                    rounded
                                    size="sm"
                                    onClick={() => {
                                        this.getPdf(this.props.match.params.id);
                                    }}
                                >
                                    Afficher en pdf
                                </MDBBtn>
                            </MDBRow>
                        </MDBContainer>
                    </div>
                </div>

            );
        }
    }

    export
    default
    ContentHtmlDpae;
