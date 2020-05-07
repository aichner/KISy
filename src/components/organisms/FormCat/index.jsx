//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { createCat } from "../../../store/actions/authActions";

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
  MDBRangeInput,
} from "mdbreact";

//> CSS
import "./formcat.scss";

//> Components
import { ResultChart } from "../../molecules/charts";

//> Form
import analysis from "./forms.js";

class FormCat extends React.Component {
  state = {};

  getSum = (obj) => {
    let sum = 0;
    for (let el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  };

  createCat = () => {
    const basic = {
      company_name: this.state.company_name,
      full_name: this.state.full_name,
      email: this.state.email ? this.state.email : null,
      phone: this.state.phone ? this.state.phone : null,
      address: this.state.address,
      city: this.state.city,
      zip: this.state.zip,
      sector: this.state.sector ? this.state.sector : null,
      has_website: this.state.has_website ? true : false,
      has_facebook: this.state.has_facebook ? true : false,
      has_instagram: this.state.has_instagram ? true : false,
      has_gsuite: this.state.has_gsuite ? true : false,
    };
    if (
      !basic.company_name ||
      !basic.full_name ||
      !basic.address ||
      !basic.zip ||
      !basic.city
    ) {
      // Need to fill out missing info
      this.setState(
        {
          error: 1,
        },
        () => window.scrollTo(0, 0)
      );
    } else {
      // Web
      const web = {
        web_responsive: this.state.web_responsive
          ? this.state.web_responsive / 2
          : 50,
        web_design: this.state.web_design ? this.state.web_design * 2 : 50,
        web_analysis: this.state.web_analysis
          ? this.state.web_analysis / 2
          : 50,
        web_contact: this.state.web_contact ? this.state.web_contact / 2 : 50,
        web_legal: this.state.web_legal ? this.state.web_legal / 2 : 50,
        web_picture_quality:
          this.state.web_picture_quality / 2
            ? this.state.web_picture_quality
            : 50,
        web_wording: this.state.web_wording ? this.state.web_wording / 2 : 50,
      };
      // Get web average
      const web_avg =
        this.getSum(web) / (analysis.web.length - 1) -
        (this.state.web_performance > 2000
          ? this.state.web_performance / 500
          : 0);
      // Facebook
      const facebook = {
        facebook_branding: this.state.facebook_branding
          ? this.state.facebook_branding
          : 50,
        facebook_contact: this.state.facebook_contact
          ? this.state.facebook_contact
          : 50,
        facebook_likes: this.state.facebook_likes
          ? this.state.facebook_likes
          : 50,
        facebook_regularity: this.state.facebook_regularity
          ? this.state.facebook_regularity
          : 50,
      };
      // Get Facebook average
      const facebook_avg = this.getSum(facebook) / analysis.facebook.length;
      // Instagram
      const instagram = {
        instagram_caption: this.state.instagram_caption
          ? this.state.instagram_caption
          : 50,
        instagram_followers: this.state.instagram_followers
          ? this.state.instagram_followers
          : 50,
        instagram_picture_quality: this.state.instagram_picture_quality
          ? this.state.instagram_picture_quality
          : 50,
        instagram_regularity: this.state.instagram_regularity
          ? this.state.instagram_regularity
          : 50,
      };
      // Get Instagram average
      const instagram_avg = this.getSum(instagram) / analysis.instagram.length;
      // Corporate Identity
      const corporate = {
        corporate_consistency: this.state.corporate_consistency
          ? this.state.corporate_consistency
          : 50,
        corporate_logo: this.state.corporate_logo
          ? this.state.corporate_logo
          : 50,
      };
      // Get Corporate Identity average
      const corporate_avg = this.getSum(corporate) / analysis.corporate.length;
      // Image
      const image = {
        image_portfolio: this.state.image_portfolio
          ? this.state.image_portfolio
          : 50,
        image_film: this.state.image_film ? this.state.image_film : 50,
      };
      // Get Image average
      const image_avg = this.getSum(image) / analysis.image.length;
      // SEO
      const seo = {
        seo_code: this.state.seo_code ? this.state.seo_code : 50,
        seo_domain: this.state.seo_domain ? this.state.seo_domain : 50,
        seo_https: this.state.seo_https ? this.state.seo_https : 50,
        seo_meta: this.state.seo_meta ? this.state.seo_meta : 50,
        seo_traceability: this.state.seo_traceability
          ? this.state.seo_traceability
          : 50,
      };
      // Get SEO average
      const seo_avg = this.getSum(seo) / analysis.seo.length;

      // All averages
      const averages = {
        gsuite: { name: "Google Business", value: basic.has_gsuite ? 100 : 0 },
        presence: {
          name: "Präsenz",
          value:
            (basic.has_website ? 25 : 0) +
            (basic.has_facebook ? 25 : 0) +
            (basic.has_instagram ? 25 : 0) +
            (basic.has_gsuite ? 25 : 0),
        },
        web: { name: "Website", value: basic.has_website ? web_avg : 0 },
        facebook: {
          name: "Facebook",
          value: basic.has_facebook ? facebook_avg : 0,
        },
        instagram: {
          name: "Instagram",
          value: basic.has_instagram ? instagram_avg : 0,
        },
        corporate: { name: "Erscheinungsbild", value: corporate_avg },
        image: { name: "Firmenimage", value: image_avg },
        seo: { name: "SEO", value: basic.has_website ? seo_avg : 0 },
      };

      const userobject = {
        ...basic,
        analysis: [
          {
            timestamp: new Date().getTime(),
            createdBy: {
              uid: this.props.auth.uid,
              first_name: this.props.profile.first_name,
              last_name: this.props.profile.last_name,
            },
            total: this.getSum(averages) ? this.getSum(averages) / 7 : 0,
            results: {
              ...averages,
            },
            raw_data: {
              ...this.state,
            },
          },
        ],
      };

      this.props.createCat(userobject);
    }
  };

  render() {
    const { auth, profile, catDetails } = this.props;
    return (
      <div className="formcat">
        {catDetails ? (
          <>
            <MDBRow className="justify-content-center">
              <MDBCol md="7">
                <MDBCard className="w-100">
                  <MDBCardBody>
                    <ResultChart data={catDetails.analysis[0].results} />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </>
        ) : (
          <>
            <MDBRow className="justify-content-center">
              <MDBCol md="7">
                <MDBCard className="w-100">
                  <MDBCardBody>
                    <h2>Add cat</h2>
                    <MDBRow>
                      <MDBCol md="12">
                        <p className="lead">Basic information</p>
                        {this.state.error === 1 && (
                          <MDBAlert color="danger">
                            Please fill in all required details.
                          </MDBAlert>
                        )}
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          type="text"
                          className="form-control"
                          name="company_name"
                          placeholder="Company"
                          value={this.state.company}
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.value })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          type="text"
                          className="form-control"
                          name="full_name"
                          placeholder="Full name"
                          value={this.state.full_name}
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.value })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="E-Mail"
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.value })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Phone"
                          value={this.state.phone}
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.value })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="5">
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="Address"
                          value={this.state.address}
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.value })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="4">
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          placeholder="City"
                          value={this.state.city}
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.value })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="3">
                        <input
                          type="text"
                          className="form-control"
                          name="zip"
                          placeholder="ZIP Code"
                          value={this.state.zip}
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.value })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <input
                          type="text"
                          className="form-control"
                          name="sector"
                          placeholder="Sector"
                          value={this.state.sector}
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.value })
                          }
                        />
                      </MDBCol>
                      <MDBCol md="12">
                        <hr />
                        <p className="lead">Analysis Basic Info</p>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Has Website"
                          filled
                          type="checkbox"
                          name="has_website"
                          id="has_website"
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.checked })
                          }
                          checked={this.state.has_website}
                        />
                        <MDBInput
                          label="Has Facebook"
                          filled
                          type="checkbox"
                          name="has_facebook"
                          id="has_facebook"
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.checked })
                          }
                          checked={this.state.has_facebook}
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Has Instagram"
                          filled
                          type="checkbox"
                          name="has_instagram"
                          id="has_instagram"
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.checked })
                          }
                          checked={this.state.has_instagram}
                        />
                        <MDBInput
                          label="Has Google Business"
                          filled
                          type="checkbox"
                          name="has_gsuite"
                          id="has_gsuite"
                          onChange={(e) =>
                            this.setState({ [e.target.name]: e.target.checked })
                          }
                          checked={this.state.has_gsuite}
                        />
                      </MDBCol>
                      <MDBCol md="12">
                        <hr />
                        <p className="lead">Website</p>
                        {!this.state.has_website && (
                          <p>
                            You told yourself, that the company does not have a
                            website.
                          </p>
                        )}
                      </MDBCol>
                      {this.state.has_website &&
                        analysis.web.map((item, i) => {
                          return (
                            <MDBCol md="12" key={i}>
                              <p className="mb-0">
                                {item.label}
                                <small className="blue-text ml-2">
                                  {this.state[item.name] !== undefined
                                    ? this.state[item.name]
                                    : 50}
                                </small>
                              </p>
                              <small className="text-muted">{item.info}</small>
                              <MDBRow className="my-4" center>
                                <MDBIcon
                                  far
                                  className="font-weight-bold blue-text mr-2 mt-1"
                                  icon="thumbs-down"
                                />
                                <MDBRangeInput
                                  min={item.min}
                                  max={item.max}
                                  value={
                                    this.state[item.name] !== undefined
                                      ? this.state[item.name]
                                      : item.default
                                  }
                                  getValue={(value) =>
                                    this.setState({ [item.name]: value })
                                  }
                                  formClassName={
                                    this.state[item.name] !== undefined
                                      ? "w-75 activated"
                                      : "w-75"
                                  }
                                />
                                <MDBIcon
                                  far
                                  className="font-weight-bold blue-text ml-2 mt-1"
                                  icon="thumbs-up"
                                />
                              </MDBRow>
                            </MDBCol>
                          );
                        })}
                      <MDBCol md="12">
                        <hr />
                        <p className="lead">Facebook</p>
                        {!this.state.has_facebook && (
                          <p>
                            You told yourself, that the company does not have a
                            Facebook page.
                          </p>
                        )}
                      </MDBCol>
                      {this.state.has_facebook &&
                        analysis.facebook.map((item, i) => {
                          return (
                            <MDBCol md="12" key={i}>
                              <p className="mb-0">
                                {item.label}
                                <small className="blue-text ml-2">
                                  {this.state[item.name] !== undefined
                                    ? this.state[item.name]
                                    : 50}
                                </small>
                              </p>
                              <small className="text-muted">{item.info}</small>
                              <MDBRow className="my-4" center>
                                <MDBIcon
                                  far
                                  className="font-weight-bold blue-text mr-2 mt-1"
                                  icon="thumbs-down"
                                />
                                <MDBRangeInput
                                  min={item.min}
                                  max={item.max}
                                  value={
                                    this.state[item.name] !== undefined
                                      ? this.state[item.name]
                                      : item.default
                                  }
                                  getValue={(value) =>
                                    this.setState({ [item.name]: value })
                                  }
                                  formClassName={
                                    this.state[item.name] !== undefined
                                      ? "w-75 activated"
                                      : "w-75"
                                  }
                                />
                                <MDBIcon
                                  far
                                  className="font-weight-bold blue-text ml-2 mt-1"
                                  icon="thumbs-up"
                                />
                              </MDBRow>
                            </MDBCol>
                          );
                        })}
                      <MDBCol md="12">
                        <hr />
                        <p className="lead">Instagram</p>
                        {!this.state.has_instagram && (
                          <p>
                            You told yourself, that the company does not have a
                            Instagram account.
                          </p>
                        )}
                      </MDBCol>
                      {this.state.has_instagram &&
                        analysis.instagram.map((item, i) => {
                          return (
                            <MDBCol md="12" key={i}>
                              <p className="mb-0">
                                {item.label}
                                <small className="blue-text ml-2">
                                  {this.state[item.name] !== undefined
                                    ? this.state[item.name]
                                    : 50}
                                </small>
                              </p>
                              <small className="text-muted">{item.info}</small>
                              <MDBRow className="my-4" center>
                                <MDBIcon
                                  far
                                  className="font-weight-bold blue-text mr-2 mt-1"
                                  icon="thumbs-down"
                                />
                                <MDBRangeInput
                                  min={item.min}
                                  max={item.max}
                                  value={
                                    this.state[item.name] !== undefined
                                      ? this.state[item.name]
                                      : item.default
                                  }
                                  getValue={(value) =>
                                    this.setState({ [item.name]: value })
                                  }
                                  formClassName={
                                    this.state[item.name] !== undefined
                                      ? "w-75 activated"
                                      : "w-75"
                                  }
                                />
                                <MDBIcon
                                  far
                                  className="font-weight-bold blue-text ml-2 mt-1"
                                  icon="thumbs-up"
                                />
                              </MDBRow>
                            </MDBCol>
                          );
                        })}
                      <MDBCol md="12">
                        <hr />
                        <p className="lead">Corporate Identity</p>
                      </MDBCol>
                      {analysis.corporate.map((item, i) => {
                        return (
                          <MDBCol md="12" key={i}>
                            <p className="mb-0">
                              {item.label}
                              <small className="blue-text ml-2">
                                {this.state[item.name] !== undefined
                                  ? this.state[item.name]
                                  : 50}
                              </small>
                            </p>
                            <small className="text-muted">{item.info}</small>
                            <MDBRow className="my-4" center>
                              <MDBIcon
                                far
                                className="font-weight-bold blue-text mr-2 mt-1"
                                icon="thumbs-down"
                              />
                              <MDBRangeInput
                                min={item.min}
                                max={item.max}
                                value={
                                  this.state[item.name] !== undefined
                                    ? this.state[item.name]
                                    : item.default
                                }
                                getValue={(value) =>
                                  this.setState({ [item.name]: value })
                                }
                                formClassName={
                                  this.state[item.name] !== undefined
                                    ? "w-75 activated"
                                    : "w-75"
                                }
                              />
                              <MDBIcon
                                far
                                className="font-weight-bold blue-text ml-2 mt-1"
                                icon="thumbs-up"
                              />
                            </MDBRow>
                          </MDBCol>
                        );
                      })}
                      <MDBCol md="12">
                        <hr />
                        <p className="lead">Image</p>
                      </MDBCol>
                      {analysis.image.map((item, i) => {
                        return (
                          <MDBCol md="12" key={i}>
                            <p className="mb-0">
                              {item.label}
                              <small className="blue-text ml-2">
                                {this.state[item.name] !== undefined
                                  ? this.state[item.name]
                                  : 50}
                              </small>
                            </p>
                            <small className="text-muted">{item.info}</small>
                            <MDBRow className="my-4" center>
                              <MDBIcon
                                far
                                className="font-weight-bold blue-text mr-2 mt-1"
                                icon="thumbs-down"
                              />
                              <MDBRangeInput
                                min={item.min}
                                max={item.max}
                                value={
                                  this.state[item.name] !== undefined
                                    ? this.state[item.name]
                                    : item.default
                                }
                                getValue={(value) =>
                                  this.setState({ [item.name]: value })
                                }
                                formClassName={
                                  this.state[item.name] !== undefined
                                    ? "w-75 activated"
                                    : "w-75"
                                }
                              />
                              <MDBIcon
                                far
                                className="font-weight-bold blue-text ml-2 mt-1"
                                icon="thumbs-up"
                              />
                            </MDBRow>
                          </MDBCol>
                        );
                      })}
                      <MDBCol md="12">
                        <hr />
                        <p className="lead">SEO</p>
                        {!this.state.has_website && (
                          <p>
                            You told yourself, that the company does not have a
                            website.
                          </p>
                        )}
                      </MDBCol>
                      {this.state.has_website &&
                        analysis.seo.map((item, i) => {
                          return (
                            <MDBCol md="12" key={i}>
                              <p className="mb-0">
                                {item.label}
                                <small className="blue-text ml-2">
                                  {this.state[item.name] !== undefined
                                    ? this.state[item.name]
                                    : 50}
                                </small>
                              </p>
                              <small className="text-muted">{item.info}</small>
                              <MDBRow className="my-4" center>
                                <MDBIcon
                                  far
                                  className="font-weight-bold blue-text mr-2 mt-1"
                                  icon="thumbs-down"
                                />
                                <MDBRangeInput
                                  min={item.min}
                                  max={item.max}
                                  value={
                                    this.state[item.name] !== undefined
                                      ? this.state[item.name]
                                      : item.default
                                  }
                                  getValue={(value) =>
                                    this.setState({ [item.name]: value })
                                  }
                                  formClassName={
                                    this.state[item.name] !== undefined
                                      ? "w-75 activated"
                                      : "w-75"
                                  }
                                />
                                <MDBIcon
                                  far
                                  className="font-weight-bold blue-text ml-2 mt-1"
                                  icon="thumbs-up"
                                />
                              </MDBRow>
                            </MDBCol>
                          );
                        })}
                      <MDBCol md="12" className="text-center">
                        <MDBBtn color="indigo" onClick={() => this.createCat()}>
                          <MDBIcon icon="cat" />
                          Create cat
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="3" className="text-center">
                <MDBCard className="w-100">
                  <MDBCardBody>
                    <p className="mb-1 text-muted">
                      <small>{this.state.company_name}</small>
                    </p>
                    <p className="text-muted">{this.state.full_name}</p>
                    <div>
                      <MDBBadge color="indigo">{this.state.sector}</MDBBadge>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    catDetails: state.auth.catDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCat: (newUser) => dispatch(createCat(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCat);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
