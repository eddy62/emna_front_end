import React from "react";
import ListeFactures from "./listeFactures";
import Dropdown from "react-bootstrap/Dropdown";

class AccueilFacture extends React.Component {
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
        <ListeFactures />
      </div>
    );
  }
}

export default AccueilFacture;
