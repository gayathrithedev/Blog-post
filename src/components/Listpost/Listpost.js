import React, { Component } from "react";
import "./Listpost.scss";
import firebase from "../../config/Fire";
import { Link } from "react-router-dom";

class Listpost extends Component {
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
      <div className="listpost-container">
        <div className="heading">RECENT POST ________</div>
        {this.state.posts.map(post => {
          return (
            <div className="posts">
              <img src={post.avatarURL} alt="avatar" />
              <div className="content">
                <h4>
                  <a href={`/show/${post.key}`}>{post.title}</a>
                </h4>
                <p>{post.tags}</p>
                {/* <p>{post.dateandtime.seconds}</p> */}
              </div>
            </div>
          );
        })}

        <div className="posts">
          <img src={require("../../image/teach.jpeg")} />
          <div className="content">
            <h4>Lorem ipsum dollar sit amit</h4>
            <p>Michel Rabak</p>
            <p>Feb 3 . 12 min read</p>
          </div>
        </div>
        <div className="posts">
          <img src={require("../../image/shoe.jpeg")} />
          <div className="content">
            <h4>Lorem ipsum dollar sit amit</h4>
            <p>Michel Rabak</p>
            <p>Feb 3 . 12 min read</p>
          </div>
        </div>
        <div className="posts">
          <img src={require("../../image/write.jpeg")} />
          <div className="content">
            <h4>Lorem ipsum dollar sit amit</h4>
            <p>Michel Rabak</p>
            <p>Feb 3 . 12 min read</p>
          </div>
        </div>
        <div className="posts">
          <img src={require("../../image/shoe.jpeg")} />
          <div className="content">
            <h4>Lorem ipsum dollar sit amit</h4>
            <p>Michel Rabak</p>
            <p>Feb 3 . 12 min read</p>
          </div>
        </div>
        <div className="categories">
          <div className="heading">CATEGORIES _______</div>
          <ul>
            <li>FOOD</li>
            <li>FASHION</li>
            <li>NATURE</li>
            <li>TECH</li>
            <li>BUSINESS</li>
          </ul>
        </div>
        <div className="tags">
          <div className="heading">BROWSE TAGS _______</div>
          <ul>
            <li>FOOD</li>
            <li>FASHION</li>
            <li>NATURE</li>
            <li>TECH</li>
            <li>BUSINESS</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Listpost;
