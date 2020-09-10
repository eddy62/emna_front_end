import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const TableAvanceRappelSalaire = (props) => {
    return (
      <MDBTable>
        <MDBTableHead color="default-color">
          <tr>
            <th className="font-weight-bold">Montant Rappel/Avance sur Salaire</th>
            <th className="w-25"></th>
          </tr>
        </MDBTableHead>
        {props.avanceRappelSalaireList.length ? (
            <MDBTableBody>
            {props.avanceRappelSalaireList.map((avrap, index) => (
                <tr key={index}>
                    <td>{avrap.montant} €</td>
                    {avrap.etatVariablePaieId === 1 ? (
                        <td>
                            <MDBBtn color="teal accent-3" rounded size="sm"
                                onClick={() => props.handleClick('AvanceRappelSalaireComponent', index)}>UPDATE</MDBBtn>
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
                    <td  colSpan="2">Pas d'avance/rappel sur salaire ce mois</td>
                </tr>     
            </MDBTableBody> 
        )}
      </MDBTable>
    );
  }


  export default TableAvanceRappelSalaire;