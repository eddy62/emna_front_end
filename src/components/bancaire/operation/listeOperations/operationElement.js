import React, { Component } from "react";

export default class OperationElement extends Component {
  mouseEnter = () => {
    this.props.updateSelectedOperation(this.props.operation.id);
  };

  render() {
    return (
      <div onMouseEnter={this.mouseEnter} className="w-50 p-2">
        <div className="w-25 border p-4 d-flex flex-column">
          <div>
            <span> {this.props.operation.date} </span>
            <span> {this.props.operation.description}</span>
            <span>{this.props.operation.type}</span>
            <span>{this.props.operation.rapprocher}</span>
            <span>{this.props.operation.solde}</span>
          </div>
        </div>
      </div>
    );
  }
}
