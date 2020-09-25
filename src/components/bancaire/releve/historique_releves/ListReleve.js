import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer} from "mdbreact";

const ListReleve = (props) => {
    const releves = props.releves.map((wrapperReleve) => {
        return (
            <tr key={wrapperReleve.releve.id} className="alert alert-success" role="alert">
                <td> {wrapperReleve.releve.dateDebut}</td>
                <td>{wrapperReleve.releve.dateFin}</td>
                <td>{wrapperReleve.solde}</td>
                <td>{wrapperReleve.releve.banque}</td>
                <td>
                    <Link to={props.chemin + wrapperReleve.releve.id}>voir le détail</Link>
                </td>
                <td>
                    <button
                        //className="btn btn-small btn-danger"
                        onClick={() => props.deleteReleve(wrapperReleve.releve.id)}
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    });

function goBack(){
    return props.goBack;
}

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
                                            onClick={goBack()}
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