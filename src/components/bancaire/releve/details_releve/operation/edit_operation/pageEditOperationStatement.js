import React from "react";
import AxiosCenter from "../../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../../shared/component/Loading";
import UserService from "../../../../../../shared/services/UserService";
import FormOperation from "../FormOperation";
import {toast} from "react-toastify";
class EditOperation extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      operation: {},
    };
  }

  getInitialValues = () => {
    console.log(this.state.operation)
    return this.state.operation;
  };

  getISODate = (date) => {
    return new Date(date).toISOString().slice(0,10);
}

  isTypeSelected = (value) => {
    if (value === this.state.type) return "selected";
  }

  componentDidMount() {
    if (UserService.isAdmin() || UserService.isSociety()) {
      const idOperation = this.props.match.params.id;
      AxiosCenter.getOperationById(idOperation)
      .then((response) => {
        const operation = response.data;
        AxiosCenter.getStatementById(operation.releveId)
                   .then((response) => {
                    const releve = response.data;
                    this.setState({ operation   : operation,
                                    datefin     : this.getISODate(releve.dateFin),
                                    datedebut   : this.getISODate(releve.dateDebut),
                                    loaded      : true });
                    })
                   .catch((error) => {
                      console.log(error);
                    });
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
  }

  submit = (values, actions) => {
    AxiosCenter.updateOperation(values)
      .then((response) => {
        const operation = response.data;
        toast.success(
          <div className="text-center">
              <strong>La nouvelle opération a bien été créé. </strong>
          </div>
          
      );
      this.props.history.goBack();
      })
      
      .catch((err) => console.log(err));
    actions.setSubmitting(true);
  };

  render() {
    if (!this.state.loaded) return <Loading />;
    return (
      <FormOperation 
      title={"Modification d'opération"}
      releve={this.state} 
      values={this.getInitialValues()} 
      action={this.submit}
      history={this.props.history}/>
    );
  }
}
export default EditOperation;
