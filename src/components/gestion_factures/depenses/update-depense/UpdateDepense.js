import React from "react";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import Loading from "../../../../shared/component/Loading";
import {toast} from "react-toastify";
import DepenseForm from "../DepenseForm";

class UpdateDepense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            expense: {}
        }
    }

    componentDidMount() {
        AxiosCenter.getDepense(this.props.match.params.id)
            .then((response) => {
                const expense = response.data;
                this.setState({expense, loaded: true})
            })
            .catch((err) => console.log(err));
    }

    submit = (values) => {
        values = Object.assign(this.state.expense, values)
        AxiosCenter.updateDepense(values)
            .then((response) => {
                toast.success(
                    <div className="text-center">
                        <strong>Dépenses modifiée &nbsp;&nbsp;!</strong>
                    </div>,
                    {position: "bottom-right"}
                )
                this.props.history.push("/depenses/details/" + response.data.id);
            })
            .catch((err) =>
                toast.error(
                    <div className="text-center">
                        <strong>Dépenses non modifiée &nbsp;&nbsp;!</strong>
                    </div>,
                    {position: "bottom-right"}
                )
            );
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        return <DepenseForm expense={this.state.expense}
                            submit={this.submit}
                            title="Gestion des dépenses"
                            subTitle={`Modifier la dépense n°${this.state.expense.numero}`}
        />
    }
}

export default UpdateDepense;