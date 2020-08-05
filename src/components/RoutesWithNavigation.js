import React, { Component } from "react";
import "../App.scss";
import SideNavigation from "./SideNavigation";
import TopNavigation from "./TopNavigation";
import Routes from "./Routes";
import TokenService from "../shared/services/TokenService";
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      windowWidth: 0,
      currentPage: "",
      sideNavToggled: false,
      breakWidth: 1400,
    };
  }

  componentDidUpdate(prevProps, nextProps, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.assessLocation(this.props.location.pathname);
    }
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    this.assessLocation(this.props.location.pathname);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  toggleSideNav = () => {
    if (this.state.windowWidth < this.state.breakWidth) {
      this.setState({
        sideNavToggled: !this.state.sideNavToggled,
      });
    }
  };

  assessLocation = (location) => {
    let locationString;
    switch (location) {
      case "/contrat":
        locationString = "Contrat";
        break;
      default:
    }
    this.setState({
      currentPage: locationString,
    });
    console.log(location);
    this.props.history.push(location);
  };

  logout = () => {
    this.props.history.push("/login");
    TokenService.deconnexion();
  };

  render() {
    const dynamicLeftPadding = {
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? "240px" : "0",
    };
    if (TokenService.isAuthenticated()) {
      return (
        <div className="app">
          <div className="white-skin">
            <SideNavigation
              breakWidth={this.state.breakWidth}
              style={{ transition: "all .3s" }}
              triggerOpening={this.state.sideNavToggled}
              onLinkClick={() => this.toggleSideNav()}
            />
          </div>
          <div className="flexible-content white-skin">
            <TopNavigation
              logout={this.logout}
              toggle={this.state.windowWidth < this.state.breakWidth}
              onSideNavToggleClick={this.toggleSideNav}
              routeName={this.state.currentPage}
              className="white-skin"
            />
            <main style={{ ...dynamicLeftPadding, margin: "8rem 6% 6rem" }}>
              <Routes onChange={() => this.assessLocation()} />
            </main>
          </div>
        </div>
      );
    } else {
      return <Routes />;
    }
  }
}

export default withRouter(App);
