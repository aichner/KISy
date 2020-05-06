//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Additional
// Axios
import axios from "axios";

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
  MDBAlert,
  MDBProgress,
  MDBCardFooter,
} from "mdbreact";

//> Tabs
const tabs = [
  { name: "Mein Potential", color: "red", icon: "fire-alt" },
  { name: "Meine Website", color: "orange", icon: "desktop" },
  {
    name: "Mein Social Media",
    color: "cyan",
    icon: "comments",
  },
  { name: "Mein Image", color: "green", icon: "award" },
  { name: "Meine Präsenzen", color: "deep-purple", icon: "bullhorn" },
];

class Services extends React.Component {
  state = { activeItem: 0 };

  componentDidMount = () => {
    //this.getAnalytics();

    if (this.props.profile && this.props.profile.analysis) {
      this.getDetails();
    }
  };

  toggleInnerPills = (tab) => (e) => {
    e.preventDefault();

    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };

  getDetails = () => {
    const rawData = this.props.profile.analysis[
      this.props.profile.analysis.length - 1
    ].raw_data;
    const webResults = Object.keys(rawData).map((key, i) => {
      switch (key) {
        case "web_analysis":
          return {
            value: rawData[key],
            name: "Analytics Einbindungen",
          };
          break;
        case "web_design":
          return {
            value: rawData[key],
            name: "Design und Useability",
          };
          break;
        case "web_contact":
          return {
            value: rawData[key],
            name: "Kontaktmöglichkeiten",
          };
          break;
        case "web_legal":
          return {
            value: rawData[key],
            name: "DSGVO, Impressumpflicht und E-Commerce",
          };
          break;
        case "web_picture_quality":
          return {
            value: rawData[key],
            name: "Qualität des Inhalts",
          };
          break;
        case "web_responsive":
          return {
            value: rawData[key],
            name: "Mobile Ansicht",
          };
          break;
        case "web_wording":
          return {
            value: rawData[key],
            name: "Wording",
          };
          break;
        case "seo_https":
          return {
            value: rawData[key],
            name: "Sicherheit",
          };
          break;
        case "seo_meta":
          return {
            value: rawData[key],
            name: "Meta Tags",
          };
          break;
        case "seo_traceability":
          return {
            value: rawData[key],
            name: "Auffindbarkeit",
          };
          break;
        case "seo_domain":
          return {
            value: rawData[key],
            name: "Deine Domain",
          };
          break;
        default:
          return null;
      }
    });

    this.setState({
      webResults: webResults.filter((x) => x),
    });
  };

  getAnalytics = () => {
    /*const url =
      "https://api.cloudflare.com/client/v4/zones/cd7d0123e3012345da9420df9514dad0";

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CLOUDFLARE}`,
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          const res = response.data;

          console.log(res);
        },
        (error) => {
          const status = error;

          console.log(status);
        }
      );*/
  };

