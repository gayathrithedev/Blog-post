import firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };
const config = {
  apiKey: "AIzaSyDMgTvNUUBSzIVLAlqLJkWvth__M6W2ZF0",
  authDomain: "myproject-db4af.firebaseapp.com",
  databaseURL: "https://myproject-db4af.firebaseio.com",
  projectId: "myproject-db4af",
  storageBucket: "myproject-db4af.appspot.com",
  messagingSenderId: "786232624466"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;
