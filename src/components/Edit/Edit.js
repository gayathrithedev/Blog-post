import React, { Component } from "react";
import firebase from "../../config/Fire";
import FileUploader from "react-firebase-file-uploader";
import "./Edit.scss";
import Header from "../Header/Header";
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      description: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      tags: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("posts")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const post = doc.data();
        this.setState({
          key: doc.id,
          title: post.title,
          description: post.description,
          tags: post.tags,
          avatarURL: post.avatarURL
        });
      } else {
        console.log("No such document!");
      }
    });
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

  handleChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ post: state });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      title,
      description,
      tags,
      avatarURL,
      author,
      dateandtime
    } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("posts")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description,
        tags,
        avatarURL,
        author: firebase.auth().currentUser.email,
        dateandtime: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  submit = e => {
    e.preventDefault();

    const {
      title,
      description,
      tags,
      avatarURL,
      author,
      dateandtime
    } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("posts")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description,
        tags,
        avatarURL: this.state.avatarURL,
        author: firebase.auth().currentUser.email,
        dateandtime: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div className="edit-container">
        <Header />
        <div className="grid">
          <form
            className="edit-form"
            onSubmit={this.state.avatarURL === "" ? this.submit : this.onSubmit}
          >
            <div className="publish">
              <button type="submit">Publish</button>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={this.handleChange}
              defaultValue={this.state.title}
              required
            />
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              onChange={this.handleChange}
              value={this.state.description}
              required
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
export default Edit;
