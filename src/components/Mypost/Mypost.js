import React, { Component } from "react";
import firebase from "../../config/Fire";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Mypost.scss";

class Mypost extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("posts");
    this.connect = null;
    this.state = {
      posts: []
    };
  }
  onCollectionUpdate = querySnapshot => {
    const posts = [];
    querySnapshot.forEach(doc => {
      const {
        title,
        description,
        author,
        dateandtime,
        avatarURL,
        tags
      } = doc.data();
      posts.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        dateandtime,
        avatarURL,
        tags
      });
    });
    this.setState({
      posts
    });
  };

  componentDidMount() {
    this.connect = this.ref
      .orderBy("dateandtime", "desc")
      .onSnapshot(this.onCollectionUpdate);
  }
  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="listpost-container">
          <div className="heading">MY POST ________</div>
          {this.state.posts.map(post => {
            if (post.author === firebase.auth().currentUser.email)
              return (
                <div className="posts">
                  <img src={post.avatarURL} alt="avatar" />
                  <div className="content">
                    <h4>
                      <Link to={`/show/${post.key}`}>{post.title}</Link>
                    </h4>
                    <p>{post.tags}</p>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    );
  }
}
export default Mypost;
