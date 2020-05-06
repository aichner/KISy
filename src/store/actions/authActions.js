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
          type: "GETUSERS_SUCCESS",
          users: zombies,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GETUSERS_ERROR",
          err,
        });
      });
  };
};

export const getGoodBoys = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("users")
      .where("mode", "==", "goodboy")
      .get()
      .then((querySnapshot) => {
        let goodboys = querySnapshot.docs.map((doc) => {
          let data = doc.data();
          data.uid = doc.id;
          return data;
        });
        console.log(goodboys);
        dispatch({
          type: "GETUSERS_SUCCESS",
          users: goodboys,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GETUSERS_ERROR",
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
          type: "GETUSERS_SUCCESS",
          users: cats,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GETUSERS_ERRORS",
          err,
        });
      });
  };
};

export const markDoneZombie = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("users")
      .doc(uid)
      .set(
        {
          processed: true,
        },
        { merge: true }
      )
      .then(() => {
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
              type: "GETUSERS_SUCCESS",
              users: zombies,
            });
          })
          .catch((err) => {
            dispatch({
              type: "GETUSERS_ERROR",
              err,
            });
          });
      })
      .catch((err) => {
        dispatch({
          type: "GETUSERS_ERROR",
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
              type: "GETUSERS_SUCCESS",
              users: cats,
            });
          })
          .catch((err) => {
            dispatch({
              type: "GETUSERS_ERROR",
              err,
            });
          });
      })
      .catch((err) => {
        dispatch({ type: "REMOVECAT_ERROR", err });
      });
  };
};

export const requestImprovement = (typeName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Initialize Firebase modules
    const firebase = getFirebase();
    const firestore = getFirestore();
    // Initialize variables
    const uid = firebase.auth().currentUser.uid;
    const type = typeName.replace(/\s+/g, "").toLowerCase();

    firestore
      .collection("users")
      .doc(uid)
      .set(
        {
          request: { [type]: true },
        },
        { merge: true }
      )
      .catch((err) => {
        console.error("Improvement sent fail", err);
      });
  };
};

export const setFirstLogged = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Initialize Firebase modules
    const firebase = getFirebase();
    const firestore = getFirestore();
    // Initialize variables
    const uid = firebase.auth().currentUser.uid;

    firestore
      .collection("users")
      .doc(uid)
      .set(
        {
          firstLogin: new Date().getTime(),
          mode: "goodboy",
        },
        { merge: true }
      )
      .catch((err) => {
        console.error("First time logged sent fail", err);
      });
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
