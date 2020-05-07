//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import {
  getData,
  markAsDone,
} from "../../../store/actions/customerContactActions";

//> Additional modules
// Copy to clipboard
import copy from "copy-to-clipboard";
// Moment
import moment from "moment";

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
  MDBProgress,
  MDBFormInline,
  MDBInput,
  MDBAlert,
  MDBSpinner,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

//> CSS
// To be added

class Contact extends React.Component {
  state = {};

  componentDidMount = () => {
    this.props.getData();
  };

  componentWillReceiveProps(nextProps) {
    // Check if requests have changed
    if (
      JSON.stringify(this.props.requests) !== JSON.stringify(nextProps.requests)
    ) {
      nextProps.requests &&
        this.setState({ sync: false }, () =>
          this.fillTable(nextProps.requests)
        );
    } else {
      this.setState({ sync: false });
    }
  }

  fillTable = (requests) => {};

  render() {
    const { auth, profile, requests } = this.props;

    return (
      <div className="requests">
        <p className="lead font-weight-bold">Yes</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    contact: state.contact,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(getData("contact")),
    markAsDone: (id) => dispatch(markAsDone("contact",id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
