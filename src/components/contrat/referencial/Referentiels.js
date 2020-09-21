import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn} from "mdbreact";

export default class Referentiels extends React.Component {
    render() {
        return (
            <div>
                <h1>GESTION DES REFERENTIELS</h1>
                <hr/>

                <div className="center">
                    <div className="accueil">
                        <div className="card testimonial-card">
                            <div className="card-up default-color lighten-1"/>
                            <div className="avatar mx-auto white">
                                <i className="fas fa-file fa-7x"/>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Articles</h4>
                                <hr/>

                                <p>
                                    <Link to={"/articles"}>
                                        <MDBBtn className="default-color btn-block my-4 black-text" color="#2BBBAD">
                                            Consulter les articles
                                        </MDBBtn>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="accueil">
                        <div className="card testimonial-card">
                            <div className="card-up default-color lighten-1"/>
                            <div className="avatar mx-auto white">
                                <i className="fas fa-file-alt fa-7x"/>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Clauses</h4>
                                <hr/>

                                <p>
                                    <Link to={"/clauses"}>
                                        <MDBBtn className="default-color btn-block my-4 black-text" color="#2BBBAD"
                                        >
                                            Consulter les clauses
                                        </MDBBtn>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