  render() {
    const { profile } = this.props;

    return (
      <MDBRow className="services">
        <MDBCol md="4">
          <MDBNav pills color="primary" className="flex-column">
            {tabs.map((tab, i) => {
              return (
                <MDBNavItem key={i}>
                  <MDBNavLink
                    link
                    to="#"
                    active={this.state.activeItem === i}
                    className={"border-" + tab.color}
                    onClick={this.toggleInnerPills(i)}
                  >
                    <MDBIcon icon={tab.icon} className={tab.color + "-text"} />
                    {tab.name}
                  </MDBNavLink>
                </MDBNavItem>
              );
            })}
          </MDBNav>
        </MDBCol>
        <MDBCol md="8">
          <MDBTabContent activeItem={this.state.activeItem}>
            <MDBTabPane tabId={0}>
              <p className="lead font-weight-bold mb-1">
                Wie geht es nun weiter?
              </p>
              <p className="text-muted">
                Durch unsere Analyse wurde aufgezeigt, wo Deine Online-Präsenz
                noch ungenutztes Potential besitzt.
              </p>
              {profile.isLoaded && !profile.isEmpty && (
                <div className="text-left mt-4">
                  {Object.keys(
                    profile.analysis[profile.analysis.length - 1].results
                  ).map((key, i) => {
                    if (
                      profile.analysis[profile.analysis.length - 1].results[key]
                        .value <= 70
                    ) {
                      return (
                        <MDBCard className="border my-2" key={i}>
                          <MDBCardBody>
                            {
                              profile.analysis[profile.analysis.length - 1]
                                .results[key].name
                            }
                          </MDBCardBody>
                          <MDBCardFooter className="d-flex justify-content-between align-items-center">
                            <div className="w-100 pr-3">
                              <small className="mb-0">Ihr Score</small>
                              <MDBProgress
                                value={
                                  profile.analysis[profile.analysis.length - 1]
                                    .results[key].value
                                }
                                className="mb-0"
                              />
                              <small className="d-block text-muted mb-2">
                                {Math.round(
                                  (profile.analysis[profile.analysis.length - 1]
                                    .results[key].value +
                                    Number.EPSILON) *
                                    100
                                ) / 100}{" "}
                                / 100
                              </small>
                            </div>
                            <div>
                              <MDBBtn color="success">Verbessern</MDBBtn>
                            </div>
                          </MDBCardFooter>
                        </MDBCard>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              )}
              <p className="lead font-weight-bold mt-3 mb-0">
                Du hast Fragen zu unseren Angeboten?
              </p>
              <p className="text-muted">
                Gerne bringen wir Dich in sämtlichen Gebieten Deiner
                Online-Präsenz weiter.
              </p>
              <a
                href="https://termin.aichner.cloud"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MDBBtn color="agency-red">
                  <MDBIcon icon="calendar" />
                  Kostenlosen Termin vereinbaren
                </MDBBtn>
              </a>
            </MDBTabPane>
            <MDBTabPane tabId={1}>
              {profile.us && (
                <>
                  {profile.us.web ? (
                    <MDBAlert color="info">
                      Deine Website wird von uns gewartet.
                    </MDBAlert>
                  ) : (
                    <MDBAlert color="warning">
                      Deine Website wurde nicht von uns erstellt.
                    </MDBAlert>
                  )}
                  {profile.us.web ? (
                    <p className="text-muted">Analytics in Arbeit</p>
                  ) : (
                    <>
                      <span className="mb-0">Deine Website Analyse</span>
                      <MDBProgress
                        value={
                          profile.analysis[profile.analysis.length - 1].results
                            .web.value
                        }
                        className="mb-0"
                      />
                      <small className="d-block text-muted mb-2">
                        {Math.round(
                          (profile.analysis[profile.analysis.length - 1].results
                            .web.value +
                            Number.EPSILON) *
                            100
                        ) / 100}{" "}
                        / 100
                      </small>
                      <div className="my-2">
                        {this.state.webResults &&
                          this.state.webResults.map((item, i) => {
                            return (
                              <p className="feature" key={i}>
                                {item.value <= 40 && (
                                  <MDBIcon
                                    icon="times-circle"
                                    className="red-text"
                                  />
                                )}
                                {item.value > 40 && item.value < 80 && (
                                  <MDBIcon
                                    icon="circle"
                                    className="orange-text"
                                  />
                                )}
                                {item.value >= 80 && (
                                  <MDBIcon
                                    icon="check-circle"
                                    className="green-text"
                                  />
                                )}
                                {item.name}
                              </p>
                            );
                          })}
                      </div>
                      <p className="mt-4 mb-1">
                        Du hast eine Frage dazu oder willst Deine Homepage
                        verbessern?
                      </p>
                      <a href="mailto:info@aichner-christian.com">
                        <MDBBtn color="agency-red">Kontakt</MDBBtn>
                      </a>
                    </>
                  )}
                </>
              )}
              {/*<iframe
                sandbox="allow-same-origin allow-forms allow-scripts"
                src="https://www.aichner-christian.com"
                width="320"
                height="320"
                style={{ height: "500px" }}
              ></iframe>*/}
            </MDBTabPane>
            <MDBTabPane tabId={2}>
              {profile.us && (
                <>
                  {profile.us.social ? (
                    <MDBAlert color="info">
                      Dein Social Media wird von uns verwaltet.
                    </MDBAlert>
                  ) : (
                    <MDBAlert color="warning">
                      Dein Social Media wird nicht von uns verwaltet.
                    </MDBAlert>
                  )}
                  <span className="mb-0">Deine Social Media Analyse</span>
                  <MDBProgress
                    value={
                      (profile.analysis[profile.analysis.length - 1].results
                        .facebook.value +
                        profile.analysis[profile.analysis.length - 1].results
                          .instagram.value) /
                      2
                    }
                    className="mb-0"
                  />
                  <small className="d-block text-muted mb-2">
                    {Math.round(
                      ((profile.analysis[profile.analysis.length - 1].results
                        .facebook.value +
                        profile.analysis[profile.analysis.length - 1].results
                          .instagram.value) /
                        2 +
                        Number.EPSILON) *
                        100
                    ) / 100}{" "}
                    / 100
                  </small>
                  {profile.analysis[profile.analysis.length - 1].raw_data
                    .has_facebook ? (
                    <p className="feature">
                      <MDBIcon icon="check-circle" className="green-text" />
                      Du bist auf Facebook aktiv
                    </p>
                  ) : (
                    <p className="feature">
                      <MDBIcon icon="times-circle" className="red-text" />
                      Du bist auf Facebook nicht aktiv
                    </p>
                  )}
                  {profile.analysis[profile.analysis.length - 1].raw_data
                    .has_instagram ? (
                    <p className="feature">
                      <MDBIcon icon="check-circle" className="green-text" />
                      Du bist auf Instagram aktiv
                    </p>
                  ) : (
                    <p className="feature">
                      <MDBIcon icon="times-circle" className="red-text" />
                      Du bist auf Instagram nicht aktiv
                    </p>
                  )}
                  <p className="text-muted">
                    <small>
                      Wir erstellen und verwalten Social Media Profile,
                      erschaffen Content und setzen Kampagnen um.
                    </small>
                  </p>
                </>
              )}
            </MDBTabPane>
            <MDBTabPane tabId={3}>
              {profile.us && (
                <>
                  {profile.us.image ? (
                    <MDBAlert color="info">
                      Dein Image wird von uns verwaltet.
                    </MDBAlert>
                  ) : (
                    <MDBAlert color="warning">
                      Dein Image wird nicht von uns verwaltet.
                    </MDBAlert>
                  )}
                  <p className="text-muted">
                    <small>
                      Zu Deinem Image zählt Dein Logo, Dein Auftreten auf
                      Plattformen, sämtliche Imagefilme, Deine Glaubwürdigkeit,
                      Fotos, Deine Story und Kontinuität.
                    </small>
                  </p>
                </>
              )}
            </MDBTabPane>
            <MDBTabPane tabId={4}>
              {profile.us && (
                <>
                  {profile.us.presences ? (
                    <MDBAlert color="info">
                      Deine Präsenzen werden von uns verwaltet.
                    </MDBAlert>
                  ) : (
                    <MDBAlert color="warning">
                      Deine Präsenzen werden nicht von uns verwaltet.
                    </MDBAlert>
                  )}
                  {profile.analysis[profile.analysis.length - 1].raw_data
                    .has_gsuite ? (
                    <p className="feature">
                      <MDBIcon icon="check-circle" className="green-text" />
                      Du besitzt Google Business
                    </p>
                  ) : (
                    <p className="feature">
                      <MDBIcon icon="times-circle" className="red-text" />
                      Du besitzt kein Google Business
                    </p>
                  )}
                  {profile.analysis[profile.analysis.length - 1].raw_data
                    .has_facebook ? (
                    <p className="feature">
                      <MDBIcon icon="check-circle" className="green-text" />
                      Du besitzt Facebook
                    </p>
                  ) : (
                    <p className="feature">
                      <MDBIcon icon="times-circle" className="red-text" />
                      Du besitzt kein Facebook
                    </p>
                  )}
                  {profile.analysis[profile.analysis.length - 1].raw_data
                    .has_instagram ? (
                    <p className="feature">
                      <MDBIcon icon="check-circle" className="green-text" />
                      Du besitzt Instagram
                    </p>
                  ) : (
                    <p className="feature">
                      <MDBIcon icon="times-circle" className="red-text" />
                      Du besitzt kein Instagram
                    </p>
                  )}
                </>
              )}
            </MDBTabPane>
          </MDBTabContent>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default Services;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
