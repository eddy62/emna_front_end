import React from "react";
import {
  MDBSideNavLink,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBIcon,
} from "mdbreact";

class SideNavigation extends React.Component {
  // render MDBSideNav Link
  rSNL(to, text) {
    return (
      <MDBSideNavLink to={to} onClick={this.props.onLinkClick}>
        {text}
      </MDBSideNavLink>
    );
  }

  render() {
    const { onLinkClick } = this.props;
    return (
      <div className="white-skin">
        <MDBSideNav
          logo="https://mdbootstrap.com/img/Marketing/general/logo/medium/mdb-react.png"
          bg="https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg"
          mask="strong"
          fixed
          breakWidth={this.props.breakWidth}
          triggerOpening={this.props.triggerOpening}
          style={{ transition: "padding-left .3s" }}
          href="/"
        >
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
