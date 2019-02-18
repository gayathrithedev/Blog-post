import React, { Component } from "react";
import "./Recentpost.scss";
import firebase from "../../config/Fire";

class RecentPost extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("posts");
    this.connect = null;
    this.state = {
      posts: []
    };
  }

  render() {
    return (
      <div className="recentpost-container">
        <div className="post">
          <img src={require("../../image/foodpost.jpg")} alt="post1" />
          <div className="middle">
            <a href="">View post</a>
          </div>
          <h3>Lorem ipsum dollor sit amit</h3>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{" "}
            <a href="">read more</a>
          </p>
          <h5>TRAVEL ______ Feb 5 . 10 min read</h5>
        </div>
        <div className="post">
          <img src={require("../../image/foodpost.jpg")} alt="post1" />
          <div className="middle">
            <a href="">View post</a>
          </div>
          <h3>Lorem lakme google amazon</h3>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{" "}
            <a href="">read more</a>
          </p>
          <h5>FOOD ______ Feb 5</h5>
        </div>
        <div className="post">
          <img src={require("../../image/foodpost.jpg")} alt="post1" />
          <div className="middle">
            <a href="">View post</a>
          </div>
          <h3>Lorem ipsum dollor sit amit loreal paris lakme google amazon</h3>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{" "}
            <a href="">read more</a>
          </p>
          <h5>FASHION ______ Feb 5</h5>
        </div>
      </div>
    );
  }
}
export default RecentPost;
