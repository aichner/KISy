export const getData = (collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection(collection)
      .get()
      .then((querySnapshot) => {
        let dataObjects = querySnapshot.docs.map((doc) => {
          let data = doc.data();

          data.id = doc.id;

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

    // To be added
  };
};

export const markAsDone = (collection, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection(collection)
      .doc(id)
      .set(
        {
          processed: true,
        },
        { merge: true }
      )
      .then(() => {
        firestore
          .collection(collection)
          .get()
          .then((querySnapshot) => {
            let dataObjects = querySnapshot.docs.map((doc) => {
              let data = doc.data();

              data.id = doc.id;

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
      })
      .catch((err) => {
        console.error("Can not mark as done.", err);
      });
  };
};

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
