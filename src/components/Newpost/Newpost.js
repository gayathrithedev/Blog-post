import React, { Component } from "react";
import firebase from "../../config/Fire";
import FileUploader from "react-firebase-file-uploader";
import "./Newpost.scss";
import Header from "../Header/Header";

class Newpost extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("posts");
    this.state = {
      author: "",
      title: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      description: "",
      tags: "",
      dateandtime: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state.datetime);
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
    var me = "";
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        me = user;
      } else {
        // No user is signed in.
      }
    });
    const {
      author,
      title,
      description,
      dateandtime,
      avatarURL,
      tags
    } = this.state;

    this.ref
      .add({
        author: me,
        title,
        description,
        dateandtime: firebase.firestore.FieldValue.serverTimestamp(),
        avatarURL,
        tags
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
  };

  render() {
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
              placeholder="Title"
              required
              name="title"
              onChange={this.handleChange}
            />
            <textarea
              type="text"
              required
              name="description"
              placeholder="Description"
              onChange={this.handleChange}
            />
            <select
              name="tags"
              value={this.state.tags}
              onChange={this.handleChange}
            >
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
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
          </form>
        </div>
      </div>
    );
  }
}
export default Newpost;
