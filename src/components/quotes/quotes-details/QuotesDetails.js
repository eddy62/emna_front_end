import React from "react";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import Loading from "../../../shared/component/Loading";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBContainer} from "mdbreact";
import QuotePrimaryDetails from "./quote-sub-details/QuotePrimaryDetails";
import QuoteProductsDetails from "./quote-sub-details/QuoteProductsDetails";
import QuoteClientDetails from "./quote-sub-details/QuoteClientDetails";
import RedirectionBtn from "../../../shared/component/buttons/RedirectionBtn";
import QuoteSocietyDetails from "./quote-sub-details/QuoteSocietyDetails";


class QuoteDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            quote: {}
        }
    }

    componentDidMount() {
        AxiosCenter.getQuoteById(this.props.match.params.id).then(res => {
            this.setState({quote: res.data, loaded: true})
        }).catch((error) => {
            console.log(error);
        });
    }

    getQuoteAsPdf = () => {
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        return (
            <MDBContainer>
                <MDBCard>
                    <MDBCardHeader color="default-color">
                        <MDBCardTitle tag="h1">
                            Devis n° {this.state.quote.numDevis}
                        </MDBCardTitle>
                    </MDBCardHeader>
                    <hr/>
                    <MDBCardHeader tag="h4" color="teal lighten-5" text="black">
                        Detail d'un devis
                    </MDBCardHeader>
                    <MDBCardBody>
                        <QuoteSocietyDetails/>
                        <QuotePrimaryDetails quote={this.state.quote}/>
                        <QuoteClientDetails quote={this.state.quote}/>
                        <QuoteProductsDetails quote={this.state.quote}/>
                    </MDBCardBody>
                </MDBCard>
                <RedirectionBtn
                    color="info"
                    to={"/devis/details/" + this.state.quote.id}
                    size="sm"
                    onClick={this.getQuoteAsPdf}
                    txt="Télécharger"
                />
                <RedirectionBtn color="info"
                                size="sm"
                                txt="Valider"
                />
                <RedirectionBtn color="danger"
                                size="sm"
                                txt="Supprimer"
                />
            </MDBContainer>
        )
    }
}

export default QuoteDetails;