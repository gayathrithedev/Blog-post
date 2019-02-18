import React, { Component } from "react";
import firebase from "../../config/Fire";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../Header/Header";
import Listpost from "../Listpost/Listpost";
import "./Show.scss";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      key: "",
      user: ""
    };
  }

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

  render() {
    return (
      <div className="show-container">
        <Header />
        <div className="main-layout">
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
          </div>
          <Listpost />
        </div>
      </div>
    );
  }
}
export default Show;
