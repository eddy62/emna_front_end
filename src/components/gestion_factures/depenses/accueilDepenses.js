import React from "react";
import ListeDepenses from "./listeDepenses";
import Dropdown from "react-bootstrap/Dropdown";

class AccueilDepense extends React.Component {
  constructor(props) {
    super();
  }

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
            <Dropdown.Item href="/newdepense">
              Depense
            </Dropdown.Item>
            <Dropdown.Item href="/newdevis">
             Devis
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ListeDepenses />
      </div>
    );
  }
}

export default AccueilDepense;
