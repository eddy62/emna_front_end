import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer} from "mdbreact";
import AxiosCenter from "../../../../shared/services/AxiosCenter";

const ListReleve = (props) => {
    const releves = props.releves.map((wrapperReleve) => {
        return (
            <tr key={wrapperReleve.id} className="alert alert-success" role="alert">
                <td> {wrapperReleve.dateDebut}</td>
                <td>{wrapperReleve.dateFin}</td>
                <td>{wrapperReleve.solde}</td>
                <td>{wrapperReleve.banque}</td>
                <td>
                    <Link to={props.chemin + wrapperReleve.id}>voir le détail</Link>
                </td>
                <td>
                    <button
                        //className="btn btn-small btn-danger"
                        onClick={() => props.deleteReleve(wrapperReleve.id)}
                    >
                        X
                    </button>
                </td>
                {
                    props.isPdf &&
                <td>
                    <button type="button"
                            className="btn btn-primary"
                            onClick={() => props.getAsPDF(wrapperReleve.id)}
                    >
                        <i className="fas fa-file-pdf" />
                    </button>
                </td>
                }
            </tr>
        );
    });

    return (
        <div className="containerDetailsReleve">
            <MDBContainer>
                <div>
                    <MDBCardHeader color="default-color">
                        <MDBCardTitle tag="h1">{props.titre}</MDBCardTitle>
                        <br />
                    </MDBCardHeader>
                </div>
                <div>
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">Date de création</th>
                                        <th scope="col">Date de fin</th>
                                        <th scope="col">Solde</th>
                                        <th scope="col">Banque</th>
                                    </tr>
                                    </thead>
                                    <tbody>{releves}</tbody>
                                </table>
                                        <MDBBtn
                                            className="boutton"
                                            color=" teal lighten-2"
                                            rounded
                                            size="sm"
                                            onClick={()=>props.goBack()}
                                        >
                                            <span id="color-button"> Retour</span>
                                        </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <br />
                </div>
            </MDBContainer>
        </div>
    );
}

export default ListReleve;