// ------------ //
// Quick fix found on Stackoverflow, that fixed errors when writing to firestore
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
// ------------ //

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyAeSe_e9psbsmCgYQALaUNNn60AgUGfRP4",
  authDomain: "tapapp-2ae11.firebaseapp.com",
  databaseURL: "https://tapapp-2ae11.firebaseio.com",
  projectId: "tapapp-2ae11",
  storageBucket: "tapapp-2ae11.appspot.com",
  messagingSenderId: "297070664875",
  appId: "1:297070664875:web:8daa951fa47b3108296bee",
  measurementId: "G-VQTNY292PX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
