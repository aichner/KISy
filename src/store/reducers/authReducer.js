// Have initial state for when state is not ready to be passed
const initState = {
  authError: null,
  authErrorDetails: null,
  catDetails: undefined,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authErrorDetails: action.err,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authErrorDetails: null,
      };
    case "CAT_SUCCESS":
      return {
        ...state,
        catDetails: action.newUser,
      };
    case "CAT_ERROR":
      return {
        ...state,
        catDetails: null,
      };
    case "GETZOMBIE_SUCCESS":
      return {
        ...state,
        zombies: action.zombies,
      };
    case "GETZOMBIE_ERROR":
      console.error("Could not get zombies", action.err);
      return {
        ...state,
        zombies: null,
      };
    case "UPGRADE_SUCCESS":
      return {
        ...state,
        upgradeFailed: false,
      };
    case "UPGRADE_ERROR":
      return {
        ...state,
        upgradeFailed: true,
      };
    case "REMOVECAT_ERROR":
      return {
        ...state,
      };
    case "GETCATS_SUCCESS":
      return {
        ...state,
        cats: action.cats,
      };
    case "GETCATS_ERROR":
      return {
        ...state,
        cats: null,
      };
    case "SIGNOUT_SUCCESS":
      return state;
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null,
        authErrorDetails: null,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authErrorCode: action.errCode,
        authError: action.err.message,
        authErrorDetails: action.err,
      };
    case "SIGNUP_DUPLICATE":
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
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
