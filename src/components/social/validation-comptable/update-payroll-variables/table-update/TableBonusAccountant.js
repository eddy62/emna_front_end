import React from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const notify = type => {
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>Prime Rejetée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>Prime NON Rejetée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>Prime NON Rejetée &nbsp;&nbsp;!</strong>
                </div>,
            );
            break;
    }
};


export default class TableBonusAccountant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalRejectBonus: false,
            index: null,
        }
    }

    toggleModalRejectBonus = (key) => {
        this.setState({
            index: key,
            modalRejectBonus: !this.state.modalRejectBonus,
        });

    }

    callBackToRejectBonus = () => {
        this.props.primeList[this.state.index].etatVariablePaieId = 1;
        console.log(this.props.primeList[this.state.index].etatVariablePaieId)
        AxiosCenter.updateBonus(this.props.primeList[this.state.index]).then(() => {
            this.toggleModalRejectBonus();
            notify('success');
        }).catch((error) => {
            console.log(error);
            notify('error');
        });
    }

    render() {
        return (
            <div>
                <MDBTable>
                    <MDBTableHead color="default-color">
                        <tr>
                            <th className="font-weight-bold">Primes</th>
                            <th>Montant</th>
                            <th className="w-25"></th>
                        </tr>
                    </MDBTableHead>
                    {this.props.primeList.length ? (
                        <MDBTableBody>
                            {this.props.primeList.map((prime, index) => (
                                <tr key={index}>
                                    <td>{prime.intitule}</td>
                                    <td>{prime.montant} €</td>
                                    {prime.etatVariablePaieId === 2 ? (
                                        <td>
                                            <MDBBtn color="danger" rounded size="sm"
                                                    onClick={() => this.toggleModalRejectBonus(index)}>REJETER</MDBBtn>
                                        </td>
                                    ) : prime.etatVariablePaieId === 1 ?(
                                        <td>Á traiter en paye</td>
                                    ) :  (
                                        <td>Validé</td>
                                    )}
                                </tr>
                            ))}
                        </MDBTableBody>
                    ) : (
                        <MDBTableBody>
                            <tr>
                                <td colSpan="3">Pas de Prime ce mois</td>
                            </tr>
                        </MDBTableBody>
                    )}

                </MDBTable>
                {/** MODALE UPDATE */}
                <MDBModal isOpen={this.state.modalRejectBonus} backdrop={false} centered size="lg">
                    <MDBModalBody>
                        <p>Rejeter la Prime ?</p>
                        <MDBBtn color="danger" rounded size="sm"
                                onClick={this.callBackToRejectBonus}>Rejeter</MDBBtn>
                        <MDBBtn color="teal accent-3" rounded size="sm"
                                onClick={this.toggleModalRejectBonus}>Annuler</MDBBtn>

                    </MDBModalBody>
                </MDBModal>

            </div>
        );
    }
}
