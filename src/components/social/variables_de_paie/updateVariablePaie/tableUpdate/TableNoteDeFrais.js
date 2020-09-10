import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const TableNoteDeFrais = (props) => {
    return (
      <MDBTable>
        <MDBTableHead color="default-color">
          <tr>
            <th className="font-weight-bold">Note de frais</th>
            <th>Date</th>
            <th>Montant</th>
            <th>Justificatif(s)</th>
            <th className="w-25"></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {props.noteDeFraisList.map((frais, index) => (
            <tr key={index}>
                <td>{frais.designation}</td>
                <td>{frais.date}</td>
                <td>{frais.montant} €</td>
                <td>{frais.justificatif}</td>
                {frais.etatVariablePaieId === 1 ? (
                    <td>                                
                        <MDBBtn color="teal accent-3" rounded size="sm"
                            onClick={() => props.handleClick('NoteDeFraisComponent', index)}>UPDATE</MDBBtn>
                        <MDBBtn color="danger" rounded size="sm"
                            >DELETE</MDBBtn>
                    </td>
                ) : (
                    <td>Confirmé</td>
                )}
            </tr>
        ))}          
        </MDBTableBody>
      </MDBTable>
    );
  }

  export default TableNoteDeFrais;