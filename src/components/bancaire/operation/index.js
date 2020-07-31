import React, { Component } from "react";
import ListeOperations from "./listeOperations/listeOperations";
import * as axios from "axios";
import { BrowserRouter as Link } from "react-router-dom";
import AxiosCenter from "../../../shared/services/AxiosCenter";
class IndexOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
      selectedOperation: null,
    };
  }

  componentDidMount() {
    this.appelOperation();
  }

  appelOperation = () => {
    AxiosCenter.getOperation()
      .then((res) => {
        const operations = res.data;
        this.setState({ operations });
      })
      .catch((err) => console.log(err));
  };

  deleteOperation = (id) => {
    axios
      .delete("http://localhost:8080/api/operations/" + id, {
        headers: {
          Authorization: "Basic YWRtaW46YWRtaW4=",
        },
      })
      .then((res) => this.appelOperation());
  };

  updateSelectedOperation = (id) => {
    this.setState({
      selectedOperation: id,
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <br />
          <br />
          <a href="/bancaire">Retour Menu Bancaire</a>
        </div>

        <div
          className="container-fluid p-5 bg-light
        d-flex flex-column justify-content-center align-items-center"
        >
          <ListeOperations
            operations={this.state.operations}
            deleteOperation={this.deleteOperation}
          />
          <div>
            <button className="btn">
              <Link to="/creationoperation">Créer une opération</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default IndexOperation;
