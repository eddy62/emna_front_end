import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ContratService from "../service/ContratService";
import Loading from "../../../shared/component/Loading";
import {Link} from "react-router-dom";

export default class CreerContrat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            contrats: [],
        };
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const id = query.get('id')
        console.log('coucou ' + id)//123
        ContratService.getContrat(1).then((resultat) => {
            const contrats = resultat.data;
            this.setState({ contrats , loaded:true});
        })
            .catch((err) => console.log(err));
    }


    creerContrat(props) {
        return (
            <Formik
                initialValues={{
                    titre: '',
                    dateCreation: '2020-07-29',
                    archive: 'false',
                    signe: 'false',
                }}
                validationSchema={Yup.object().shape({
                    titre: Yup.string()
                        .required('titre is required')
                })}
                onSubmit={fields => {
                    ContratService.postContrat(fields);
                    alert(JSON.stringify(fields, null, 4));
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <select className="browser-default custom-select">
                                <option selected value="CDI TEMPS PLEIN">CDI TEMPS PLEIN</option>
                                <option value="CDI TEMPS PARTIEL">CDI TEMPS PARTIEL</option>
                                <option value="CDD TEMPS PLEIN">CDD TEMPS PLEIN</option>
                                <option value="CDD TEMPS PARTIEL">CDD TEMPS PARTIEL</option>
                            </select>
                            <Field name="titre" type="text" className={'form-control' + (errors.titre && touched.titre ? ' is-invalid' : '')} />
                        </div>



                        <div className="form-group">
                            <button type="submit" className="btn btn-success mr-2">Creer le contrat</button>
                        </div>



                        <Link to={"/contrat/"}>
                            <button type="button" className="btn btn-outline-success">Retour</button>
                        </Link>

                    </Form>

                )}
            />

        );

    }

    render() {
        if(this.state.loaded){
            return(
                <this.creerContrat contrats={this.state.contrats}/>
            );
        }else{
            return (
                <Loading/>
            );
        }

    }
}


