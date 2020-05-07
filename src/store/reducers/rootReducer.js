//> Reducers
// Authentication
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import customerContactReducer from "./customerContactReducer";

//> Redux
import { combineReducers } from "redux";

//> Firestore reducer
import { firestoreReducer } from "redux-firestore";

//> Firebase reducer
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  contact: customerContactReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer, // Authentication
});

export default rootReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
