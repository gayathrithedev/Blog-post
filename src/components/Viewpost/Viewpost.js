import React, { Component } from "react";
import "./Viewpost.scss";
import Listpost from "../Listpost/Listpost";
class Viewpost extends Component {
  render() {
    return (
      <div className="viewpost-container">
        <div className="post-content">
          <div className="top">
            <div className="heading">
              <h3>Lorem ipsum dollar sit amit</h3>
            </div>
            <div className="post-author">
              <img src={require("../../image/write.jpeg")} alt="author" />
              <div className="author-info">
                <p>Michal George</p>
                <p>Posted on : Feb 07</p>
              </div>
            </div>
          </div>
          <div className="tags">
            <a href="">LIFESTYLE</a>
          </div>

          <img src={require("../../image/foodpost.jpg")} alt="food" />
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
        <div className="right-sidebar">
          <Listpost />
        </div>
      </div>
    );
  }
}
export default Viewpost;
