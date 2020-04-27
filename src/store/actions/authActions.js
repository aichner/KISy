import fbConfig from "../../config/fbConfig";

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

export const upgradeCat = (cat) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Create new firebase and firestore instance
    const firebase = getFirebase();
    const firestore = getFirestore();
    // Create second app for creating users without logging out the current one
    const secondaryApp = firebase.initializeApp(fbConfig, "Secondary");

    secondaryApp
      .auth()
      .createUserWithEmailAndPassword(cat.email, cat.password)
      .then(function (firebaseUser) {
        // Log out secondary user
        secondaryApp.auth().signOut();
        // Delete the secondary App
        secondaryApp.delete();
        // Create user
        firestore
          .collection("users")
          .doc(firebaseUser.user.uid)
          .set({
            ...cat,
            coach: false,
            mode: "zombie",
            law: false,
            newsletter: false,
            image: null,
          })
          .then((res) => {
            firestore
              .collection("cats")
              .doc(cat.uid)
              .delete()
              .then((res) => {
                dispatch({ type: "UPGRADE_SUCCESS" });
              })
              .catch((err) => {
                dispatch({ type: "UPGRADE_ERROR", err });
              });
          })
          .catch((err) => {
            dispatch({ type: "UPGRADE_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "UPGRADE_ERROR", err });
      });
  };
};

export const getZombies = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("users")
      .where("mode", "==", "zombie")
      .get()
      .then((querySnapshot) => {
        let zombies = querySnapshot.docs.map((doc) => {
          let data = doc.data();
          data.uid = doc.id;
          return data;
        });
        dispatch({
          type: "GETZOMBIE_SUCCESS",
          zombies,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GETZOMBIE_ERROR",
          err,
        });
      });
  };
};

export const createCat = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    // Create new user to firebase
    firestore
      .collection("cats")
      .add({
        ...newUser,
      })
      .then(() => {
        dispatch({ type: "CAT_SUCCESS", newUser });
        return;
      })
      .catch((err) => {
        dispatch({ type: "CAT_ERROR", err });
      });
  };
};

export const getCats = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("cats")
      .get()
      .then((querySnapshot) => {
        let cats = querySnapshot.docs.map((doc) => {
          let data = doc.data();
          data.uid = doc.id;
          return data;
        });
        dispatch({
          type: "GETCATS_SUCCESS",
          cats,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GETCATS_ERROR",
          err,
        });
      });
  };
};

export const removeCat = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection("cats")
      .doc(uid)
      .set(
        {
          disabled: true,
        },
        { merge: true }
      )
      .then(() => {
        firestore
          .collection("cats")
          .get()
          .then((querySnapshot) => {
            let cats = querySnapshot.docs.map((doc) => {
              let data = doc.data();
              data.uid = doc.id;
              return data;
            });
            dispatch({
              type: "GETCATS_SUCCESS",
              cats,
            });
          })
          .catch((err) => {
            dispatch({
              type: "GETCATS_ERROR",
              err,
            });
          });
      })
      .catch((err) => {
        dispatch({ type: "REMOVECAT_ERROR", err });
      });
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */