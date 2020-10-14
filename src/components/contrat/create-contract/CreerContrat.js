import React from 'react';
import {Field, Form, Formik} from 'formik';
import Loading from "../../../shared/component/Loading";
import {Link} from "react-router-dom";
import AxiosCenter from "../../../shared/services/AxiosCenter";
import UserService from "../../../shared/services/UserService";
import {MDBCard, MDBCardBody, MDBCol, MDBCollapse, MDBCollapseHeader, MDBContainer, MDBInput} from "mdbreact";
import {toast} from "react-toastify";

const ComponentText = ({field, ...props}) => (
    <MDBInput
        type="text"
        label={props.label}
        {...props}
        {...field}
    />
);

const ComponentDate = ({field, ...props}) => (
    <div>
        <MDBInput
            outline
            type="date"
            {...props}
            {...field}
        />
    </div>

);

const ComposantNumber = ({field, ...props}) => (
    <MDBInput
        label={props.label}
        min="0.01"
        step="0.01"
        outline
        type="number"
        {...props}
        {...field}
    />
);

const notify = type => {
    const variable = "Contrat"
    switch (type) {
        case "success":
            toast.success(
                <div className="text-center">
                    <strong>{variable} Enregistré &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "error":
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistré &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
        case "missingInputs":
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistré &nbsp;&nbsp;!
                        <br/>Veuillez remplir tous les articles.</strong>
                </div>
            )
            break;
        case "existingContract":
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistré &nbsp;&nbsp;!
                        <br/>Ce salarié dispose déjà d'un contrat.</strong>
                </div>
            )
            break;
        default:
            toast.error(
                <div className="text-center">
                    <strong>{variable} NON Enregistré &nbsp;&nbsp;!</strong>
                </div>
            );
            break;
    }
};

