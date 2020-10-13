import React from "react";
import ListDepense from "./list-depense/ListDepense";
import Dropdown from "react-bootstrap/Dropdown";

class AccueilDepense extends React.Component {
  render() {
    return (
      <div className="AccueilFacture">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Nouvelle
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/newfacture">
              Facture
            </Dropdown.Item>
            <Dropdown.Item href="/depenses/create">
              Depense
            </Dropdown.Item>
            <Dropdown.Item href="/newdevis">
             Devis
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ListDepense />
      </div>
    );
  }
}

export default AccueilDepense;
