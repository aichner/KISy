// Have initial state for when state is not ready to be passed
const initState = {
  data: null,
};

const customerContactReducer = (state = initState, action) => {
  switch (action.type) {
    case "GETDATA_SUCCESS":
      return {
        ...state,
        data: action.data,
      };
    case "GETDATA_ERROR":
      console.error("Could not get data.", action.err);
      return {
        ...state,
        data: false,
      };
    default:
      return state;
  }
};

export default customerContactReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
