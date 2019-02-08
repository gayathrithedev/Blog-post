import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB6CcI5g7aNlk07WncmgJVijGqEmJuWwQs",
  authDomain: "blogpost-69dd8.firebaseapp.com",
  databaseURL: "https://blogpost-69dd8.firebaseio.com",
  projectId: "blogpost-69dd8",
  storageBucket: "blogpost-69dd8.appspot.com",
  messagingSenderId: "499429125168"
};
const fire = firebase.initializeApp(config);
export default fire;
