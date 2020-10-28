import React, {Component} from "react";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import UserService from "../../../../shared/services/UserService";
import {toast} from "react-toastify";
import FormStatement from './../FormStatement';


class CreationReleve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            societeId: UserService.getSocietyId(),
            roleUser: UserService.getRole()
        };
    }

    submit = (values, actions) => {
        values.societeId = this.state.societeId;
        AxiosCenter.postStatement(values)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong>Le nouveau relevé {response.data.nom} a bien été créé. </strong>
                    </div>
                )
                console.log(values.date,values.type)
                this.props.history.push("/menureleve");
            })
            .catch((error) => {
                console.log(error);
                toast.error(
                    <div className="text-center">
                        <strong>Erreur lors de la création le nouveau relevé n'a pas été créé &nbsp;&nbsp;!</strong>
                    </div>
                );
            });
       // console.log(values.date,values.type)
        actions.setSubmitting(true);
    };

    setUpValues(){
        return {dateDébut:"",dateFin:"",banque:""}
    }
    render() {
        return (
            <FormStatement 
            title="Création d'un relevé" 
            values={this.setUpValues()}  
            action={this.submit} 
            history={this.props.history}
            />

            
        )
           
    }
}
export default CreationReleve;
