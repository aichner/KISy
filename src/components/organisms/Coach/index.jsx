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
            <MDBBtn 
            color="secondary"
            >
            <MDBIcon icon="euro-sign" />
            Rechnungen
            </MDBBtn>
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
        <MDBRow className="flex-center">
          <MDBCol md="5">
          <MDBCard>
            <MDBCardBody className="text-center">
            <h2 className="font-weight-bold mb-2">Neukunden Akquise</h2>
            <div className="my-3">
            </div>
            <Link to="/me/add">
              <MDBBtn color="agency-red">
              <MDBIcon icon="cat" className="mr-2"/>
              Add cat
              </MDBBtn>
            </Link>
            </MDBCardBody>
          </MDBCard>
          </MDBCol>
          <MDBCol md="7">
          <MDBCard>
            <MDBCardBody>
            Test
            </MDBCardBody>
          </MDBCard>
          </MDBCol>
          <MDBCol md="12" className="mt-5">
          <MDBCard>
            <MDBCardBody>
            Test
            </MDBCardBody>
          </MDBCard>
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
