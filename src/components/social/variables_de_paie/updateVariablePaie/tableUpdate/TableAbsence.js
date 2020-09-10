import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const TableAbsence = (props) => {
    return (
      <MDBTable>
        <MDBTableHead color="default-color">
          <tr>
            <th className="font-weight-bold">Absence</th>
            <th>Du</th>
            <th>Au</th>
            <th>Justificatif(s)</th>
            <th className="w-25"></th>
          </tr>
        </MDBTableHead>                
        {props.absenceList.length ? (
            <MDBTableBody>
                {props.absenceList.map((abs, index) => (
                    <tr key={index}>
                        <td>{abs.intitule}</td>
                        <td>{abs.debutAbsence}</td>
                        <td>{abs.finAbsence}</td>
                        <td>{abs.justificatif}</td>
                        {abs.etatVariablePaieId === 1 ? (
                            <td>
                                {/*console.log(index)*/}
                                <MDBBtn color="teal accent-3" rounded size="sm"
                                 onClick={() => props.handleClick('AbsenceComponent', index)}>UPDATE</MDBBtn>
                                <MDBBtn color="danger" rounded size="sm">DELETE</MDBBtn>
                            </td>
                        ) : (
                            <td>Confirmé</td>
                        )}
                    </tr>
                ))}          
                </MDBTableBody>
        ) : (
            <MDBTableBody>
                <tr>
                    <td colSpan="5">Pas d'absence ce mois</td>
                </tr>
            </MDBTableBody>
        )}
      </MDBTable>
    );
  }

  export default TableAbsence;