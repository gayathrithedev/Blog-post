import React, { Component } from "react";
import firebase from "../../config/Fire";
import FileUploader from "react-firebase-file-uploader";
import "./Newpost.scss";
import Header from "../Header/Header";
import { Redirect } from "react-router";

class Newpost extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("posts");
    this.state = {
      user: null,
      title: "",
      avatar: "",
      username: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      description: "",
      tags: "",
      flag: false,
      likecount: 0,
      sharecount: 0,
      users: []
    };
    this.refuser = firebase.firestore().collection("users");
    this.connect = null;
    this.handleChange = this.handleChange.bind(this);
    this.authListener = this.authListener.bind(this);
  }

  onCollectionUpdate = querySnapshot => {
    const users = [];
    querySnapshot.forEach(doc => {
      const { username, email, avatarURL } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        username,
        email,
        avatarURL
      });
    });
    this.setState({
      users
    });
    this.state.users.map(user => {
      if (this.state.user === user.email) {
        this.setState({
          username: user.username
        });
      }
    });
  };

  componentDidMount() {
    this.authListener();
    this.connect = this.refuser.onSnapshot(this.onCollectionUpdate);
    alert(this.state.username);
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.email });
        localStorage.setItem("user", user.email);
      } else {
        this.setState({ user: null });
      }
    });
  }

  handleChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      author,
      title,
      description,
      dateandtime,
      avatarURL,
      tags,
      likecount,
      sharecount,
      username
    } = this.state;

    this.ref
      .add({
        author: this.state.user,
        title,
        description,
        dateandtime: firebase.firestore.FieldValue.serverTimestamp(),
        avatarURL,
        tags,
        likecount,
        sharecount,
        username
      })
      .then(docRef => {
        this.setState({
          title: "",
          description: ""
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    this.setState({
      flag: true
    });
  };

  render() {
    if (this.state.flag === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="newpost-container">
        <Header />
        <div className="grid">
          <form onSubmit={this.onSubmit}>
            <div className="publish">
              <button type="submit">Publish</button>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={this.handleChange}
              required
            />
            <textarea
              type="text"
              required
              name="description"
              placeholder="Description"
              onChange={this.handleChange}
            />
            <label>
              Add image
              <FileUploader
                hidden
                accept="image/*"
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                required
              />
            </label>
            <select
              name="tags"
              value={this.state.tags}
              onChange={this.handleChange}
            >
              <option value="none">Select Tag</option>
              <option value="Fashion">Fashion</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Food">Food</option>
              <option value="Nature">Nature</option>
              <option value="Tech">Tech</option>
              <option value="Business">Business</option>
              <option value="Beauty">Beauty</option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}
export default Newpost;
