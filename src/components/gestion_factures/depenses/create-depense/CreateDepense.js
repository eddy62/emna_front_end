import React from "react";
import axioscenter from "../../../../shared/services/AxiosCenter";
import UserService from "../../../../shared/services/UserService";
import Loading from "../../../../shared/component/Loading";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";
import DepenseForm from "../DepenseForm";

class CreateDepense extends React.Component {
    state = {
        loaded: false
    };

    componentDidMount() {
        axioscenter.getInfosForCreationFacture(UserService.getSocietyId()).then((resarray) => {
            this.setState({
                clients: resarray[1].data,
                numfact: resarray[0].data + 1,
                loaded: true
            })
        })
    }

    submit = (values) => {
        values.societeId = UserService.getSocietyId()
        AxiosCenter.createWrapperDepense(values)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong>Dépenses créée &nbsp;&nbsp;!</strong>
                    </div>,
                    {position: "bottom-right"}
                )
                this.props.history.push("/depenses/details/" + response.data.id);
            })
            .catch((err) => {
                    console.log(err);
                    toast.error(
                        <div className="text-center">
                            <strong>Dépenses non créée &nbsp;&nbsp;!</strong>
                        </div>,
                        {position: "bottom-right"}
                    )
                }
            );
    };

    render() {
        if (!this.state.loaded) return <Loading/>
        return <DepenseForm expense={{}}
                            submit={this.submit}
                            title="Gestion des Dépenses"
                            subTitle="Ajouter une dépense"
        />
    }
}

export default CreateDepense;
