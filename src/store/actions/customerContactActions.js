export const getData = (collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    console.log(collection);
    firestore
      .collection(collection)
      .get()
      .then((querySnapshot) => {
        let dataObjects = querySnapshot.docs.map((doc) => {
          let data = doc.data();
          data.uid = doc.id;
          return data;
        });
        dispatch({
          type: "GETDATA_SUCCESS",
          data: dataObjects,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GETDATA_ERRORS",
          err,
        });
      });
  };
};

export const assignRequest = (request) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    console.log(request);
  };
};

export const markAsDone = (collection, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    console.log(collection, id);
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
