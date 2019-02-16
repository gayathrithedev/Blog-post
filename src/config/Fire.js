import firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };
var config = {
  apiKey: "AIzaSyA9sME6Slc_a3vV4sxh2F4wEld0rXbvfyg",
  authDomain: "awesome-blog-9900e.firebaseapp.com",
  databaseURL: "https://awesome-blog-9900e.firebaseio.com",
  projectId: "awesome-blog-9900e",
  storageBucket: "awesome-blog-9900e.appspot.com",
  messagingSenderId: "356937884597"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;
