const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
admin.initializeApp();

let db = admin.firestore();

/*
exports.updateGameNavigation = functions.firestore
  .document("navigation/{gameId}")
  .onUpdate((change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = change.after.data();

    // ...or the previous value before this update
    // const previousValue = change.before.data();
    console.log("newValue: ", newValue);
    // access a particular field as you would any JS property
    const id = newValue.id;
    const state = newValue.state;
    db.collection("games").doc(id).update({ state: state });
  });
*/
