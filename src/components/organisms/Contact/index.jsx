//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import {
  getData,
  markAsDone,
} from "../../../store/actions/customerContactActions";

//> Additional modules
// Moment
import moment from "moment";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBBadge,
  MDBIcon,
  MDBProgress,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

//> CSS
import "./contact.scss";

class Contact extends React.Component {
  state = { activeTab: 0, show: 0 };

  componentDidMount = () => {
    this.props.getData(false);
  };

  componentWillReceiveProps(nextProps) {
    // Check if requests have changed
    if (
      JSON.stringify(this.props.contact) !== JSON.stringify(nextProps.contact)
    ) {
      nextProps.contact && this.setState({ sync: false });
    } else {
      this.setState({ sync: false });
    }
  }

  render() {
    const { contact } = this.props;

    return (
      <div id="contact">
        <p className="lead font-weight-bold">
          Contact
          <MDBBadge color="indigo" className="ml-2">
            <MDBIcon icon="paper-plane" /> Homepage
          </MDBBadge>
        </p>
        <div className="mb-3">
          <MDBBtn
            color="indigo"
            outline={this.state.show !== 0}
            onClick={() =>
              this.setState({ show: 0, sync: true }, () =>
                this.props.getData(false)
              )
            }
          >
            Show <MDBBadge color="danger">open</MDBBadge>
          </MDBBtn>
          <MDBBtn
            color="indigo"
            outline={this.state.show !== 1}
            onClick={() =>
              this.setState({ show: 1, sync: true }, () =>
                this.props.getData(true)
              )
            }
          >
            Show <MDBBadge color="success">closed</MDBBadge>
          </MDBBtn>
        </div>
        {this.state.sync && (
          <div>
            <MDBProgress material preloader />
          </div>
        )}
        {!this.state.sync &&
        contact &&
        contact.data &&
        contact.data.length > 0 ? (
          <MDBRow>
            <MDBCol lg="3">
              <MDBCard>
                <MDBCardBody className="p-0 menu">
                  {contact &&
                    contact.data &&
                    contact.data.length > 0 &&
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
                              {request.full_name}
                            </small>
                          </p>
                          {request.processed ? (
                            <MDBBadge color="success">Done</MDBBadge>
                          ) : (
                            <MDBBadge color="danger">Open</MDBBadge>
                          )}
                          <p className="mb-0">
                            <small className="text-muted d-block">
                              <MDBIcon icon="clock" className="mr-1" />
                              {moment(request.timestamp).format(
                                "DD.MM.YYYY H:mm"
                              )}
                            </small>
                            {request.processedInfo && (
                              <small className="text-muted d-block">
                                <MDBIcon icon="check-circle" className="mr-1" />
                                {moment(request.processedInfo.timestamp).format(
                                  "DD.MM.YYYY H:mm"
                                )}
                              </small>
                            )}
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
                  {contact && contact.data && contact.data.length > 0 && (
                    <>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="lead font-weight-bold mb-2">
                            {contact.data[this.state.activeTab].full_name}
                          </p>
                          <p>
                            <MDBIcon icon="at" className="mr-1" />
                            {contact.data[this.state.activeTab].email}
                          </p>
                          <p className="mb-0 font-weight-bold">Note</p>
                          <p className="text-muted">
                            {contact.data[this.state.activeTab].note}
                          </p>
                        </div>
                        <div>
                          {contact.data[this.state.activeTab].processed ? (
                            <MDBBadge color="success">
                              <MDBIcon icon="check-circle" />
                              Done
                            </MDBBadge>
                          ) : (
                            <MDBBadge color="danger">
                              <MDBIcon icon="clock" />
                              Open
                            </MDBBadge>
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
                      {!contact.data[this.state.activeTab].processed && (
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
                    </>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ) : (
          <MDBCard>
            <MDBCardBody>
              {!this.state.sync && <p className="mb-0">No new requests</p>}
            </MDBCardBody>
          </MDBCard>
        )}
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
    getData: (processed) => dispatch(getData("contact", processed)),
    markAsDone: (id, processed) =>
      dispatch(markAsDone("contact", id, processed)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
