//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { getGoodBoys } from "../../../store/actions/authActions";

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

//> Components
import { ResultChart } from "../../molecules/charts";

//> CSS
import "./interested.scss";

class InterestedList extends React.Component {
  state = {
    data: {
      columns: [
        {
          label: "Chart",
          field: "chart",
          sort: "disabled",
        },
        {
          label: "Company",
          field: "company",
          sort: "disabled",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "disabled",
        },
        {
          label: "Contact",
          field: "contact",
          sort: "disabled",
        },
        {
          label: "Nutzerdaten",
          field: "access",
          sort: "disabled",
        },
      ],
      rows: undefined,
    },
  };

  componentDidMount = () => {
    this.props.getGoodBoys();
  };

  componentWillReceiveProps(nextProps) {
    // Check if users have changed
    if (JSON.stringify(this.props.users) !== JSON.stringify(nextProps.users)) {
      nextProps.users &&
        this.setState({ sync: false }, () => this.fillTable(nextProps.users));
    } else {
      this.setState({ sync: false });
    }
  }

  toggle = (user) => {
    if (!this.state.modal) {
      this.setState({
        modal: true,
        modalCat: {
          ...user,
        },
      });
    } else {
      this.setState({
        modal: false,
        modalUser: undefined,
      });
    }
  };

  getUserList = (users) => {
    return (
      users &&
      users.map((user, i) => {
        if (!user.disabled) {
          return {
            chart: (
              <div>
                <ResultChart
                  data={user.analysis[user.analysis.length - 1].results}
                  hideLabels
                />
              </div>
            ),
            company: (
              <>
                <p className="mb-0">{user.company_name}</p>
                <small className="text-muted d-block">
                  Last seen:{" "}
                  {moment(user.firstLogin).format("MMMM Do YYYY, h:mm:ss a")}
                </small>
                <div className="mb-2">
                  {parseInt(user.firstLogin) + 8640000 >
                    parseInt(new Date().getTime()) && (
                    <MDBBadge color="green" className="my-2">
                      <MDBIcon icon="clock" className="mr-1" />
                      Logged in recently
                    </MDBBadge>
                  )}
                </div>
                <MDBBtn
                  color="indigo"
                  className="px-3 m-0 mr-2"
                  size="sm"
                  onClick={() => this.toggle(user)}
                >
                  <MDBIcon icon="signature" />
                  Analysis
                </MDBBtn>
                {!user.processed && (
                  <MDBBtn
                    color="green"
                    className="px-3 m-0 mr-2"
                    size="sm"
                    onClick={() => this.markDone(user.uid)}
                  >
                    <MDBIcon icon="check" />
                    Done
                  </MDBBtn>
                )}
              </>
            ),
            actions: (
              <>
                <p className="mb-0 font-weight-bold">Requests</p>
                <div>
                  {Object.keys(user.request).length > 0 ? (
                    <>
                      {Object.keys(user.request).map((key, i) => {
                        return (
                          <span className="d-block" key={i}>
                            <MDBIcon
                              icon="check-circle"
                              className="green-text mr-1"
                            />
                            {key}
                          </span>
                        );
                      })}
                    </>
                  ) : (
                    <small className="text-muted">No actions yet</small>
                  )}
                </div>
              </>
            ),
            contact: (
              <>
                <p className="mb-1 clickable" onClick={() => copy(user.email)}>
                  {user.email} <MDBIcon far icon="copy" />
                </p>
                {user.phone ? <p className="mb-1">{user.phone}</p> : null}
              </>
            ),
            access: (
              <>
                <p className="mb-1">E-Mail: {user.email}</p>
                <p
                  className="mb-0 clickable"
                  onClick={() => copy(user.password)}
                >
                  Password: {user.password} <MDBIcon far icon="copy" />
                </p>
              </>
            ),
          };
        }
      })
    );
  };

  fillTable = (users) => {
    this.setState({
      data: {
        ...this.state.data,
        rows: this.getUserList(users),
      },
    });
  };

  markDone = (uid) => {
    this.props.markDoneZombie(uid);
  };

  render() {
    const { auth, profile, users } = this.props;

    if (!profile.isLoaded) {
      return (
        <MDBContainer className="flex-center my-5 py-5">
          <MDBSpinner />
        </MDBContainer>
      );
    } else {
      // Check if logged in
      if (auth.uid === undefined) return <Redirect to="/" />;
      if (profile && !profile.coach) return <Redirect to="/" />;

      return (
        <>
          <div id="interestedlist">
            <>
              <MDBCard className="w-100">
                <MDBCardBody>
                  <h2 className="d-flex">
                    <MDBBadge color="indigo" className="mr-3">
                      Phase 3
                    </MDBBadge>{" "}
                    Good boys
                  </h2>
                  <p className="lead">
                    Phase 3 tries to transform <code>good boys</code> into{" "}
                    <code>customers</code>.
                  </p>
                  <div className="text-right mb-4">
                    {this.state.removeCat && (
                      <>
                        <MDBBtn
                          className="px-3 m-0"
                          color="danger"
                          onClick={() => {
                            this.props.removeCat(this.state.removeCat.uid);
                            this.setState({ removeCat: undefined });
                          }}
                        >
                          <MDBIcon icon="check" />
                          Remove {this.state.removeCat.name}
                        </MDBBtn>
                        <MDBBtn
                          className="px-3 ml-2"
                          color="elegant"
                          outline
                          onClick={() =>
                            this.setState({ removeCat: undefined })
                          }
                        >
                          Cancel
                        </MDBBtn>
                      </>
                    )}
                  </div>
                  <MDBDataTable
                    striped
                    bordered
                    searching={false}
                    paging={false}
                    exportToCSV
                    entriesOptions={[10, 20, 50, 100]}
                    data={this.state.data}
                  />
                </MDBCardBody>
              </MDBCard>
            </>
          </div>
          {this.state.modal && this.state.modalCat && (
            <MDBModal
              modalStyle="primary"
              className="text-white modal-user"
              size="md"
              backdrop={true}
              isOpen={this.state.modal}
              toggle={this.toggle}
            >
              <MDBModalHeader
                className="text-center"
                titleClass="w-100"
                tag="p"
              >
                {this.state.modalCat.company_name} Analysis Details
              </MDBModalHeader>
              <MDBModalBody className="text-center">
                {this.state.modalCat && (
                  <ResultChart
                    data={
                      this.state.modalCat.analysis[
                        this.state.modalCat.analysis.length - 1
                      ].results
                    }
                  />
                )}
                {this.state.modalCat.analysis && (
                  <div className="text-left">
                    {Object.keys(
                      this.state.modalCat.analysis[
                        this.state.modalCat.analysis.length - 1
                      ].results
                    ).map((key, i) => {
                      if (
                        this.state.modalCat.analysis[
                          this.state.modalCat.analysis.length - 1
                        ].results[key].value < 70
                      ) {
                        return (
                          <>
                            <span>
                              {
                                this.state.modalCat.analysis[
                                  this.state.modalCat.analysis.length - 1
                                ].results[key].name
                              }
                            </span>
                            <MDBProgress
                              value={
                                this.state.modalCat.analysis[
                                  this.state.modalCat.analysis.length - 1
                                ].results[key].value
                              }
                              className="mt-1 mb-2"
                            />
                          </>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                )}
              </MDBModalBody>
              <MDBModalFooter className="justify-content-center">
                <MDBBtn color="elegant" outline onClick={this.toggle}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          )}
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.auth.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGoodBoys: () => dispatch(getGoodBoys()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterestedList);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
