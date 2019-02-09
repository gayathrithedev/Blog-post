import firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };
const config = {
  apiKey: "AIzaSyB6CcI5g7aNlk07WncmgJVijGqEmJuWwQs",
  authDomain: "blogpost-69dd8.firebaseapp.com",
  databaseURL: "https://blogpost-69dd8.firebaseio.com",
  projectId: "blogpost-69dd8",
  storageBucket: "blogpost-69dd8.appspot.com",
  messagingSenderId: "499429125168"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;
