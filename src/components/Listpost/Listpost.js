import React, { Component } from "react";
import "./Listpost.scss";
class Listpost extends Component {
  render() {
    return (
      <div className="listpost-container">
        <div className="heading">RECENT POST ________</div>
        <div className="posts">
          <img src={require("../../image/shoe.jpeg")} />
          <div className="content">
            <h4>Lorem ipsum dollar sit amit</h4>
            <p>Michel Rabak</p>
            <p>Feb 3 . 12 min read</p>
          </div>
        </div>
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
