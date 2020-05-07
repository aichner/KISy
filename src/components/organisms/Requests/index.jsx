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
  assignRequest,
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
import "./request.scss";

class Requests extends React.Component {
  state = { activeTab: 0 };

  componentDidMount = () => {
    this.props.getData();
  };

  componentWillReceiveProps(nextProps) {
    // Check if requests have changed
    if (
      JSON.stringify(this.props.contact) !== JSON.stringify(nextProps.contact)
    ) {
      nextProps.contact &&
        this.setState({ sync: false }, () => this.fillTable(nextProps.contact));
    } else {
      this.setState({ sync: false });
    }
  }

  fillTable = (contact) => {
    console.log(contact);
  };

  render() {
    const { auth, profile, contact } = this.props;

    console.log(this.props);

    return (
      <div id="requests">
        <p className="lead font-weight-bold">Requests</p>
        <MDBRow>
          <MDBCol lg="3">
            <MDBCard>
              <MDBCardBody className="p-0 menu">
                {contact &&
                  contact.data &&
                  contact.data.map((request, i) => {
                    return (
                      <div
                        key={i}
                        className={
                          this.state.activeTab === i ? "active" : undefined
                        }
                        onClick={() => this.setState({ activeTab: i })}
                      >
                        <p className="mb-0">
                          <small className="font-weight-bold">
                            {request.company}
                          </small>
                        </p>
                        <p className="mb-0 mt-0">
                          <small>{request.full_name}</small>
                        </p>
                        {request.processed ? (
                          <MDBBadge color="success">Done</MDBBadge>
                        ) : (
                          <MDBBadge color="danger">Open</MDBBadge>
                        )}
                        <p className="mb-0">
                          <small className="text-muted">
                            <MDBIcon icon="clock" className="mr-1" />
                            {moment(request.timestamp).format(
                              "DD.MM.YYYY HH:MM"
                            )}
                          </small>
                        </p>
                      </div>
                    );
                  })}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="9">
            <MDBCard>
              <MDBCardBody className="request-body">
                {contact && contact.data && (
                  <>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="lead font-weight-bold mb-2">
                          {contact.data[this.state.activeTab].company}
                        </p>
                        <p>
                          <MDBIcon icon="at" className="mr-1" />
                          {contact.data[this.state.activeTab].email}
                          <br />
                          <MDBIcon icon="user" className="mr-1" />
                          {contact.data[this.state.activeTab].full_name}
                        </p>
                      </div>
                      <div>
                        {contact.data[this.state.activeTab].processed ? (
                          <MDBBadge color="success">
                            <MDBIcon icon="check-circle" />
                            Done
                          </MDBBadge>
                        ) : (
                          <MDBBtn
                            color="success"
                            onClick={() =>
                              this.props.markAsDone(
                                contact.data[this.state.activeTab].id
                              )
                            }
                          >
                            <MDBIcon icon="check-circle" />
                            Mark as done
                          </MDBBtn>
                        )}
                      </div>
                    </div>
                    <a
                      href={`mailto:${
                        contact.data[this.state.activeTab].email
                      }`}
                    >
                      <MDBBtn color="indigo" outline>
                        <MDBIcon icon="at" />
                        E-Mail
                      </MDBBtn>
                    </a>
                    <MDBBtn color="indigo">
                      <MDBIcon icon="cat" />
                      Create as cat
                    </MDBBtn>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
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
    getData: () => dispatch(getData("requests")),
    assignRequest: (request) => dispatch(assignRequest(request)),
    markAsDone: (id) => dispatch(markAsDone("requests", id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Requests);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
