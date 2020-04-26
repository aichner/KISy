//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link } from "react-router-dom";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBFooter, MDBRow, MDBCol, MDBContainer, MDBIcon } from "mdbreact";

//> Footer
import "./footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <MDBFooter color="primary-color" className="font-small pt-4">
        <MDBContainer className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="3">
              <h5 className="title">Top Services</h5>
              <ul>
                <a
                  href="https://www.aichner-christian.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="list-unstyled">
                    Homepage
                    <MDBIcon
                      icon="external-link-alt"
                      className="ml-1"
                      size="sm"
                    />
                  </li>
                </a>
                <Link to="/company">
                  <li className="list-unstyled">Unternehmensdaten</li>
                </Link>
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">Useful links</h5>
              <ul>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="list-unstyled">
                    Google
                    <MDBIcon
                      icon="external-link-alt"
                      className="ml-1"
                      size="sm"
                    />
                  </li>
                </a>
                <a
                  href="https://www.finanz.at/steuern/umsatzsteuer/uid-nummer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="list-unstyled">
                    UID-Nummer prüfen
                    <MDBIcon
                      icon="external-link-alt"
                      className="ml-1"
                      size="sm"
                    />
                  </li>
                </a>
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">Contact</h5>
              <ul>
                <a
                  href="https://www.aichner-christian.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="list-unstyled">
                    About
                    <MDBIcon
                      icon="external-link-alt"
                      className="ml-1"
                      size="sm"
                    />
                  </li>
                </a>
                <a
                  href="https://www.aichner-christian.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="list-unstyled">
                    Privacy
                    <MDBIcon
                      icon="external-link-alt"
                      className="ml-1"
                      size="sm"
                    />
                  </li>
                </a>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: Werbeagentur Christian
            Aichner
            <p className="mb-2 mt-1 font-weight-bold madeby">
              Made with{" "}
              <MDBIcon
                icon="heart"
                className="pulse white-text"
                aria-hidden="true"
              />{" "}
              by{" "}
              <a href="https://www.aichner-christian.com" target="_block">
                us
              </a>
              .
            </p>
          </MDBContainer>
        </div>
      </MDBFooter>
    );
  }
}

export default Footer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
