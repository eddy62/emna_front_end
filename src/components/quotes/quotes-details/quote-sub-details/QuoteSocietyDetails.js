import React from "react";
import {MDBCard, MDBCardBody, MDBCol, MDBRow} from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import UserService from "../../../../shared/services/UserService";
import Loading from "../../../../shared/component/Loading";

class QuoteSocietyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            society: {}
        }
    }

    componentDidMount() {
        AxiosCenter.getSocietyById(UserService.getSocietyId())
            .then((res) => {
                this.setState({society: res.data, loaded:true});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        const society = this.state.society;
        return (
            <MDBCard className="border-0">
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md="4">
                            <b>{society.civilite}</b>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4"> {society.numeroRue} , {society.nomRue}</MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4">{society.codePostal}, {society.ville}, {society.pays}</MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4">Telephone : {society.telephone}</MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        )
    }

}

export default QuoteSocietyDetails;

