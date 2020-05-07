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
  MDBProgress,
  MDBAvatar,
} from "mdbreact";

//> Images
import defaultImg from "../../../assets/default.jpg";

//> CSS
//import "./catlist.scss";

class CoachPage extends React.Component {
  state = {};

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true });
  };

  render() {
    const { profile } = this.props;
    return (
      <div className="formcat">
        {!this.state.imageLoaded && <MDBProgress material preloader />}
        <>
          <MDBRow>
            <MDBCol md="7">
              <MDBCard className="w-100">
                <MDBCardBody>
                  <h2>Actions</h2>
                  <p className="lead d-inline-block mb-2">Phase 1</p>
                  <div>
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
                  </div>
                  <p className="lead d-inline-block mt-3 mb-2">Phase 2</p>
                  <div>
                    <MDBBtn
                      color="indigo"
                      onClick={() => this.props.goTo("zombielist")}
                    >
                      <MDBIcon icon="list" />
                      Zombie list
                    </MDBBtn>
                  </div>
                  <p className="lead d-inline-block mt-3 mb-2">Phase 3</p>
                  <div>
                    <MDBBtn
                      color="indigo"
                      onClick={() => this.props.goTo("interestedList")}
                    >
                      <MDBIcon icon="dog" />
                      Good boy list
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="3" className="text-center">
              <MDBCard className="w-100" testimonial>
                <MDBCardUp className="indigo lighten-3" />
                <MDBAvatar className="mx-auto white">
                  {!this.state.imageLoaded && (
                    <img src={defaultImg} alt="Profile image is loading" />
                  )}
                  <img
                    src={profile.image}
                    alt={profile.first_name}
                    onLoad={this.handleImageLoaded.bind(this)}
                  />
                </MDBAvatar>
                {this.state.imageLoaded && (
                  <MDBCardBody>
                    <MDBBtn
                      color="indigo"
                      className="w-100 mx-0"
                      onClick={() => this.props.goTo("requests")}
                    >
                      <MDBIcon icon="fire-alt" />
                      Anfragen
                      {false && (
                        <MDBBadge color="danger" className="z-depth-0 ml-1">
                          2
                        </MDBBadge>
                      )}
                    </MDBBtn>
                    <MDBBtn
                      color="indigo"
                      className="w-100 mx-0"
                      outline
                      onClick={() => this.props.goTo("contact")}
                    >
                      <MDBIcon icon="at" />
                      Kontakt
                      {false && (
                        <MDBBadge color="danger" className="z-depth-0 ml-1">
                          2
                        </MDBBadge>
                      )}
                    </MDBBtn>
                  </MDBCardBody>
                )}
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
