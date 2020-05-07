//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Redirect, withRouter } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { signOut } from "../../../store/actions/authActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

//> Components
import {
  FormCat,
  CatList,
  CoachPage,
  ZombieList,
  CustomerPage,
  InterestedList,
  Requests,
  Contact,
} from "../../organisms";

//> CSS
import "./profilepage.scss";

//> Images
import { ReactComponent as MorningImg } from "../../../assets/icons/morning.svg";
import { ReactComponent as DayImg } from "../../../assets/icons/day.svg";
import { ReactComponent as NightImg } from "../../../assets/icons/night.svg";

class ProfilePage extends React.Component {
  state = {
    activePage: 0,
  };

  componentDidMount = () => {
    // Load welcoming picture
    this.getGreetingImg();

    // Check if there is an active page
    const activePage = localStorage.getItem("activePage");

    if (activePage) {
      this.setState({
        activePage: parseInt(activePage),
      });
    }
  };

  getGreetingTxt = () => {
    // Get date
    let today = new Date();
    // Get current hours
    let curHr = today.getHours();

    // Store selected greeting
    let selected = null;

    if (curHr > 5 && curHr <= 11) {
      selected = <span>Guten Morgen</span>;
    } else if (curHr > 11 && curHr <= 17) {
      selected = <span>Willkommen</span>;
    } else if (curHr > 17 || curHr > 0) {
      selected = <span>Guten Abend</span>;
    }

    return selected;
  };

  getGreetingImg = () => {
    // Get date
    let today = new Date();
    // Get current hours
    let curHr = today.getHours();

    if (curHr > 5 && curHr <= 11) {
      this.setState({ greetingImage: <MorningImg className="img-fluid" /> });
    } else if (curHr > 11 && curHr <= 17) {
      this.setState({ greetingImage: <DayImg className="img-fluid" /> });
    } else if (curHr > 17 || curHr > 0) {
      this.setState({ greetingImage: <NightImg className="img-fluid" /> });
    }
  };

  goTo = (name) => {
    let to;
    switch (name) {
      case "formcat":
        to = 1;
        break;
      case "catlist":
        to = 2;
        break;
      case "zombielist":
        to = 3;
        break;
      case "interestedList":
        to = 4;
        break;
      case "requests":
        to = 5;
        break;
      case "contact":
        to = 6;
        break;
      default:
        to = 0;
    }
    this.setState(
      {
        activePage: to,
      },
      () => localStorage.setItem("activePage", to)
    );
  };

  render() {
    const { auth, profile } = this.props;

    // Check if firebase has loaded profile data
    if (!profile.isLoaded) {
      return (
        <MDBContainer className="flex-center my-5 py-5">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </MDBContainer>
      );
    } else {
      // Check if logged in
      if (auth.uid === undefined) return <Redirect to="/" />;

      return (
        <div id="profile">
          <div className="greeting py-5 text-center position-relative">
            <div
              className="text-right mb-5 position-absolute"
              style={{ right: "1rem", top: "1rem" }}
            >
              <MDBBtn
                color="white"
                size="md"
                onClick={() => this.props.signOut()}
              >
                Ausloggen
              </MDBBtn>
            </div>
            {this.state.greetingImage}
            <h2 className="text-center font-weight-bold">
              {this.getGreetingTxt()}{" "}
              <span>
                {profile.full_name
                  ? profile.full_name.split(" ")[0]
                  : profile.first_name
                  ? profile.first_name
                  : ""}
              </span>
              !
            </h2>
          </div>
          {!profile.coach ? (
            <CustomerPage profile={profile} />
          ) : (
            <>
              <div className="py-4 greeting-actions">
                <MDBContainer>
                  <MDBRow className="flex-center">
                    <MDBCol md="2" className="text-center">
                      <p className="lead">
                        <MDBIcon icon="bolt" className="pr-2 orange-text" />
                        Quick actions
                      </p>
                    </MDBCol>
                    <MDBCol md="6" className="text-center">
                      {this.state.activePage !== 0 ? (
                        <MDBBtn color="indigo" onClick={() => this.goTo(0)}>
                          <MDBIcon icon="columns" />
                          Dashboard
                        </MDBBtn>
                      ) : (
                        <>
                          <a
                            href="https://console.firebase.google.com/u/0/project/wca-kisy/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MDBBtn color="warning">
                              <MDBIcon fab icon="google" />
                              Firebase
                            </MDBBtn>
                          </a>
                          <a
                            href="https://outlook.office.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MDBBtn color="blue">
                              <MDBIcon fab icon="microsoft" />
                              MS Office
                            </MDBBtn>
                          </a>
                          <a
                            href="https://my.sevdesk.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MDBBtn color="red">
                              <MDBIcon icon="dollar-sign" />
                              SevDesk
                            </MDBBtn>
                          </a>
                        </>
                      )}
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </div>
              <div className="main">
                <MDBContainer className="py-5">
                  {this.state.activePage === 0 && (
                    <CoachPage goTo={this.goTo} profile={profile} />
                  )}
                  {this.state.activePage === 1 && <FormCat />}
                  {this.state.activePage === 2 && <CatList goTo={this.goTo} />}
                  {this.state.activePage === 3 && <ZombieList />}
                  {this.state.activePage === 4 && <InterestedList />}
                  {this.state.activePage === 5 && <Requests goTo={this.goTo} />}
                  {this.state.activePage === 6 && <Contact />}
                </MDBContainer>
              </div>
            </>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePage));

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
