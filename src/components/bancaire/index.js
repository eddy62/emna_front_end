import React from "react";

export class Bancaire extends React.Component {
  render() {
    return (
      <div>
        Menu Bancaire
        <div>
          <a href="/indexoperation">Opération</a>
          <br />
          <br />
          <a href="/indexreleve">Relevé</a>
        </div>
      </div>
    );
  }
}
export default Bancaire;
