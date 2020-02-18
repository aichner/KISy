//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect } from "react-router-dom";

//> Additional modules
// Fade In Animation
import FadeIn from "react-fade-in";
// Country list
import countryList from "react-select-country-list";
// Fetching
import axios from "axios";
// Firebase
import firebase from "firebase";
// Uploading images
import FileUploader from "react-firebase-file-uploader";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { signOut } from "../../../store/actions/authActions";
import { 
  createPost,
  removePost,
  editPost,
  loadPosts,
  loadAllPosts,
  reportPost,
} from "../../../store/actions/postActions";

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

//> CSS
// Profile page
import "./profilepage.scss";

//> Images
// To be added

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {

  }

  render() {
    const { auth, profile } = this.props;

    if(auth.uid === undefined) return <Redirect to="/"/> 

    return (
      <MDBContainer id="profile" className="pt-5 mt-5">
        <p>Logged in</p>
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Christian Aichner
 */
