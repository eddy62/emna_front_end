import React from "react";
import {
  MDBSideNavLink,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBIcon,
} from "mdbreact";
import AxiosCenter from "../shared/services/AxiosCenter";
import UserService from "./../shared/services/UserService";

class SideNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      societes: [],
    };
  }
  componentDidMount() {
    if (UserService.getRole() === "ROLE_ACCOUNTANT") {
      AxiosCenter.getComptableByUser(UserService.getUserId()).then(
        (response) => {
          AxiosCenter.getAllSocietesByComptable(response.data.id).then(
            (response) => {
              this.setState({
                societes: response.data,
              });
              UserService.setSocietyId(response.data[0].id);
            }
          );
        }
      );
    } else if (UserService.getRole() === "ROLE_ADMIN") {
      AxiosCenter.getAllSocietes().then((response) => {
        this.setState({
          societes: response.data,
        });
        UserService.setSocietyId(response.data[0].id);
      });
    } else if (UserService.getRole() === "ROLE_SOCIETY") {
      AxiosCenter.getSocieteByUser(UserService.getUserId()).then((response) => {
        UserService.setSocietyId(response.data.id);
      });
    }
  }
  // render MDBSideNav Link
  rSNL(to, text) {
    return (
      <MDBSideNavLink to={to} onClick={this.props.onLinkClick}>
        {text}
      </MDBSideNavLink>
    );
  }
  changeSocietyId() {
    UserService.setSocietyId(document.getElementById("mySelect").value);
  }

  render() {
    const { onLinkClick } = this.props;
    return (
      <div className="white-skin">
        <MDBSideNav
          logo="https://cdn.discordapp.com/attachments/649887310447509524/742351581931896923/logo.png"
          bg="https://mdbootstrap.com/img/Photos/Others/sigdenav4.jpg"
          mask="strong"
          fixed
          breakWidth={this.props.breakWidth}
          triggerOpening={this.props.triggerOpening}
          style={{ transition: "padding-left .3s" }}
          href="/"
        >
          {(UserService.getRole() === "ROLE_ACCOUNTANT") |
          (UserService.getRole() === "ROLE_ADMIN") ? (
            <div>
              <select
                id="mySelect"
                className="browser-default custom-select"
                onChange={() => this.changeSocietyId()}
              >
                {this.state.societes.map((societe) => (
                  <option value={societe.id}>{societe.civilite}</option>
                ))}
              </select>
            </div>
          ) : null}
          <form role="search" className="search-form">
            <div className="form-group md-form mt-0 pt-1 ripple-parent">
              <input
                type="text"
                placeholder="Rechercher"
                className="form-control"
              />
            </div>
          </form>
          <MDBSideNavNav>
            <MDBSideNavCat
              name="Comptabilité"
              id="dashboard-cat"
              icon="tachometer-alt"
            >
              {this.rSNL("/TODO", "Facture")}
              {this.rSNL("/TODO", "Devis")}
              {this.rSNL("/bancaire", "Relevé Bancaire")}
            </MDBSideNavCat>

            <MDBSideNavCat name="Juridique" id="pages-cat" icon="scroll">
              {this.rSNL("/contrat", "Contrat")}
              {this.rSNL("/client-fournisseur", "Société")}
              {this.rSNL("/TODO", "Assemblée Générale")}
            </MDBSideNavCat>

            <MDBSideNavCat name="Social" id="profile-cat" icon="user">
              {this.rSNL("/listEmployes", "Employés")}
              {this.rSNL("/TODO", "Variable Paie")}
              {this.rSNL("/TODO", "Validation")}
              {this.rSNL("/TODO", "Fiche de Paie")}
              {this.rSNL("/TODO", "Déclaration d'embauche")}
            </MDBSideNavCat>

            {/* <MDBSideNavLink topLevel to="/alerts" onClick={onLinkClick}>
              <MDBIcon icon="bell mr-2" />
              Alerts
            </MDBSideNavLink> */}
          </MDBSideNavNav>
        </MDBSideNav>
      </div>
    );
  }
}

export default SideNavigation;
