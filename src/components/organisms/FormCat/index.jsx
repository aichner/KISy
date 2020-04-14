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

//> Form
const analysis = {
  web: [
    {
      name: "web_responsive",
      label: "Responsiveness",
      info:
        "Is the website responsive? How well does the responsive version work?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_design",
      label: "Design",
      info:
        "Check for a new, modern design. No strange colors, comic sans or similar. Clean colors, which remain consistent throughout the whole website. Menu is intuitive and well structured. Links to social media are embedded.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_wording",
      label: "Wording",
      info:
        "No spelling errors. Short and concise. Texts seem professional and not sloppy. Crucial Information is present: address, contact information, open hours.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_picture_quality",
      label: "Picture Quality",
      info:
        "Check if the images are fitting and look professional. They should express what they are supposed to do.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_analysis",
      label: "Analysis",
      info:
        "Check if Google Analytics or Facebook Pixel is integrated. (Check Network Tab in Development tools)",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_legal",
      label: "Legal",
      info: "Check if the required legal pages (about, privacy, ...) exist.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_contact",
      label: "Contact Details",
      info:
        "How easy is it to contact the company? Is there a maps integration (if needed), phone, email, address, ...",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "web_performance",
      label: "Performance in ms",
      info:
        "Measure the performance using the Performance Tab in Development tools.",
      min: 0,
      max: 5000,
      default: 1000,
    },
  ],
  facebook: [
    {
      name: "facebook_likes",
      label: "Page Likes",
      info:
        "Does the number of page likes represent the average of other companies in the same sector?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "facebook_branding",
      label: "Page Branding",
      info: "Logo implementation, banner, post design, consistency.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "facebook_regularity",
      label: "Post Regularity",
      info: "How often and how regular does the company post on Facebook?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "facebook_contact",
      label: "Contact",
      info:
        "How easy is it to contact the company? Does the company actually encourage action?",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  instagram: [
    {
      name: "instagram_picture_quality",
      label: "Picture Quality",
      info:
        "Uploaded Pictures look professional. If info graphics or so are posted, their design is consistent throughout the account. Stories are not just shaky videos. If products are sold, the posts should display them properly. ",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "instagram_caption",
      label: "Caption quality",
      info:
        "There are captions, first of all. The captions fit the corresponding picture and are free of spelling errors. Correct and sufficient use of hashtags (important!).",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "instagram_regularity",
      label: "Post regularity",
      info:
        "How often and how regular does the company post new images and/or stories?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "instagram_followers",
      label: "Follower Tier",
      info:
        "How many followers does the account have? Does it map to the average like on images? 1000 followers = 50 points, 10000 followers = 100 points",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  corporate: [
    {
      name: "corporate_logo",
      label: "Logo Quality",
      info:
        "The logo should look modern or have weight and history to it. The logo must represent the company and has to be fitting to the sector. Resolution is also to be considered. ",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "corporate_consistency",
      label: "Consistency",
      info: "The Corporate Identity should be consistent across all platforms.",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  image: [
    {
      name: "image_film",
      label: "Image films",
      info:
        "Does the company has any image films? Are they good? Is the information clear and the video short and interesting?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "image_portfolio",
      label: "Portfolio",
      info:
        "Does the company has a portfolio. This can consist of videos, photos, finished work, list of partner, ...",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
  seo: [
    {
      name: "seo_traceability",
      label: "Traceability",
      info: "How easy is it to find the company on Google Search?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "seo_code",
      label: "Code Quality",
      info: "How is the code quality? This does affect the listing position.",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "seo_meta",
      label: "Meta Tags",
      info:
        "Meta tags are existent and fitting? Are there opengraph tags for Facebook?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "seo_https",
      label: "SSL Certificate",
      info:
        "Does the website have a https:// connection? How secure does the website look?",
      min: 0,
      max: 100,
      default: 50,
    },
    {
      name: "seo_domain",
      label: "Domain",
      info: "How fitting is the domain? Is there a better one?",
      min: 0,
      max: 100,
      default: 50,
    },
  ],
};

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
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      zip: this.state.zip,
      sector: this.state.sector,
      has_website: this.state.has_website,
      has_facebook: this.state.has_facebook,
      has_instagram: this.state.has_instagram,
      has_gsuite: this.state.has_gsuite,
    };
    // Web
    const web = {
      web_responsive: this.state.web_responsive
        ? this.state.web_responsive
        : 50,
      web_design: this.state.web_design ? this.state.web_design : 50,
      web_analysis: this.state.web_analysis ? this.state.web_analysis : 50,
      web_contact: this.state.web_contact ? this.state.web_contact : 50,
      web_legal: this.state.web_legal ? this.state.web_legal : 50,
      web_picture_quality: this.state.web_picture_quality
        ? this.state.web_picture_quality
        : 50,
      web_wording: this.state.web_wording ? this.state.web_wording : 50,
    };
    // Get web average
    const web_avg =
      this.getSum(web) / (analysis.web.length - 1) -
      (this.state.web_performance > 2000
        ? this.state.web_performance / 200
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
      gsuite: basic.has_gsuite ? 100 : 0,
      presence:
        (basic.has_website ? 25 : 0) +
        (basic.has_facebook ? 25 : 0) +
        (basic.has_instagram ? 25 : 0) +
        (basic.has_gsuite ? 25 : 0),
      web: basic.has_website ? web_avg : 0,
      facebook: basic.has_facebook ? facebook_avg : 0,
      instagram: basic.has_instagram ? instagram_avg : 0,
      corporate: corporate_avg,
      image: image_avg,
      seo: basic.has_website ? seo_avg : 0,
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
            ...this.state
          }
        },
      ],
    };

    console.log(userobject);
  };

  render() {
    const { auth, profile } = this.props;
    return (
      <div className="formcat">
        <h2>Add cat</h2>
        <MDBRow>
          <MDBCol md="12">
            <p className="lead">Basic information</p>
          </MDBCol>
          <MDBCol md="6">
            <input
              type="text"
              className="form-control"
              name="company_name"
              placeholder="Company"
              value={this.state.company}
              onClick={(e) =>
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
              onClick={(e) =>
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
              onClick={(e) =>
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
              onClick={(e) =>
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
              onClick={(e) =>
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
              onClick={(e) =>
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
              onClick={(e) =>
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
              onClick={(e) =>
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
                You told yourself, that the company does not have a website.
              </p>
            )}
          </MDBCol>
          {this.state.has_website &&
            analysis.web.map((item, i) => {
              return (
                <MDBCol md="12">
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
                You told yourself, that the company does not have a Facebook
                page.
              </p>
            )}
          </MDBCol>
          {this.state.has_facebook &&
            analysis.facebook.map((item, i) => {
              return (
                <MDBCol md="12">
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
                You told yourself, that the company does not have a Instagram
                account.
              </p>
            )}
          </MDBCol>
          {this.state.has_instagram &&
            analysis.instagram.map((item, i) => {
              return (
                <MDBCol md="12">
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
              <MDBCol md="12">
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
                    getValue={(value) => this.setState({ [item.name]: value })}
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
              <MDBCol md="12">
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
                    getValue={(value) => this.setState({ [item.name]: value })}
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
                You told yourself, that the company does not have a website.
              </p>
            )}
          </MDBCol>
          {this.state.has_website &&
            analysis.seo.map((item, i) => {
              return (
                <MDBCol md="12">
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
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
 * Copyright © 2019 Christian Aichner
 */
