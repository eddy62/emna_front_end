import React from "react";
import FiltresFacture from "./filtreFactures";
import ListeFactures from "./listeFactures";
import Dropdown from "react-bootstrap/Dropdown";
import {BrowserRouter as Link} from "react-router-dom";

class AccueilFacture extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="AccueilFacture">
        <FiltresFacture />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Nouvelle
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/newfacture">Facture</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/newdepense">Depense</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/newdevis">Devis</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ListeFactures />
      </div>
    );
  }
}

export default AccueilFacture;
