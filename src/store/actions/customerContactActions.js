export const getData = (collection, processed) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection(collection)
      .where("processed", "==", processed)
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

export const markAsDone = (collection, id, processed) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    if (!processed) {
      processed = false;
    }

    firestore
      .collection(collection)
      .doc(id)
      .set(
        {
          processed: true,
          processedInfo: {
            uid: firebase.auth().currentUser.uid
              ? firebase.auth().currentUser.uid
              : null,
            timestamp: new Date().getTime(),
          },
        },
        { merge: true }
      )
      .then(() => {
        firestore
          .collection(collection)
          .where("processed", "==", processed)
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
