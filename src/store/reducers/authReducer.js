// Have initial state for when state is not ready to be passed
const initState = {
  authError: null,
  authErrorDetails: null,
  catDetails: undefined,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("Error", action.err);
      return {
        ...state,
        authErrorDetails: action.err,
      };
    case "LOGIN_SUCCESS":
      console.log("Login success");
      return {
        ...state,
        authErrorDetails: null,
      };
    case "CAT_SUCCESS":
      console.log("Cat created");
      return {
        ...state,
        catDetails: action.newUser,
      };
    case "CAT_ERROR":
      console.log("Can not create cat", action.err);
      return {
        ...state,
        catDetails: null,
      };
    case "REMOVECAT_ERROR":
      console.log("Can not disable cat", action.err);
      return {
        ...state,
      };
    case "GETCATS_SUCCESS":
      console.log("Cats fetched");
      return {
        ...state,
        cats: action.cats,
      };
    case "GETCATS_ERROR":
      console.log("Can not get cats", action.err);
      return {
        ...state,
        cats: null,
      };
    case "SIGNOUT_SUCCESS":
      console.log("Signout success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("Signup success");
      return {
        ...state,
        authError: null,
        authErrorDetails: null,
      };
    case "SIGNUP_ERROR":
      console.log("Signup error", action.err);
      return {
        ...state,
        authErrorCode: action.errCode,
        authError: action.err.message,
        authErrorDetails: action.err,
      };
    case "SIGNUP_DUPLICATE":
      console.log("Signup error", "Sithname already in use");
      return {
        ...state,
        authErrorCode: 2,
        authError: "Sithname already in use",
        authErrorDetails: "Choose another Sithname",
      };
    default:
      return state;
  }
};

export default authReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
