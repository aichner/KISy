//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Redirect } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import {
  getCats,
  removeCat,
  upgradeCat,
} from "../../../store/actions/authActions";

//> Additional modules
// Copy to clipboard
import copy from "copy-to-clipboard";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBDataTable,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBBadge,
  MDBIcon,
  MDBSpinner,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

//> Components
import { ResultChart } from "../../molecules/charts";

//> CSS
import "./catlist.scss";

class CatList extends React.Component {
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
          label: "Contact",
          field: "contact",
          sort: "disabled",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "disabled",
        },
      ],
      rows: undefined,
    },
  };

  componentDidMount = () => {
    this.props.getCats();
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

  updateCat = (user) => {
    user = {
      ...user,
      password: Math.random().toString(36).slice(-8).toUpperCase(),
    };

    this.props.upgradeCat(user);
    this.props.goTo(0);
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
              <small>
                <small>
                  <strong>{user.company_name}</strong>
                </small>
                <br />
                <small>{user.city}</small>
              </small>
            ),
            contact: (
              <>
                <p className="mb-1 clickable" onClick={() => copy(user.email)}>
                  {user.email} <MDBIcon far icon="copy" />
                </p>
                {user.phone ? <p className="mb-1">{user.phone}</p> : null}
              </>
            ),
            actions: (
              <>
                <MDBBtn
                  color="indigo"
                  className="px-3 m-0 mr-2"
                  size="sm"
                  onClick={() => this.toggle(user)}
                >
                  <MDBIcon icon="chart-area" />
                  Analysis
                </MDBBtn>
                <MDBBtn
                  color="green"
                  className="px-3 m-0 mr-2"
                  size="sm"
                  onClick={() => this.updateCat(user)}
                >
                  <MDBIcon icon="angle-double-up" />
                  Upgrade
                </MDBBtn>
                {!this.state["remove" + user.uid] && (
                  <MDBBtn
                    className="px-3 m-0 float-right"
                    color="danger"
                    outline
                    size="sm"
                    onClick={() =>
                      this.setState({
                        removeCat: { name: user.company_name, uid: user.uid },
                      })
                    }
                  >
                    <MDBIcon icon="trash-alt" size="md" className="mr-0" />
                  </MDBBtn>
                )}
              </>
            ),
          };
        } else {
          return null;
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

  render() {
    const { auth, profile } = this.props;

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
          <div id="catlist">
            <>
              <MDBCard className="w-100">
                <MDBCardBody>
                  <h2 className="d-flex">
                    <MDBBadge color="indigo" className="mr-3">
                      Phase 1
                    </MDBBadge>{" "}
                    Cats
                  </h2>
                  <p className="lead">
                    Phase 1 collects data from companies and creates free
                    analysis for them.
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
              className="text-white"
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
    getCats: () => dispatch(getCats()),
    removeCat: (uid) => dispatch(removeCat(uid)),
    upgradeCat: (user) => dispatch(upgradeCat(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatList);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
