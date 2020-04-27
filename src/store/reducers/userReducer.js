// Have initial state for when state is not ready to be passed
const initState = {
  receivedUser: undefined,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "USERLOAD_SUCCESS":
      return {
        ...state,
        receivedUser: action.results,
      };
    case "USERLOAD_ERROR":
      return {
        ...state,
        receivedUser: null,
      };
    case "USERLOAD_LOADING":
      return {
        ...state,
        receivedUser: true,
      };
    case "USERLOAD_CLEAR":
      return {
        ...state,
        receivedUser: undefined,
      };
    default:
      return state;
  }
};

export default userReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
