import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./style.scss";
export default function ListeOperations(props) {
  const Operations = props.operations.map((operation, index) => {
    return (
      <Card key={operation.id}>
        <Card.Header>
          <Accordion.Toggle
            className="AccordionToggle"
            as={Button}
            variant="link"
            eventKey={index + 1}
          >
            {operation.date} {operation.description} {operation.type} :
            {operation.solde}€
          </Accordion.Toggle>
          <button
            data-icon="trash"
            className="btn btn-small btn-danger"
            onClick={() => props.deleteOperation(operation.id)}
          >
            X
          </button>
        </Card.Header>
        <Accordion.Collapse eventKey={index + 1}>
          <Card.Body>
            <div className="row">
              <div className="col-8">
                <p>
                  <span className="detailsdesoperations">Date :</span>
                  {operation.date}
                </p>

                <p>
                  <span className="detailsdesoperations">Libéllé :</span>
                  {operation.description}
                </p>

                <p>
                  <span className="detailsdesoperations">
                    Type de l'opération :
                  </span>
                  {operation.type}
                </p>

                <p>
                  <span className="detailsdesoperations">
                    Solde de l'opération :
                  </span>
                  {operation.solde}
                </p>

                <p>
                  <span className="detailsdesoperations">Rapprocher :</span>
                  {operation.rapprocher}
                </p>
                <br />
                <button
                  className="btn btn-small"
                  onClick={() => props.modifierOperation(operation.id)}
                >
                  Modifier
                </button>
              </div>
              <div className="col-4">Liste des Factures</div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  });

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-5">Operation</h1>
      <Accordion>{Operations}</Accordion>
    </div>
  );
}
