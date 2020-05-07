//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardUp,
  MDBAvatar,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
  MDBIcon,
  MDBBadge,
  MDBNav,
  MDBNavLink,
  MDBNavItem,
  MDBTabContent,
  MDBTabPane,
  MDBProgress,
} from "mdbreact";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import {
  requestImprovement,
  setFirstLogged,
} from "../../../store/actions/authActions";

//> Components
import { ResultChart } from "../../molecules/charts";
import { Services } from "../../molecules";

//> CSS
import "./customer.scss";

class CustomerPage extends React.Component {
  render() {
    const { profile } = this.props;
    let orderedResults = {};

    if (profile.isLoaded && !profile.isEmpty) {
      // Order data
      // Initialize data
      const unsortedData =
        profile.analysis[profile.analysis.length - 1].results;
      // Sort object

      Object.keys(unsortedData)
        .sort()
        .forEach(function (key) {
          orderedResults[key] = unsortedData[key];
        });

      // Check if the user has logged in yet
      if (!profile.firstLogin) {
        // If this is the first time logging in, set the timestamp of the first login
        this.props.setFirstLogged();
      }
    }

    return (
      <div id="customerpage">
        <div className="py-4 greeting-actions">
          <MDBContainer>
            <MDBRow className="flex-center">
              <MDBCol md="2" className="text-center">
                <p className="lead">
                  <MDBIcon icon="bolt" className="pr-2 orange-text" />
                  Quick actions
                </p>
              </MDBCol>
              <MDBCol md="5" className="text-center">
                <a href="mailto:info@aichner-christian.com">
                  <MDBBtn color="agency-red">
                    <MDBIcon icon="envelope" />
                    Kontakt
                  </MDBBtn>
                </a>
                <a
                  href="https://termin.aichner.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MDBBtn color="white">
                    <MDBIcon icon="calendar" />
                    Termin
                  </MDBBtn>
                </a>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        <div className="py-4">
          <MDBContainer>
            {!profile.isLoaded && <MDBProgress material preloader />}
            <MDBRow>
              <MDBCol md="5">
                <MDBCard>
                  <MDBCardBody className="text-center">
                    <p className="lead font-weight-bold mb-1">Das Ergebnis</p>
                    <p className="text-muted mb-4">
                      Hier aufgeführt sind die Hauptkategorien Deiner Online
                      Präsenz, bewertet von unseren Experten.
                    </p>
                    {profile.isLoaded && !profile.isEmpty && (
                      <ResultChart
                        data={
                          profile.analysis[profile.analysis.length - 1].results
                        }
                      />
                    )}
                    {profile.isLoaded && !profile.isEmpty && orderedResults && (
                      <div className="text-left mt-4">
                        {Object.keys(orderedResults).map((key, i) => {
                          if (orderedResults[key].value <= 100) {
                            return (
                              <React.Fragment key={i}>
                                <span className="mb-0">
                                  {
                                    profile.analysis[
                                      profile.analysis.length - 1
                                    ].results[key].name
                                  }
                                </span>
                                <MDBProgress
                                  value={
                                    profile.analysis[
                                      profile.analysis.length - 1
                                    ].results[key].value
                                  }
                                  className="mb-0"
                                />
                                <small className="d-block text-muted mb-2">
                                  {Math.round(
                                    (profile.analysis[
                                      profile.analysis.length - 1
                                    ].results[key].value +
                                      Number.EPSILON) *
                                      100
                                  ) / 100}{" "}
                                  / 100
                                </small>
                              </React.Fragment>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="7">
                <Services
                  profile={profile}
                  orderedResults={orderedResults}
                  requestImprovement={this.props.requestImprovement}
                />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestImprovement: (type) => dispatch(requestImprovement(type)),
    setFirstLogged: () => dispatch(setFirstLogged()),
  };
};

export default connect(null, mapDispatchToProps)(CustomerPage);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
