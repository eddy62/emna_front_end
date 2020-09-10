import React from "react";
import {Link} from "react-router-dom";
import AxiosCenter from "../../../../shared/services/AxiosCenter";
import ListeOperations from "./operation/liste_operations/liste_operations";
import Loading from "../../../../shared/component/Loading";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer} from "mdbreact";
import ReleveDetailsCard from "./ReleveDetailsCard";

export class DetailsReleve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      releve: [],
    };
  }

  componentDidMount() {
    AxiosCenter.getReleveById(this.props.match.params.id)
      .then((res) => {
        const releve = res.data;
        this.setState({
          releve,
          releveId: this.props.match.params.id,
          loaded: true
        });
      })
      .catch((err) => console.log(err));
  }

  detailsReleve = (props) => {
    return (
      <div className="containerDetailsReleve">
        <MDBContainer>
          <div>
            <MDBCardHeader color="default-color">
              <MDBCardTitle>
                <h1>Détail de votre relevé</h1>
                <h3>Ce relevé intègre les opérations comptabilisées</h3>
              </MDBCardTitle>
              <br />
            </MDBCardHeader>
          </div>
          <div>
            <hr/>
          </div>
          <ReleveDetailsCard releve={this.state.releve}/>
        </MDBContainer>
      </div>
    );
  };
  render() {
    if (this.state.loaded) {
      return (
        <div>
          <MDBContainer>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="MDBCardTitle">
                    <div>
                      <ReleveDetailsCard releve={this.state.releve} />
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <ListeOperations releveId={this.state.releveId}/>
                      </div>
                    </div>
                    <p>
                      <Link
                        to={"/historiquereleve/" + this.props.match.params.id}
                      >
                        <MDBBtn
                          className="boutton"
                          color=" teal lighten-2"
                          rounded
                          size="sm"
                        >
                          <span id="color-button"> Retour</span>
                        </MDBBtn>
                      </Link>
                    </p>
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBContainer>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
export default DetailsReleve;
