//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect } from "react-router-dom";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBDataTable,
  MDBRow,
  MDBCol,
  MDBPopover,
  MDBPopoverHeader,
  MDBPopoverBody,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBBadge,
  MDBIcon,
  MDBFormInline,
  MDBInput,
  MDBAlert,
  MDBSpinner,
  MDBCard,
  MDBCardBody,
  MDBCardUp,
  MDBAvatar,
} from "mdbreact";

//> CSS
//import "./catlist.scss";

class CoachPage extends React.Component {
  state = {};

  render() {
    const { profile } = this.props;
    return (
      <div className="formcat">
        <>
          <MDBRow>
            <MDBCol md="7">
              <MDBCard className="w-100">
                <MDBCardBody>
                  <h2>Actions</h2>
                  <MDBBtn
                    color="indigo"
                    onClick={() => this.props.goTo("formcat")}
                  >
                    <MDBIcon icon="cat" />
                    Add cat
                  </MDBBtn>
                  <MDBBtn
                    outline
                    color="indigo"
                    onClick={() => this.props.goTo("catlist")}
                  >
                    <MDBIcon icon="list" />
                    Cat list
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="3" className="text-center">
              <MDBCard className="w-100" testimonial>
                <MDBCardUp className="indigo lighten-3" />
                <MDBAvatar className="mx-auto white">
                  <img
                    src={
                      "https://www.aichner-christian.com/img/kisy/" +
                      profile.image
                    }
                    alt=""
                  />
                </MDBAvatar>
                <MDBCardBody>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="What are you doing?"
                  />
                  <p className="lead mb-3">0:00</p>
                  <MDBBtn outline color="indigo" className="w-100 mx-0">
                    <MDBIcon far icon="pause-circle" />
                    Pause
                  </MDBBtn>
                  <MDBBtn color="indigo" className="w-100 mx-0">
                    <MDBIcon icon="stopwatch" />
                    Start
                  </MDBBtn>
                  <MDBBtn color="indigo" className="w-100 mx-0">
                    <MDBIcon icon="stop-circle" />
                    Stop
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </>
      </div>
    );
  }
}

export default CoachPage;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
