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

//> Tabs
const tabs = [
  { name: "Übersicht", color: "blue", icon: "list" },
  { name: "Meine Website", color: "orange", icon: "desktop" },
  {
    name: "Mein Social Media",
    color: "cyan",
    icon: "paint-brush",
  },
  { name: "Mein Image", color: "green", icon: "award" },
  { name: "Meine Präsenzen", color: "deep-purple", icon: "bullhorn" },
  {
    name: "Meine Rechnungen",
    color: "blue",
    icon: "file-invoice-dollar",
  },
];

class Services extends React.Component {
  state = { activeItem: 0 };

  toggleInnerPills = (tab) => (e) => {
    e.preventDefault();

    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
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
              <h5>Panel 1</h5>
            </MDBTabPane>
            <MDBTabPane tabId={1}>
              <h5>Panel 2</h5>
            </MDBTabPane>
            <MDBTabPane tabId={2}>
              <h5>Panel 3</h5>
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
