//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect } from "react-router-dom";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardUp,
  MDBAvatar,
  MDBAlert,
  MDBBtn,
  MDBBadge,
  MDBInput,
  MDBIcon,
  MDBTooltip,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBProgress,
} from "mdbreact";

class Coach extends React.Component{
  render(){
    const { auth, profile } = this.props;
    console.log("Coach",this.props);
    return(
      <>
        <div className="py-4 greeting-actions">
        <MDBContainer>
          <MDBRow className="flex-center text-center">
          <MDBCol md="6">
            <p className="lead">
            <MDBIcon icon="bolt" className="pr-2 orange-text"/>
            Quick actions
            </p>
          </MDBCol>
          <MDBCol md="6">
            <Link to="/me">
              <MDBBtn
              color="blue"
              >
              <MDBIcon icon="list" />
              Dashboard
              </MDBBtn>
            </Link>
            <MDBBtn 
            color="primary"
            >
            <MDBIcon icon="cogs" />
            Einstellungen
            </MDBBtn>
          </MDBCol>
          </MDBRow>
        </MDBContainer>
        </div>
        <MDBContainer className="pt-5 mt-5">
          <h2>Add cat</h2>
          <MDBRow className="flex-center">
            <MDBCol md="6">
              <input 
              type="text"
              className="form-control"
              name="company_name"
              placeholder="Company name"
              />
            </MDBCol>
            <MDBCol md="6">
              <input 
              type="text"
              className="form-control"
              name="company_leader"
              placeholder="Company leader"
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default Coach;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Christian Aichner
 */
