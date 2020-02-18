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
import { ReactComponent as MorningImg } from  '../../../assets/icons/morning.svg';
import { ReactComponent as DayImg } from  '../../../assets/icons/day.svg';
import { ReactComponent as NightImg } from  '../../../assets/icons/night.svg';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // Load welcoming picture
    this.getGreetingImg();
  }

  getGreetingTxt = () => {
    // Get date
    let today = new Date()
    // Get current hours
    let curHr = today.getHours()

    // Store selected greeting
    let selected = null;

    if (curHr < 11) {
      selected = <span>Guten Morgen</span>;
    } else if (curHr < 18) {
      selected = <span>Willkommen zurück</span>;
    } else {
      selected = <span>Guten Abend</span>;
    }

    return selected;
  }

  getGreetingImg = () => {
    // Get date
    let today = new Date()
    // Get current hours
    let curHr = today.getHours()

    if (curHr < 11) {
      this.setState({greetingImage: <MorningImg className="img-fluid" />});
    } else if (curHr < 18) {
      this.setState({greetingImage: <DayImg className="img-fluid" />});
    } else {
      this.setState({greetingImage: <NightImg className="img-fluid" />});
    }
  }

  render() {
    const { auth, profile } = this.props;

    if(auth.uid === undefined) return <Redirect to="/"/> 

    return (
      <div id="profile">
        <div className="greeting py-5 text-center">
            {this.state.greetingImage}
            <h2 className="text-center font-weight-bold">
            {this.getGreetingTxt()}, <span>{profile.first_name}</span>!
            </h2>
        </div>
        <MDBContainer className="pt-5 mt-5">
          <MDBRow className="flex-center">
            <MDBCol md="4">
              <MDBCard>
                <MDBCardBody>
                  Test
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="8">
              <MDBCard>
                <MDBCardBody>
                  Test
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12">
              <MDBCard>
                <MDBCardBody>
                  Test
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
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
