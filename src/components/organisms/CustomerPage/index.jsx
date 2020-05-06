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

//> Components
import { ResultChart } from "../../molecules/charts";
import { Services } from "../../molecules";

//> CSS
import "./customer.scss";

class CustomerPage extends React.Component {
  render() {
    const { profile } = this.props;

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
                    {profile.isLoaded && !profile.isEmpty && (
                      <div className="text-left mt-4">
                        {Object.keys(
                          profile.analysis[profile.analysis.length - 1].results
                        ).map((key, i) => {
                          if (
                            profile.analysis[profile.analysis.length - 1]
                              .results[key].value <= 100
                          ) {
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
                <Services profile={profile} />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default CustomerPage;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
