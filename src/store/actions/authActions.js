export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({
          type: "LOGIN_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ERROR",
          err,
        });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGNOUT_SUCCESS",
        });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const newUser = {
      email: "contact@aichner-christian.com",
      first_name: "Christian",
      last_name: "Aichner",
      isCompany: true,
      company_name: "Werbeagentur Christian Aichner",
      addresses: {
        private: [
          {
            city: "Villach",
            country: "AT",
            address: "Villacher Schächtestraße 32",
          },
        ],
        corporate: [
          {
            city: "Villach",
            country: "AT",
            address: "Emailwerkstraße 29",
          },
        ],
      },
      data: [{}],
      password: "test123",
      newsletter: true,
      law: true,
    };

    // Check for Sithname duplicates
    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        let result = undefined;
        let duplicate = false;
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          result = doc.data();
          if (result) {
            if (result.email === newUser.email) {
              duplicate = true;
              // Match found
              dispatch({
                type: "SIGNUP_DUPLICATE",
              });
            }
          }
        });

        // Check if the Sithname is not already in use
        if (!duplicate) {
          // Set default values
          let isCompany, points;

          isCompany = 1000;
          points = 100;

          // Create new user to firebase
          firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((response) => {
              // Create data for user we just created
              return firestore.collection("users").doc(response.user.uid).set({
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                newsletter: newUser.newsletter,
                addresses: newUser.addresses,
                law: newUser.law,
              });
            })
            .then(() => {
              dispatch({
                type: "SIGNUP_SUCCESS",
              });
            })
            .catch((err) => {
              dispatch({
                type: "SIGNUP_ERROR",
                errCode: 1,
                err,
              });
            });
        }
      });
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Christian Aichner
 */
