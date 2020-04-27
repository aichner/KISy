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

  componentWillReceiveProps(nextProps) {
    // Check if cats have changed
    if (JSON.stringify(this.props.cats) !== JSON.stringify(nextProps.cats)) {
      nextProps.cats &&
        this.setState({ sync: false }, () => this.fillTable(nextProps.cats));
    } else {
      this.setState({ sync: false });
    }
  }

  toggle = (cat) => {
    if (!this.state.modal) {
      this.setState({
        modal: true,
        modalCat: {
          ...cat,
        },
      });
    } else {
      this.setState({
        modal: false,
        modalUser: undefined,
      });
    }
  };

  updateCat = (cat) => {
    cat = {
      ...cat,
      password: Math.random().toString(36).slice(-8),
    };

    this.props.upgradeCat(cat);
    this.props.goTo(0);
  };

  getUserList = (cats) => {
    return (
      cats &&
      cats.map((cat, i) => {
        if (!cat.disabled) {
          return {
            chart: (
              <div>
                <ResultChart
                  data={cat.analysis[cat.analysis.length - 1].results}
                  hideLabels
                />
              </div>
            ),
            company: (
              <small>
                <small>
                  <strong>{cat.company_name}</strong>
                </small>
                <br />
                <small>{cat.city}</small>
              </small>
            ),
            contact: (
              <>
                <p className="mb-1 clickable" onClick={() => copy(cat.email)}>
                  {cat.email} <MDBIcon far icon="copy" />
                </p>
                {cat.phone ? <p className="mb-1">{cat.phone}</p> : null}
              </>
            ),
            actions: (
              <>
                <MDBBtn
                  color="indigo"
                  className="px-3 m-0 mr-2"
                  size="sm"
                  onClick={() => this.toggle(cat)}
                >
                  <MDBIcon icon="chart-area" />
                  Analysis
                </MDBBtn>
                <MDBBtn
                  color="green"
                  className="px-3 m-0 mr-2"
                  size="sm"
                  onClick={() => this.updateCat(cat)}
                >
                  <MDBIcon icon="angle-double-up" />
                  Upgrade
                </MDBBtn>
                {!this.state["remove" + cat.uid] && (
                  <MDBBtn
                    className="px-3 m-0 float-right"
                    color="danger"
                    outline
                    size="sm"
                    onClick={() =>
                      this.setState({
                        removeCat: { name: cat.company_name, uid: cat.uid },
                      })
                    }
                  >
                    <MDBIcon icon="trash-alt" size="md" className="mr-0" />
                  </MDBBtn>
                )}
              </>
            ),
          };
        }
      })
    );
  };

  fillTable = (cats) => {
    this.setState({
      data: {
        ...this.state.data,
        rows: this.getUserList(cats),
      },
    });
  };

  render() {
    const { auth, profile, cats } = this.props;
    console.log(this.state);

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

      // Get firebase cats
      if (!this.props.cats) {
        this.props.getCats();
      } else {
        if (!this.state.data.rows) {
          this.fillTable(this.props.cats);
        }
      }

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
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    cats: state.auth.cats,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCats: () => dispatch(getCats()),
    removeCat: (uid) => dispatch(removeCat(uid)),
    upgradeCat: (cat) => dispatch(upgradeCat(cat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatList);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
