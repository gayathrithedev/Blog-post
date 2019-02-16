import React, { Component } from "react";
import { FaUser, FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import firebase from "../../config/Fire";
import "./Signup.scss";
import FileUploader from "react-firebase-file-uploader";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("users");
    this.state = {
      username: "",
      email: "",
      password: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.userDetails = this.userDetails.bind(this);
  }

  signup(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  userDetails() {
    const { username, email, avatarURL } = this.state;
    this.ref
      .add({
        username,
        email,
        avatarURL
      })
      .then(docRef => {
        this.setState({
          username: "",
          email: "",
          password: ""
        });
      })
      .catch(error => {
        console.error("Error adding document", error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  confirmPwd() {}

  signupclose() {
    var close = document.getElementById("signupform");
    close.style.display = "none";
  }

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    return (
      <div className="signup-container">
        <form onSubmit={this.signup}>
          <div className="close">
            <FaTimes onClick={this.signupclose} />
          </div>
          <div className="input">
            <FaUser />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input">
            <FaLock />
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Passsword"
              onChange={this.confirmPwd}
              required
            />
          </div>
          <div className="avatarupload">
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.avatarURL && (
              <img src={this.state.avatarURL} alt="avatar" />
            )}
            <label
              style={{
                backgroundColor: "steelblue",
                color: "white",
                padding: 10,
                borderRadius: 4,
                pointer: "cursor"
              }}
            >
              Select your awesome avatar
              <FileUploader
                hidden
                accept="image/*"
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </label>
          </div>
          <button onClick={this.userDetails} type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}
export default Signup;