export default class CreerContrat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            selectedEmploye: null,
            idTypeContrat: null,
            title: '',
            employes: [],
            typeContracts: [],
            articles: [],
            isSubmitDisabled: true,
            //clauses: [],
        };
    }

    handleOnChange = async (e) => {
        await this.setState({
            idTypeContrat: this.state.typeContracts[e.target.value].id,
            title: this.state.typeContracts[e.target.value].intitule
        })
        const isSubmitDisabled = await (this.state.idEmploye === null) || (this.state.idTypeContrat === null);
        this.setState({
            isSubmitDisabled
        })

    }

    handleOnChangeEmploye = async (e) => {
        await this.setState({
            selectedEmploye: this.state.employes[e.target.value]
        })
        const isSubmitDisabled = await (this.state.idEmploye === null) || (this.state.idTypeContrat === null);
        this.setState({
            isSubmitDisabled
        })
    }

    checkFields(inputs) {
        const nbArticles = this.state.articles.length;
        let isError = (inputs.length !== nbArticles);
        let index = 0;

        //Verifying all inputs are created
        while (index < nbArticles && !isError) {
            if (inputs[index] === undefined)
                isError = true;
            index++;
        }

        //Verifying all inputs are not empty
        index = 0;
        while (index < nbArticles && !isError) {
            const nomLibelle = Object.keys(inputs[index]);
            if (inputs[index][nomLibelle] === "")
                isError = true;
            index++;
        }

        return isError;
    }

    /*handleOnChangeClause = (clause) => {
        var present= false;
        var index=0;
        for(var i = 0; i < this.state.clauses.length; i++){
            present=false;
            if ( this.state.clauses[i] == clause) {
                present=true;
                index=i;
                break;
            }
        }
        if(present){
            const list = this.state.clauses;
            list.splice(index,1);
            this.setState({clauses:list});

        }else{
            this.state.clauses.push(clause);
        }



    }*/

    componentDidMount() {
        AxiosCenter.getAllWrapperEmployesBySociety(UserService.getSocietyId()).then((result1) => {
            const employes = result1.data;
            AxiosCenter.getAllTypeContracts().then((result2) => {
                const typeContracts = result2.data;
                AxiosCenter.getAllArticles().then((result3) => {
                    const articles = result3.data;
                    this.setState({
                        employes,
                        typeContracts,
                        articles,
                        loaded: true,
                    })
                }).catch((err) => console.log(err));
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    initialize = (props) => {
        const employes = props.employes.map((employe, index) => {
            return (
                <option key={index} value={index}>{employe.nomUsage} {employe.prenom}</option>
            )
        })

        const typeContracts = props.typeContracts.map((typeContract, index) => {
            return (
                <option key={index} value={index}>{typeContract.intitule}</option>
            )
        })

        //Show all Articles + inputs
        const articles = props.articles.map((article, index) => {
            const name = "wrapperSaisieArticles[" + index + "].libelle_" + article.id
            return (
                <MDBCard key={index}>
                    <MDBCollapseHeader onClick={this.toggleCollapse(index)} className="bg-transparent">
                        {article.titre} : {article.intitule}
                        <i className={props.collapseID === index ? "fa fa-angle-up" : "fa fa-angle-down"}/>
                    </MDBCollapseHeader>
                    <MDBCollapse id={index} isOpen={props.collapseID}>
                        <MDBCardBody>
                            {article.description}
                            {renderInputs(index, name)}
                            {/*<ErrorMessForm error={errors.name}/>*/}
                        </MDBCardBody>
                    </MDBCollapse>
                </MDBCard>
            )
        })

        function renderInputs(index, name) {
            switch (index) {
                default:
                    return (
                        <MDBCol>
                            <Field
                                name={name}
                                component={ComponentText}
                            />
                        </MDBCol>
                    );

                case 1:
                    return (
                        <MDBCol md="4">
                            <Field
                                name={name}
                                component={ComponentDate}
                            />
                        </MDBCol>
                    );

                case 6:
                    return (
                        <MDBCol md="4">
                            <Field
                                name={name}
                                component={ComposantNumber}>€</Field>
                        </MDBCol>
                    );
            }
        }

        //To get the idArticle linked to the input
        function getIdArticleFromLibelle(listSaisiesArticle) {
            let newListSaisiesArticle = [];
            listSaisiesArticle.map((saisieArticle) => {
                let nameLibelle = Object.keys(saisieArticle)[0]
                const id = null;
                const libelle = saisieArticle[nameLibelle];
                const idArticle = nameLibelle.split("_")[1];
                const idContrat = null;

                newListSaisiesArticle.push({id, libelle, idArticle, idContrat});
            })
            return newListSaisiesArticle;
        }

        /*const Articles = props.employe.articleVMList.map((article, b) =>{
            /!*const Clause = article.listClauses.map((clause, c) => {
                return (
                    <div key={c}>
                        <div className="form-group">
                            <div id="feedback">
                                <div className="form-check">

                                    <input type="checkbox" className="form-check-input" name="channel[]"
                                           id={clause.clauseId} value={clause} onChange={(event)=>this.handleOnChangeClause(clause)}/>
                                    <label htmlFor={clause.clauseId}
                                           className="form-check-label">{clause.clauseDesciption}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })*!/
            return (
                <div key={b}>
                    <h5>{article.articleTitre} : {article.articleDescription}</h5>
                    {article.articleReference}
                    {/!*Clause*!/}
                </div>
            )
        })*/

        return (
            <div>
                <h1>Nouveau contrat</h1>

                <Formik
                    initialValues={{
                        id: null,
                        titre: '',
                        dateCreation: '',
                        signe: 'false',
                        archive: 'false',
                        idEmploye: null,
                        idTypeContrat: '',
                        //codeRef: '',
                        //intitule: '',
                        wrapperSaisieArticles: [],
                        //clauses: [],
                    }}
                    onSubmit={async fields => {
                        if (this.state.selectedEmploye.idContrat === null) {
                            if (!this.checkFields(fields.wrapperSaisieArticles)) {
                                fields.titre = this.state.title;
                                fields.idTypeContrat = this.state.idTypeContrat;
                                fields.idEmploye = this.state.selectedEmploye.id;
                                fields.dateCreation = new Date().toISOString().slice(0, 10);
                                fields.wrapperSaisieArticles = await getIdArticleFromLibelle(fields.wrapperSaisieArticles);
                                //fields.clauses = this.state.clauses;
                                //ContratService.postContrat(fields)
                                //.then(response =>{
                                // const blob = new Blob([response.data], { type: 'application/pdf' });
                                // const url = URL.createObjectURL(blob);
                                // window.open(url);
                                // });
                                AxiosCenter.createWrapperContrat(fields).then(() => {

                                    this.props.history.push("/listcontrat/");
                                    notify("success");
                                }).catch((error) => {
                                    console.log(error);
                                    notify("error");
                                });
                                //alert(JSON.stringify(fields, null, 4));
                            } else {
                                notify("missingInputs");
                            }
                        } else
                            notify("existingContract")
                    }}
                >
                    {({
                          errors,
                          status,
                          touched
                      }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="selectTypeContrat"><h5>Type de contrat :</h5></label>
                                <select name="idTypeContrat"
                                        className="browser-default custom-select form-control"
                                        id="selectTypeContrat"
                                        onChange={(event) => this.handleOnChange(event)}
                                        defaultValue={'DEFAULT'}>
                                    <option value="DEFAULT" disabled>Choisissez un type de contrat</option>
                                    {typeContracts}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="selectEmploye"><h5>L'employé :</h5></label>
                                <select name="idEmploye"
                                        className="browser-default custom-select form-control"
                                        id="selectEmploye"
                                        onChange={(event) => this.handleOnChangeEmploye(event)}
                                        defaultValue={'DEFAULT'}>
                                    <option value="DEFAULT" disabled>Choisissez un employé</option>
                                    {employes}
                                </select>
                            </div>

                            <MDBContainer>
                                {articles}
                            </MDBContainer>

                            <div className="clearfix">
                                <div className="form-group">
                                    <button type="submit"
                                            className="btn btn-mdb-color mr-2 float-left"
                                            disabled={this.state.isSubmitDisabled}>Créer le
                                        contrat
                                    </button>
                                    <Link to={"/contrat/"}>
                                        <button type="button" className="btn btn-outline-mdb-color float-right">Retour
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <hr/>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }


    render() {
        const {collapseID} = this.state;
        if (!this.state.loaded) return <Loading/>
        return (
            <this.initialize
                employes={this.state.employes}
                typeContracts={this.state.typeContracts}
                articles={this.state.articles}
                collapseID={collapseID}
                onChange={this.handleOnChange}/>
        );
    }
}