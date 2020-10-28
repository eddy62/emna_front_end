import React from "react";
import AxiosCenter from "../../../../../../shared/services/AxiosCenter";
import Loading from "../../../../../../shared/component/Loading";
import {toast} from "react-toastify";
import FormOperation from "../FormOperation";



class PageAddOperationStatement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            releve: [],
        };
    }

    submit = (values, actions) => {
        values.releveId=this.props.match.params.id;
        AxiosCenter.postOperation(values)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong>La nouvelle opération a bien été créé. </strong>
                    </div>
                );
                this.props.history.goBack();
            })
            .catch((error) => {
                console.log(error);
                toast.error(
                    <div className="text-center">
                        <strong>La date n'est pas dans l'interval des dates du relevé &nbsp;&nbsp;!</strong>
                        <br />
                    </div>,
                    { position: "top-right" }
                );
            });
        // console.log(values.date,values.type)
        actions.setSubmitting(true);
    };

    componentDidMount() {
        AxiosCenter.getStatementById(this.props.match.params.id)
            .then((response) => {
                const releve = response.data;
                this.setState({
                    releve,
                    datefin     : this.getISODate(releve.dateFin),
                    datedebut   : this.getISODate(releve.dateDebut),
                    loaded      : true

                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getInitialValues(){
        return{
            description: "",
            solde: "",
            type: "",
            releveId : this.props.match.params.id,
        }
    }


    getISODate = (date) => {
        return new Date(date).toISOString().slice(0,10);
    }

    render() {
        if (!this.state.loaded) return <Loading />
        return (
                <FormOperation 
                title={"Ajout d'opération"}
                releve={this.state} 
                values={this.getInitialValues()} 
                action={this.submit}
                history={this.props.history}/>
        );
            
    }
}

export default PageAddOperationStatement;