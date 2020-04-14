//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link } from "react-router-dom";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBFooter,
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBIcon,
} from "mdbreact";

//> Footer
import "./footer.scss";

class Footer extends React.Component{
  render(){
    return(
      <MDBFooter color="primary-color" className="font-small pt-4 mt-4">
        <MDBContainer className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="3">
              <h5 className="title">Top Services</h5>
              <ul>
                <a href="https://www.aichner-christian.com" target="_blank" rel="noopener noreferrer">
                  <li className="list-unstyled">
                    Homepage
                    <MDBIcon icon="external-link-alt" className="ml-1" size="sm"/>
                  </li>
                </a>
                <Link
                to="/company"
                >
                  <li className="list-unstyled">
                    Unternehmensdaten
                    <MDBIcon className="ml-1" size="sm"/>
                  </li>
                </Link>
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">Useful links</h5>
              <ul>
              <a 
              href="http://starwars.wikia.com/wiki/Main_Page"
              target="_blank"
              rel="noopener noreferrer"
              >
                <li className="list-unstyled">
                  Wookiepedia
                  <MDBIcon icon="external-link-alt" className="ml-1" size="sm"/>
                </li>
              </a>
              <a 
              href="https://www.501st.com/"
              target="_blank"
              rel="noopener noreferrer"
              >
                <li className="list-unstyled">
                  501st Legion
                  <MDBIcon icon="external-link-alt" className="ml-1" size="sm"/>
                </li>
              </a>
              <a 
              href="https://www.patreon.com/sithcult"
              target="_blank"
              rel="noopener noreferrer"
              >
                <li className="list-unstyled">
                  Support of on Patreon
                  <MDBIcon icon="external-link-alt" className="ml-1" size="sm"/>
                </li>
              </a>
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">Contact</h5>
              <ul>
                <a href="mailto:center@sithcult.com">
                <li className="list-unstyled">
                  center@sithcult.com
                  <MDBIcon icon="external-link-alt" className="ml-1" size="sm"/>
                </li>
                </a>
                <Link
                to="/about"
                >
                <li className="list-unstyled">
                About
                </li>
                </Link>
                <Link
                to="/privacy"
                >
                <li className="list-unstyled">
                Privacy
                </li>
                </Link>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: Werbeagentur Christian Aichner
            <p className="mb-2 mt-1 font-weight-bold madeby">
              Made with <MDBIcon 
              icon="heart"
              className="pulse white-text"
              aria-hidden="true"
              /> by <a 
              href="https://www.aichner-christian.com"
              target="_block"
              >us</a>.
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
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
