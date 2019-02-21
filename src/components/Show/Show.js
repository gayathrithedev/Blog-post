import React, { Component } from "react";
import firebase from "../../config/Fire";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import Header from "../Header/Header";
import Listpost from "../Listpost/Listpost";
import Comment from "../Comment/Comment";
import {
  FacebookIcon,
  GooglePlusIcon,
  LinkedinIcon,
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount
} from "react-share";
import "./Show.scss";

class Show extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("users");
    this.ref2 = firebase.firestore().collection("comments");
    this.connect = null;
    this.state = {
      post: {},
      key: "",
      user: "",
      comment: "",
      username: "",
      shareURL: "https://awesome-story.herokuapp.com/",
      avatarURL: "",
      flag: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.like = this.like.bind(this);
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
    users.map(user => {
      if (this.state.user === user.email)
        return this.setState({
          username: user.username,
          avatarURL: user.avatarURL
        });
    });
  };

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("posts")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          post: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
    this.connect = this.ref.onSnapshot(this.onCollectionUpdate);
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.email });
        localStorage.setItem("user", user.email);
        console.log(user.email);
      } else {
        this.setState({ user: null });
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/myposts");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  handleChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  postComment = e => {
    e.preventDefault();
    const { username, user, comment, avatarURL, mykey } = this.state;

    this.ref2
      .add({
        username,
        user,
        comment,
        avatarURL,
        mykey: this.state.key
      })
      .then(docRef => {
        this.setState({
          comment: ""
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  like() {
    this.setState({
      flag: !this.state.flag
    });
    console.log(this.state.flag);
  }

  render() {
    var mykey = this.state.key;
    return (
      <div className="show-container">
        <Header />
        <div className="main-layout">
          {this.state.user === this.state.post.author ? (
            <div className="social-media">
              <div className="like">
                <FaHeart onClick={this.like} className={this.state.likecolor} />
              </div>
              <div className="share">
                <FacebookShareButton
                  url={this.state.shareURL}
                  title={this.state.post.title}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <GooglePlusShareButton
                  url={this.state.shareURL}
                  title={this.state.post.title}
                >
                  <GooglePlusIcon size={32} round={true} />
                </GooglePlusShareButton>
                <LinkedinShareButton
                  url={this.state.shareURL}
                  title={this.state.post.title}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
              </div>
            </div>
          ) : (
            <div className="social-media">
              <div className="like">
                <FaHeart
                  onClick={this.like}
                  className={this.state.flag ? "red" : "white"}
                />
              </div>
              <div className="share">
                <FacebookShareButton
                  url={this.state.shareURL}
                  title={this.state.post.title}
                >
                  <FacebookIcon size={32} round={true} />
                  <FacebookShareCount
                    url={this.state.shareURL}
                    className="count"
                  >
                    {count => count}
                  </FacebookShareCount>
                </FacebookShareButton>
                <GooglePlusShareButton
                  url={this.state.shareURL}
                  title={this.state.post.title}
                >
                  <GooglePlusIcon size={32} round={true} />
                  <GooglePlusShareCount
                    url={this.state.shareURL}
                    className="count"
                  >
                    {count => count}
                  </GooglePlusShareCount>
                </GooglePlusShareButton>
                <LinkedinShareButton
                  url={this.state.shareURL}
                  title={this.state.post.uid}
                >
                  <LinkedinIcon size={32} round={true} />
                  <LinkedinShareCount
                    url={this.state.shareURL}
                    className="count"
                  >
                    {count => count}
                  </LinkedinShareCount>
                </LinkedinShareButton>
              </div>
            </div>
          )}
          <div className="viewpost">
            <h1>{this.state.post.title}</h1>
            <h3>Tag : {this.state.post.tags}</h3>
            <img src={this.state.post.avatarURL} alt="post" />
            <p>{this.state.post.description}</p>
            {this.state.post.author === this.state.user ? (
              <div className="edmodal-container">
                <Link to={`/edit/${this.state.key}`} class="btn btn-success">
                  <FaEdit />
                  Edit
                </Link>
                <button onClick={this.delete.bind(this, this.state.key)}>
                  <FaTrash />
                  Delete
                </button>
              </div>
            ) : null}
            {this.state.post.author !== this.state.user ? (
              <form className="post-comment" onSubmit={this.postComment}>
                <textarea
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  onChange={this.handleChange}
                  value={this.state.comment}
                  required
                />
                <div className="submit-button">
                  <button type="submit">post</button>
                </div>
              </form>
            ) : null}
            <Comment postkey={this.state.key} />
          </div>
          <Listpost />
        </div>
      </div>
    );
  }
}
export default Show;
