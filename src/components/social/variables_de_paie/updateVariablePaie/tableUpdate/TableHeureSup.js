import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const TableHeureSup = (props) => {
    return (
      <MDBTable>
        <MDBTableHead color="default-color">
          <tr>
            <th className="font-weight-bold">Nombre d'heures supplémentaires</th>
            <th>Date</th>
            <th className="w-25"></th>
          </tr>
        </MDBTableHead>
        {props.heureSupList.length ? (
        <MDBTableBody>
            {props.heureSupList.map((hsupp, index) => (
                <tr key={index}>
                    <td>{hsupp.nombreHeure} heure(s)</td>
                    <td>{hsupp.date}</td>
                    {hsupp.etatVariablePaieId === 1 ? (
                        <td>
                            <MDBBtn color="teal accent-3" rounded size="sm"
                                onClick={() => props.handleClick('HeureSupComponent', index)}>UPDATE</MDBBtn>
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
                    <td colSpan="3">Pas d'heures supplémentaires ce mois</td>
                </tr>     
            </MDBTableBody>              
        )}  
      </MDBTable>
    );
  }

  export default TableHeureSup;