/*import React, { Component } from "react";

export default class AbsenceComponent extends Component {

    render(){
        console.log(this.props.object);
        return(
            <div>
            <div>AbsenceComponent</div>
            <div>{this.props.object.intitule}</div>
            </div>
        )
    }
}*/

import React from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
} from "mdbreact";
import ModifyHeuresSupplementaires from "./ModifyHeuresSupplementaires";
import ModifyAvanceRappelSalaire from "./ModifyAvanceRappelSalaire";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";

class AbsenceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalHeure: false,
            modalAvance: false,
            heureSupplementaire: null,
            avance : null
        }
    }

    toggleHeure = () => {
        this.setState({
            modalHeure: !this.state.modalHeure,
        });
    }

    toggleAvance = () => {
        this.setState({
            modalAvance: !this.state.modalAvance
        });
    }


    componentDidMount() {

    }

    /* TODO Créer les 2 GET dans AxiosCenter pour tester
    updateValues() {
        AxiosCenter.getHeureSupByID(1051)
            .then((response) => {
                this.state.heureSupplementaire = response.data;
            });
        AxiosCenter.getAvanceByID(1101)
            .then((response) => {
                this.state.avanceRappelSalaire = response.data;
            });
    }
    */

    render() {
        return (
            //this.updateValues(),
            <MDBContainer>


                <MDBBtn onClick={this.toggleHeure}>Test HeureSup</MDBBtn>
                <MDBModal isOpen={this.state.modalHeure} toggle={this.toggleHeure} size="lg">
                    <MDBModalHeader color="default-color" toggle={this.toggleHeure}>
                        Modification heure(s) supplémentaire(s)
                    </MDBModalHeader>
                    <MDBModalBody>
                        <ModifyHeuresSupplementaires
                            heureSupplementaire={this.state.heureSupplementaire}
                            toggleHeure={this.toggleHeure}
                        />
                    </MDBModalBody>
                </MDBModal>


                <MDBBtn onClick={this.toggleAvance}>Test Avance</MDBBtn>
                <MDBModal isOpen={this.state.modalAvance} toggle={this.toggleAvance} size="lg">
                    <MDBModalHeader color="default-color" toggle={this.toggleAvance}>
                        Modification Avance/Rappel sur salaire
                    </MDBModalHeader>
                    <MDBModalBody>
                        <ModifyAvanceRappelSalaire
                            avanceRappelSalaire={this.state.avanceRappelSalaire}
                            toggleAvance={this.toggleAvance}
                        />
                    </MDBModalBody>
                </MDBModal>


            </MDBContainer>
        )
    }
}

export default AbsenceComponent;