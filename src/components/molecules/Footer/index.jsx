//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBFooter,MDBContainer, MDBIcon } from "mdbreact";

//> Footer
import "./footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <MDBFooter color="primary-color" className="font-small">
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
