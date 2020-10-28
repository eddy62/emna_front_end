import React, { Component } from 'react';
import AxiosCenter from '../../../../../shared/services/AxiosCenter';
import UserService from '../../../../../shared/services/UserService';
import Loading from '../../../../../shared/component/Loading';
import FormStatement from './../../FormStatement';




export default class EditStatement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false, 
      statement: {},
      roleUser: UserService.getRole()
    }
  }

  getInitialValues = () => {
    return this.state.statement;
  }

  componentDidMount() {
    if (this.state.roleUser === "ROLE_SOCIETY" || 
        this.state.roleUser === "ROLE_ADMIN") {
          const idStatement = this.props.match.params.id;
          AxiosCenter.getStatementById(idStatement)
          .then((response) => {
            const statement = response.data;
            this.setState({ statement: statement, loaded: true });
          })
          .catch((error) => {
            console.log(error);
          })
        }
  }

  submit = (values) => {
    AxiosCenter.updateStatement(values)
      .then((response) => {
        const statement = response.data;
        this.props.history.push("/detailsreleveinvalide/" + statement.id);
      })
      .catch((err) => console.log(err));
  };



  render() {
    if (!this.state.loaded) return <Loading />
    return (
      <FormStatement 
      title="Modification d'un relevé"
       values={this.getInitialValues()} 
       action={this.submit} 
       history={this.props.history} />
    )   
  }
}