import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";

const TablePrime = (props) => {              
    return (
      <MDBTable>
        <MDBTableHead color="default-color">
          <tr>
            <th className="font-weight-bold">Prime</th>
            <th>Montant</th>
            <th className="w-25"></th>
          </tr>
        </MDBTableHead>
        {props.primeList.length ? (
            <MDBTableBody>
            {props.primeList.map((prime, index) => (
                <tr key={index}>
                    <td>{prime.type}</td>
                    <td>{prime.montant} €</td>
                    {prime.etatVariablePaieId === 1 ? (
                        <td>
                            <MDBBtn color="teal accent-3" rounded size="sm"
                            onClick={() => props.handleClick('PrimeComponent', index)}>UPDATE</MDBBtn>
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
                <td colSpan="3">Pas de prime ce mois</td>
            </tr>
            </MDBTableBody>
        )}
        
      </MDBTable>
    );
  }


  export default TablePrime;